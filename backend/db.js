const mysql = require("mysql2");
require("dotenv").config();

/* ================= DATABASE CONNECTION ================= */

const db = mysql.createConnection({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME

});

/* ================= CONNECT ================= */

db.connect((err) => {

    if(err){

        console.log("Database Error:", err);

    } else {

        console.log("MySQL Connected 🚀");

    }

});

module.exports = db;