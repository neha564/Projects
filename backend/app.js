const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes/routes');
const cors = require('cors');

// Load environment variables at the start
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());

// Apply CORS middleware before defining routes
app.use(cors({ origin: '*' }));

// Define routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
