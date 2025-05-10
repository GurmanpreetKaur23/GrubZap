const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./routes/auth');
const CartRouter = require('./routes/cart');
require('dotenv').config();
require('./models/db');

// ✅ Correct order of middleware
app.use(cors());
app.use(express.json()); // This MUST be before route definitions

// ✅ Define routes after middleware
app.use('/auth', AuthRouter);
app.use('/products', AuthRouter); // fix if this is a placeholder
app.use('/cart', CartRouter);

// Test route
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
