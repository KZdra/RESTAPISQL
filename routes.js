'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
    .get(jsonku.index);
    app.route('/tampil')
    .get(jsonku.tampil);
    app.route('/tampil/:id')
    .get(jsonku.tampilId);
    app.route('/tambah')
    .post(jsonku.tambahData);
    app.route('/edit')
    .put(jsonku.editData);
}


