// base variable
const mysql = require('mysql2');

// connect to database
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'dolphin_cove'
})

// tells if the database is connected or not
conn.connect(function(err) {
    if(err) console.log(err);
    else console.log('Database is successfully connected!');
})

// export connection
module.exports = conn