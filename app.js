// Import necessary libraries
const express = require('express'); 
const bodyParser = require('body-parser'); 

const app = express(); 
const port = 80;

// Initialize a counter for POST requests.
let postCounter = 0;

// We're preparing our website to understand a certain kind of information.
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 

// Define a route to handle GET requests for '/get-counter'.
app.get('/get-counter', (req, res) => {
  res.send({ count: postCounter }); 
});

// Define a route to handle POST requests for '/post-counter'
app.post('/post-counter', (req, res) => {
  // When someone sends us information, we'll increase the count.
  postCounter++; 
  res.sendStatus(200);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // We're telling the computer to start our website and watch for visitors.
});
