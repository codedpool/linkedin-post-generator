const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contentRoutes = require('./routes/index');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', contentRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.send('LinkedIn Short Text Content Generator Backend');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});