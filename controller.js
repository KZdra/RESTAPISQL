'use strict';

var response = require('./res');
var connection = require('./config/database');


exports.index = function(req, res) {
    response.ok('rest api jalan bloww',res)
};

