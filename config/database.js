var mysql =require ('mysql');


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'indra_api'


});

conn.connect((err)=>{
    if (err) throw err;
    console.log('CONNECTED TO SQL')
});


module.exports= conn;