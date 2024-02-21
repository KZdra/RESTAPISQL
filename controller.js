'use strict';

var response = require('./res');
var connection = require('./config/database');


exports.index = function (req, res) {
    response.ok('rest api jalan bloww', res)
};

exports.tampil = function (req, res) {
    connection.query('SELECT * FROM siswa', function (error, rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.tampilId = function (req, res) {
    let ids = req.params.id;
    connection.query('SELECT * FROM siswa WHERE id = ?', [ids], function (error, rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.tambahData = function (req, res) {
    var nis = req.body.nis;
    var nama = req.body.nama;
    var jenis_kelamin = req.body.jenis_kelamin;
    var tempat_lahir = req.body.tempat_lahir;
    var tanggal_lahir = req.body.tanggal_lahir;
    var no_hp = req.body.no_hp;
    var alamat = req.body.alamat;
    var nama_ortu = req.body.nama_ortu;
    
    connection.query('INSERT INTO SISWA (nis, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, no_hp, alamat, nama_ortu) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nis, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, no_hp, alamat, nama_ortu],
        function (error, rows, fields) {
            if (error) {
                console.error(error); // Menggunakan console.error untuk menangani kesalahan
                return res.status(500).json({
                    status: false,
                    message: 'Internal Server Error',
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'Berhasil Tambah Data',
                });
            }
        });
};

exports.editData = function (req, res) {
    let id = req.params.id; // Mengambil id dari parameter URL
    let updatedData = {
        nis: req.body.nis,
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        no_hp: req.body.no_hp,
        alamat: req.body.alamat,
        nama_ortu: req.body.nama_ortu
    };

    // Gunakan parameterized query untuk mencegah SQL injection
    connection.query('UPDATE SISWA SET ? WHERE id = ?', [updatedData, id], function (err, result) {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            console.log("Rows affected:", result.affectedRows);
            if (result.affectedRows === 0) {
                // Tidak ada baris yang terpengaruh, artinya sumber daya dengan ID yang diberikan tidak ditemukan
                return res.status(404).json({
                    status: false,
                    message: 'Resource not found',
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!',
            });
        }
    });
};




exports.deleteData = function (req, res) {
    var id = req.params.id; // changes to params.id soalnya body.id cuma buat di form postman
    connection.query('DELETE FROM siswa WHERE id =?', [id],
        function (error, rows, fileds) {
            if (error) {
                connection.log(error);
            } else {
                response.ok('Berhasil Dihapuss', res)
            }
        });
}


