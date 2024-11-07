// const express = require('express');
// const cors = require('cors');
// const calculatorRouter = require('./apps/calculator/route');
// const { SERVER_URL, PORT, ENV } = require('./constants');

// const app = express();

// // CORS Middleware setup
// app.use(cors({
//     origin: '*',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Root route
// app.get('/', (req, res) => {
//     res.json({ message: 'Server is running' });
// });

// // Calculator routes
// app.use('/calculate', calculatorRouter);

// // Start server
// app.listen(PORT || 3000, SERVER_URL || 'localhost', () => {
//     console.log(`Server is running on ${SERVER_URL}:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const calculatorRouter = require('./apps/calculator/route'); // Import your route
const { SERVER_URL, PORT, ENV } = require('./constants');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
app.use(bodyParser.json());
// CORS middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Include calculator router
app.use('/calculate', calculatorRouter);

// Start server
app.listen(PORT, SERVER_URL, () => {
  console.log(`Server is running on ${SERVER_URL}:${PORT}`);
});
  