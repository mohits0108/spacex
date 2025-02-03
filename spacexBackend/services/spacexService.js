const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Handle '/api/launches' route
app.get('/api/launches', (req, res) => {
  axios.get('https://api.spacexdata.com/v4/launches')
    .then(response => {
      res.json(response.data);  // Send the response data as JSON
    })
    .catch(error => {
      console.error('Error fetching launches:', error);
      res.status(500).send('Error fetching launches');
    });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server on port 5000
app.listen(9000, () => {
  console.log('Server running on http://localhost:9000');
});
