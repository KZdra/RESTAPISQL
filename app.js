const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 

app.use(cors())

var routes = require('./routes');
routes(app);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});