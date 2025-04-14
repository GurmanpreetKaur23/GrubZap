import dotenv from "dotenv";
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import pkg from 'body-parser';
const { urlencoded } = pkg;
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getQuery, postQuery } from "./utils.js";
const app = express();
const port = 4000;
const random = () => Math.floor(Math.random() * 89999) + 10000

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`listening to port http://localhost:${port}`)
});

let currentSID = "";
let order_id;
let order_timestamp;

app.get('/home', async (req, res) => {
    try {
        const query = 'SELECT * FROM restaurants';
        const result = await getQuery(query);
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restaurant/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM restaurants WHERE restaurant_id = $1';
        const binds = [id];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restaurant/:id/menu', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM dishes WHERE menu_id = $1';
        const binds = [id];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.error(err);
        res.redirect('/home');
    }
});

app.get('/profile', async (req, res) => {
    try {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        console.log('currentSID', currentSID)
        const binds = [currentSID];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/checkout', async (req, res) => {
    try {
        const query = `
            SELECT o.order_detail_id, d.name, o.subtotal_amount, o.quantity
            FROM order_details o
            JOIN dishes d ON o.dish_id = d.dish_id
            WHERE o.order_id = $1
        `;
        const binds = [order_id];
        const result = await getQuery(query, binds);
        console.log('order_id', order_id)
        return res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search/:q', async (req, res) => {
    let { q } = req.params;
    q = q.toLowerCase();
    try {
        const query = 'SELECT * FROM dishes WHERE LOWER(name) LIKE $1';
        const binds = [`%${q}%`];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/allOrders', async (req, res) => {
    try {
        const query = `
            SELECT o.order_id, o.order_timestamp, o.total_amount
            FROM orders o
            WHERE o.user_id = $1
            ORDER BY o.order_timestamp DESC
        `;
        const binds = [currentSID];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/orderDetails/:order_id', async (req, res) => {
    const { order_id } = req.params;
    try {
        const query = `
            SELECT d.name, d.price
            FROM dishes d
            JOIN order_details od ON d.dish_id = od.dish_id
            WHERE od.order_id = $1
            ORDER BY d.price ASC
        `;
        const binds = [order_id];
        const result = await getQuery(query, binds);
        return res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/payment', async (req, res) => {
    const total_amount = req.body.total_amount;
    console.log(total_amount);

    try {
        const query = `
            UPDATE orders
            SET total_amount = $1
            WHERE order_id = $2
        `;
        const binds = [total_amount, order_id];
        const result = await postQuery(query, binds);

        console.log(result);

        order_id = Math.floor(Math.random() * 1000000);
        console.log('order_id reinitialized:', order_id);

        return res.json({ message: 'Payment updated successfully', result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/register', async (req, res) => {
    const id = uuidv4();
    const name = req.body.name;
    const mobile = req.body.mobileNumber;
    const password = req.body.password;

    if (!name || !mobile || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const order_id = random();
        const order_timestamp = new Date().toISOString();
        const currentSID = id;

        const userQuery = `
            INSERT INTO users (user_id, name, mobile_number, password)
            VALUES ($1, $2, $3, $4)
        `;
        const userBinds = [id, name, mobile, hash];
        await postQuery(userQuery, userBinds);

        const orderQuery = `
            INSERT INTO orders (order_id, order_timestamp, user_id)
            VALUES ($1, $2, $3)
        `;
        const orderBinds = [order_id, order_timestamp, currentSID];
        await postQuery(orderQuery, orderBinds);

        return res.status(201).json({
            message: 'User registered successfully',
            userId: id,
            orderId: order_id,
        });
    } catch (err) {
        console.error('Error during registration:', err);
        if (err.code === '23505') {
            return res.status(409).json({ message: 'Mobile number already registered' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    order_id = random();
    order_timestamp = new Date().toISOString();
    try {
        const query = `SELECT * FROM users WHERE name = $1`;
        const binds = [name];
        const result1 = await getQuery(query, binds);

        if (result1.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        currentSID = uuidv4();
        const fetched_password = result1[0].password;

        const isValid = await bcrypt.compare(password, fetched_password);
        console.log('User is valid:', isValid);

        if (isValid) {
            const orderQuery = `
                INSERT INTO orders (order_id, order_timestamp, user_id)
                VALUES ($1, $2, $3)
            `;
            const orderBinds = [order_id, order_timestamp, currentSID];
            await postQuery(orderQuery, orderBinds);

            console.log('Order table initiated:', order_id);
            return res.json(result1[0]);
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/profile', async (req, res) => {
    const name = req.body.name;
    const mobile = req.body.mobileNumber;
    const address = req.body.address;

    try {
        const query = `
            UPDATE users
            SET name = $1, mobile_number = $2, address = $3
            WHERE user_id = $4
        `;
        const binds = [name, mobile, address, currentSID];
        const result = await postQuery(query, binds);

        console.log('User details updated with\nName:', name, '\nMobile:', mobile, '\nAddress:', address);
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/addtocart', async (req, res) => {
    const item = req.body.item;
    const order_detail_id = Math.floor(Math.random() * 1000000); // Random order_detail_id
    const dish_id = item.dish_id;
    const quantity = 1;
    const subtotal_amount = item.price;

    try {
        const query = `
            INSERT INTO order_details (order_detail_id, order_id, dish_id, quantity, subtotal_amount)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const binds = [order_detail_id, order_id, dish_id, quantity, subtotal_amount];
        const result = await postQuery(query, binds);

        return res.json({ message: 'Item added to cart successfully', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/logout', async (req, res) => {
    try {
        currentSID = ''; // Reset currentSID on logout
        console.log('currentSID reset:', currentSID);
        return res.json({ message: 'Logout successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//* admin adds restaurants
app.post('/admin/add/restaurant', async (req, res) => {
    const name = req.body.name;
    const mobile = req.body.mobileNumber;
    const address = req.body.address;
    const deliveryTime = req.body.deliveryTime;
    const rating = req.body.rating;
    const id = Math.floor(Math.random() * 1000000); // Random restaurant_id
    const img_src =
        'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g';

    try {
        const query = `
            INSERT INTO restaurants (restaurant_id, name, address, contact_number, rating, delivery_time, img_src)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const binds = [id, name, address, mobile, rating, deliveryTime, img_src];
        const result = await postQuery(query, binds);

        console.log('Restaurant added by admin:', result);
        return res.json({ message: 'Restaurant added successfully', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/user/login', async (req, res) => {
    const result = await getUserPassword(req.body.USERNAME);

    //! if user is admin code here
    if (name === 'admin' && password === 'admin') {
        return res.json({ "message": "Admin access granted" });
    }

    const isValid = await compare(password, fetched_password)
    console.log("User is valid:", isValid);

    res.send(result);
    if (isValid) {
        query = "INSERT INTO ORDERS (order_id, order_timestamp, user_id) VALUES (:order_id, :order_timestamp, :currentSID)"
        const result2 = await postQuery(query, { order_id, order_timestamp, currentSID });
        console.log("Order table initiated : ", order_id)
        return res.json(result1[0]);
    }
    else {
        return res.json([]);
    }
})
