// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./routes/auth');

// Load environment variables
require('dotenv').config();
require('./models/db');

// Middleware to parse JSON request bodies
app.use(express.json()); // Ensure this is before your routes!

// Middleware for CORS
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/products' , AuthRouter) ;

// Simple route to test the server
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Start the server and listen on the given port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
