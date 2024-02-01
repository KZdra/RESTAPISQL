const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 


var routes = require('./routes');
routes(app);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});