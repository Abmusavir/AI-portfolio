const db = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= ROUTE ================= */

app.get("/", (req, res) => {

    res.send("AI Portfolio Backend Running 🚀");

});
/* ================= CONTACT API ================= */

app.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    const sql =
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {

        if(err){

            console.log(err);

            res.status(500).send("Database Error");

        } else {

            res.send("Message Sent Successfully 🚀");

        }

    });

});
/* ================= GET MESSAGES ================= */

app.get("/messages", (req, res) => {

    const sql =
    "SELECT * FROM contacts ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

            res.status(500).send("Database Error");

        } else {

            res.json(result);

        }

    });

});
/* ================= ADD PROJECT ================= */

app.post("/add-project", (req, res) => {

    const {

        title,
        description,
        image,
        github,
        live_demo

    } = req.body;

    const sql =

    `INSERT INTO projects
    (title, description, image, github, live_demo)

    VALUES (?, ?, ?, ?, ?)`;

    db.query(

        sql,

        [

            title,
            description,
            image,
            github,
            live_demo

        ],

        (err, result) => {

            if(err){

                console.log(err);

                res.status(500).send("Database Error");

            } else {

                res.send("Project Added 🚀");

            }

        }

    );

});
/* ================= GET PROJECTS ================= */

app.get("/projects", (req, res) => {

    const sql =
    "SELECT * FROM projects ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

            res.status(500).send("Database Error");

        } else {

            res.json(result);

        }

    });

});
/* ================= DELETE PROJECT ================= */

app.delete("/delete-project/:id",

(req, res) => {

    const { id } = req.params;

    const sql =
    "DELETE FROM projects WHERE id = ?";

    db.query(sql, [id],

    (err, result) => {

        if(err){

            console.log(err);

            res.status(500)
            .send("Database Error");

        } else {

            res.send("Project Deleted 🚀");

        }

    });

});

/* ================= SERVER ================= */

app.listen(5000, () => {

    console.log("Server running on port 5000");

});
/* ================= ADMIN LOGIN ================= */

app.post("/admin-login",

(req, res) => {

    const { email, password } = req.body;

    const adminEmail =
    "admin@gmail.com";

    const adminPassword =
    "musavir123";

    if(

        email === adminEmail &&

        password === adminPassword

    ){

        res.json({

            success:true,

            message:"Login Successful"

        });

    } else {

        res.status(401).json({

            success:false,

            message:"Invalid Credentials"

        });

    }

});