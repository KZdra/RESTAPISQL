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

exports.tampilId = function(req,res){
    let ids= req.params.id;
    connection.query('SELECT * FROM siswa WHERE id = ?',[ids] ,function (error , rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};