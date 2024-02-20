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
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    var hobi = req.body.hobi;
    connection.query('INSERT INTO SISWA (nama,jurusan,hobi) VALUES(?,?,?)', [nama, jurusan, hobi],
        function (error, rows, fileds) {
            if (error) {
                connection.log(error);
            } else {
                response.ok('Berhasil Tambah Data', res)
            }
        });

};

exports.editData = function (req, res) {
    let id = req.params.id; // Mengambil id dari parameter URL
    let formData = {
        nama: req.body.nama,
        jurusan: req.body.jurusan,
        hobi: req.body.hobi
    };

    // Gunakan parameterized query untuk mencegah SQL injection
    connection.query('UPDATE siswa SET ? WHERE id = ?', [formData, id], function (err, result) {
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
    var id = req.body.id;
    connection.query('DELETE FROM siswa WHERE id =?', [id],
        function (error, rows, fileds) {
            if (error) {
                connection.log(error);
            } else {
                response.ok('Berhasil Dihapuss', res)
            }
        });
}


