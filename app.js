const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 

app.use(cors());


var routes = require('./routes');
routes(app);

// Allow requests from any origin
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });