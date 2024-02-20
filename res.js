'use strict';


exports.ok = function (values, res) {
    var data = {
        'status': true,
        'data': values
    };
     res.json(data);
     res.end();
}