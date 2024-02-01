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

exports.tambahData = function (req, res) {
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    var hobi = req.body.hobi;
    connection.query('INSERT INTO SISWA (nama,jurusan,hobi) VALUES(?,?,?)', [nama,jurusan,hobi],
    function (error , rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok('Berhasil Tambah Data', res)
        }
    });
       
};

exports.editData = function (req, res) {
    var id = req.body.id;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    var hobi = req.body.hobi;
    connection.query('UPDATE siswa SET nama=?,jurusan=?,hobi=? WHERE id =?', [nama,jurusan,hobi,id],
    function (error , rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok('Berhasil Ubah Data', res)
        }
    });
}

exports.deleteData = function (req, res){
    var id = req.body.id;
    connection.query('DELETE FROM siswa WHERE id =?', [id],
    function (error , rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok('Berhasil Dihapuss', res)
        }
    });
}