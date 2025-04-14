-- Users Table
CREATE TABLE Users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    mobile_number VARCHAR(20),
    password VARCHAR(255),
    address VARCHAR(255)
);

-- Restaurants Table
CREATE TABLE Restaurants (
    restaurant_id INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    contact_number VARCHAR(50),
    delivery_time VARCHAR(30),
    rating DECIMAL(3, 1),
    img_src VARCHAR(255)
);

-- Menu Table
CREATE TABLE Menu (
    menu_id INT PRIMARY KEY,
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

-- Dishes Table
CREATE TABLE Dishes (
    dish_id INT PRIMARY KEY,
    menu_id INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    rating DECIMAL(3, 1),
    img_src VARCHAR(255),
    FOREIGN KEY (menu_id) REFERENCES Menu(menu_id)
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id VARCHAR(255),
    restaurant_id INT,
    order_timestamp VARCHAR(255),
    total_amount DECIMAL(10, 2),
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

-- Cart Table
CREATE TABLE Cart (
    cart_id INT PRIMARY KEY,
    order_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Order Details Table
CREATE TABLE Order_Details (
    order_detail_id INT PRIMARY KEY,
    order_id INT,
    dish_id INT,
    quantity INT,
    subtotal_amount DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (dish_id) REFERENCES Dishes(dish_id)
);

-- Payment Table
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY,
    order_id INT,
    payment_date DATE,
    amount DECIMAL(10, 2),
    payment_method VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Order Tracking Table
CREATE TABLE Order_Tracking (
    tracking_id INT PRIMARY KEY,
    order_id INT,
    status VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

--populating RESTAURANTS table
INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (1, 'The Sweet Spot Bakery', '1 Bakery Street, Manipal, Karnataka, India', '+91 1234567890', 3.9, '30-40 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (2, 'Spice Junction', '9 Spice Market, Manipal, Karnataka, India', '+91 1234432112', 4.6, '25-35 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (3, 'Tandoori Terrace', '10 Tandoori Lane, Manipal, Karnataka, India', '+91 9988776655', 1.9, '30-40 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (4, 'SpeedyBites', '4 Fast Lane, Manipal, Karnataka, India', '+91 8899776655', 5.0, '15-25 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (5, 'QuickBite Burgers', '3 Fast Food Corner, Manipal, Karnataka, India', '+91 9988776655', 4.5, '20-30 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (6, 'Noodle Haven', '7 Ramen Street, Manipal, Karnataka, India', '+91 5544332211', 4.0, '20-30 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (7, 'Flourish Bakery', '2 Bakers Lane, Manipal, Karnataka, India', '+91 9876543210', 3.3, '25-35 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (8, 'Crunchy Cravings', '5 Foodie Plaza, Manipal, Karnataka, India', '+91 7766554433', 4.2, '20-30 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (9, 'Pizza Paradise', '6 Pizza Tower, Manipal, Karnataka, India', '+91 6655443322', 4.7, '25-35 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (10, 'Ramen Rendezvous', '8 Noodle Lane, Manipal, Karnataka, India', '+91 3322114455', 3.5, '20-30 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (11, 'Curry Kingdom', '11 Curry Corner, Manipal, Karnataka, India', '+91 8877665544', 4.5, '25-35 minutes');

INSERT INTO Restaurants (restaurant_id, name, address, contact_number, rating, delivery_time) 
VALUES (12, 'Naan Nook', '12 Naan Street, Manipal, Karnataka, India', '+91 7766889955', 4.5, '30-40 minutes');

<<<<<<< HEAD

=======
>>>>>>> b2b42a57e1ced389e4e9999761f4c1656034eb71
UPDATE Restaurants
SET img_src = CASE 
    WHEN restaurant_id = 1 THEN '../../public/assets/restos/cake2.jpeg'
    WHEN restaurant_id = 2 THEN '../../public/assets/restos/north1.jpeg'
    WHEN restaurant_id = 3 THEN '../../public/assets/restos/north2.jpeg'
    WHEN restaurant_id = 4 THEN '../../public/assets/restos/burger2.jpeg'
    WHEN restaurant_id = 5 THEN '../../public/assets/restos/burger1.jpeg'
    WHEN restaurant_id = 6 THEN '../../public/assets/restos/north5.jpeg'
    WHEN restaurant_id = 7 THEN '../../public/assets/restos/cake1.jpeg'
    WHEN restaurant_id = 8 THEN '../../public/assets/restos/burger3.jpeg'
    WHEN restaurant_id = 9 THEN '../../public/assets/restos/pizza1.jpeg'
    WHEN restaurant_id = 10 THEN '../../public/assets/restos/chinese1.jpeg'
    WHEN restaurant_id = 11 THEN '../../public/assets/restos/north3.jpeg'
    WHEN restaurant_id = 12 THEN '../../public/assets/restos/north4.jpeg'
    ELSE ''
END
WHERE restaurant_id IN (1, 2, 3,4,5,6,7,8,9,10,11,12);
select * from restaurants;

--populating MENU table
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(1, 1);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(2, 2);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(3, 3);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(4, 4);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(5, 5);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(6, 6);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(7, 7);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(8, 8);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(9, 9);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(10, 10);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(11, 11);
INSERT INTO Menu (menu_id, restaurant_id) VALUES
(12, 12);

--populating DISHES table
-- The Sweet Spot Bakery
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(1, 1, 'Red Velvet Cake', 175.00, 4.2);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (2, 1, 'Chocolate Chip Cookies', 90.00, 4.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (3, 1, 'Blueberry Muffins', 110.00, 4.0);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (4, 1, 'Carrot Cake', 135.00, 4.3);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (5, 1, 'Cheesecake', 160.00, 4.4);


-- Spice Junction
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(6, 2, 'Butter Chicken', 225.00, 4.6);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (7, 2, 'Paneer Tikka', 200.00, 4.7);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (8, 2, 'Tandoori Chicken', 200.00, 4.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (9, 2, 'Vegetable Biryani', 235.00, 4.4);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (10, 2, 'Dal Makhani', 180.00, 4.3);

-- Tandoori Terrace
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(11, 3, 'Chicken Tikka', 200.00, 2.0);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (12, 3, 'Seekh Kebab', 180.00, 2.2);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (13, 3, 'Vegetable Samosa', 70.00, 2.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (14, 3, 'Chicken Biryani', 225.00, 1.8);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (15, 3, 'Garlic Naan', 50.00, 2.3);

-- SpeedyBites
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(16, 4, 'Classic Cheeseburger', 165.00, 4.8);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (17, 4, 'Double Bacon Burger', 215.00, 4.9);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (18, 4, 'Veggie Burger', 155.00, 4.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (19, 4, 'Crispy Chicken Burger', 195.00, 4.7);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (20, 4, 'Grilled Mushroom Burger', 175.00, 4.6);

-- QuickBite Burgers
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(21, 5, 'BBQ Bacon Burger', 195.00, 4.4);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (22, 5, 'Spicy Chicken Burger', 175.00, 4.3);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (23, 5, 'Veggie Delight Burger', 155.00, 4.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (24, 5, 'Classic Beef Burger', 185.00, 4.2);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (25, 5, 'Double Cheeseburger', 215.00, 4.6);

-- Noodle Haven
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(26, 6, 'Chicken Hakka Noodles', 165.00, 4.2);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (27, 6, 'Vegetable Manchurian', 155.00, 4.3);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (28, 6, 'Shrimp Fried Rice', 195.00, 4.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (29, 6, 'Thai Green Curry', 215.00, 4.4);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (30, 6, 'Pad Thai Noodles', 175.00, 4.1);

-- Flourish Bakery
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(31, 7, 'Chocolate Fudge Cake', 135.00, 3.8);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (32, 7, 'Lemon Drizzle Cake', 110.00, 3.9);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (33, 7, 'Raspberry Tart', 90.00, 4.0);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (34, 7, 'Almond Croissant', 70.00, 4.2);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (35, 7, 'Apple Turnover', 80.00, 3.7);

-- Crunchy Cravings
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(36, 8, 'BBQ Chicken Pizza', 215.00, 4.4);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (37, 8, 'Margherita Pizza', 195.00, 4.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (38, 8, 'Supreme Veggie Pizza', 235.00, 4.3);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (39, 8, 'Pepperoni Pizza', 205.00, 4.6);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (40, 8, 'Hawaiian Pizza', 195.00, 4.2);

-- Pizza Paradise
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(41, 9, 'Spicy Paneer Pizza', 205.00, 4.7);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (42, 9, 'Chicken Tikka Pizza', 215.00, 4.8);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (43, 9, 'Veggie Delight Pizza', 195.00, 4.6);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (44, 9, 'Meat Lover''s Pizza', 225.00, 4.5);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (45, 9, 'BBQ Chicken Pizza', 215.00, 4.7);

-- Ramen Rendezvous
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(46, 10, 'Shoyu Ramen', 175.00, 3.8);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (47, 10, 'Miso Ramen', 165.00, 3.7);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (48, 10, 'Tonkotsu Ramen', 195.00, 3.9);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (49, 10, 'Spicy Chicken Ramen', 185.00, 4.0);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (50, 10, 'Vegetarian Ramen', 155.00, 3.6);

-- Curry Kingdom
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(51, 11, 'Chicken Tikka Masala', 215.00, 4.5);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (52, 11, 'Lamb Rogan Josh', 235.00, 4.6);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (53, 11, 'Palak Paneer', 195.00, 4.4);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (54, 11, 'Butter Naan', 50.00, 4.2);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (55, 11, 'Aloo Gobi', 175.00, 4.3);

-- Naan Nook
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES 
(56, 12, 'Butter Chicken', 215.00, 4.5);
INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (57, 12, 'Garlic Naan', 50.00, 4.3);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (58, 12, 'Vegetable Biryani', 235.00, 4.6);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (59, 12, 'Paneer Tikka', 200.00, 4.4);
       INSERT INTO Dishes (dish_id, menu_id, name, price, rating) VALUES
       (60, 12, 'Dal Makhani', 180.00, 4.2);
       
--Adding images to Dishes
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake1.jpg' WHERE dish_id = 1;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake2.jpg' WHERE dish_id = 2;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake3.jpg' WHERE dish_id = 3;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake4.jpg' WHERE dish_id = 4;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake5.jpg' WHERE dish_id = 5;

UPDATE Dishes SET img_src = '../../public/assets/dishes/north6.jpg' WHERE dish_id = 6;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north7.jpg' WHERE dish_id = 7;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north8.jpg' WHERE dish_id = 8;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north9.jpg' WHERE dish_id = 9;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north10.jpg' WHERE dish_id = 10;

UPDATE Dishes SET img_src = '../../public/assets/dishes/north10.jpg' WHERE dish_id = 11;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north11.jpg' WHERE dish_id = 12;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north12.jpg' WHERE dish_id = 13;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north13.jpg' WHERE dish_id = 14;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north14.jpg' WHERE dish_id = 15;

UPDATE Dishes SET img_src = '../../public/assets/dishes/burger1.jpg' WHERE dish_id = 16;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger2.jpg' WHERE dish_id = 17;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger3.jpg' WHERE dish_id = 18;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger4.jpg' WHERE dish_id = 19;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger5.jpg' WHERE dish_id = 20;

UPDATE Dishes SET img_src = '../../public/assets/dishes/burger4.jpg' WHERE dish_id = 21;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger5.jpg' WHERE dish_id = 22;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger6.jpg' WHERE dish_id = 23;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger7.jpg' WHERE dish_id = 24;
UPDATE Dishes SET img_src = '../../public/assets/dishes/burger8.jpg' WHERE dish_id = 25;

UPDATE Dishes SET img_src = '../../public/assets/dishes/chinese1.jpg' WHERE dish_id = 26;
UPDATE Dishes SET img_src = '../../public/assets/dishes/chinese2.jpg' WHERE dish_id = 27;
UPDATE Dishes SET img_src = '../../public/assets/dishes/chinese3.jpg' WHERE dish_id = 28;
UPDATE Dishes SET img_src = '../../public/assets/dishes/chinese4.jpg' WHERE dish_id = 29;
UPDATE Dishes SET img_src = '../../public/assets/dishes/chinese5.jpg' WHERE dish_id = 30;

UPDATE Dishes SET img_src = '../../public/assets/dishes/cake5.jpg' WHERE dish_id = 31;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake6.jpg' WHERE dish_id = 32;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake7.jpg' WHERE dish_id = 33;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake8.jpg' WHERE dish_id = 34;
UPDATE Dishes SET img_src = '../../public/assets/dishes/cake9.jpg' WHERE dish_id = 35;

UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza1.jpg' WHERE dish_id = 36;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza2.jpg' WHERE dish_id = 37;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza3.jpg' WHERE dish_id = 38;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza4.jpg' WHERE dish_id = 39;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza5.jpg' WHERE dish_id = 40;

UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza4.jpg' WHERE dish_id = 41;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza5.jpg' WHERE dish_id = 42;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza6.jpg' WHERE dish_id = 43;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza7.jpg' WHERE dish_id = 44;
UPDATE Dishes SET img_src = '../../public/assets/dishes/pizza8.jpg' WHERE dish_id = 45;

UPDATE Dishes SET img_src = '../../public/assets/dishes/ramen1.jpg' WHERE dish_id = 46;
UPDATE Dishes SET img_src = '../../public/assets/dishes/ramen2.jpg' WHERE dish_id = 47;
UPDATE Dishes SET img_src = '../../public/assets/dishes/ramen3.jpg' WHERE dish_id = 48;
UPDATE Dishes SET img_src = '../../public/assets/dishes/ramen4.jpg' WHERE dish_id = 49;
UPDATE Dishes SET img_src = '../../public/assets/dishes/ramen5.jpg' WHERE dish_id = 50;

UPDATE Dishes SET img_src = '../../public/assets/dishes/north8.jpg' WHERE dish_id = 51;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north9.jpg' WHERE dish_id = 52;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north1.jpg' WHERE dish_id = 53;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north14.jpg' WHERE dish_id = 54;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north5.jpg' WHERE dish_id = 55;

UPDATE Dishes SET img_src = '../../public/assets/dishes/north1.jpg' WHERE dish_id = 56;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north2.jpg' WHERE dish_id = 57;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north4.jpg' WHERE dish_id = 58;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north6.jpg' WHERE dish_id = 59;
UPDATE Dishes SET img_src = '../../public/assets/dishes/north7.jpg' WHERE dish_id = 60;