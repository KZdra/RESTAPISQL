'use strict';

var response = require('./res');
var connection = require('./config/database');


exports.index = function(req, res) {
    response.ok('rest api jalan bloww',res)
};

exports.tampil = function(req, res){
    connection.query('SELECT * FROM siswa', function (error , rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};