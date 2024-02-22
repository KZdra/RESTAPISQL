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

const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/', // Folder untuk menyimpan gambar
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000}, // 1 MB maksimal
}).single('gambar'); // 'gambar' adalah nama field pada form yang digunakan untuk mengirimkan gambar

exports.tambahData = function (req, res) {
    upload(req, res, function(err) {
        if(err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            const nis = req.body.nis;
            const nama = req.body.nama;
            const jenis_kelamin = req.body.jenis_kelamin;
            const tempat_lahir = req.body.tempat_lahir;
            const tanggal_lahir = req.body.tanggal_lahir;
            const no_hp = req.body.no_hp;
            const alamat = req.body.alamat;
            const nama_ortu = req.body.nama_ortu;
            const gambar = req.file ? req.file.filename : null; // Mengambil nama file gambar jika ada

            connection.query('INSERT INTO SISWA (nis, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, no_hp, alamat, nama_ortu, gambar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nis, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, no_hp, alamat, nama_ortu, gambar],
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
        }
    });
};

exports.editData = function (req, res) {
    const id = req.params.id; // Mengambil id dari parameter URL

    upload(req, res, function(err) {
        if(err) {
            console.error(err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            });
        } else {
            const updatedData = {
                nis: req.body.nis,
                nama: req.body.nama,
                jenis_kelamin: req.body.jenis_kelamin,
                tempat_lahir: req.body.tempat_lahir,
                tanggal_lahir: req.body.tanggal_lahir,
                no_hp: req.body.no_hp,
                alamat: req.body.alamat,
                nama_ortu: req.body.nama_ortu,
                gambar: req.file ? req.file.filename : null // Mengambil nama file gambar jika ada
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


