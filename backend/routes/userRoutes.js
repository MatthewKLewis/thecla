const express = require('express')
const cors = require('cors')
const sql = require('mssql')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router = express()
router.use(express.json())
router.use(cors())
router.set('json spaces', 4)

//auth middleware adds ['user'] prop to the request, allowing user.ID to be accessed.

router.get("/all", auth, (req, res) => {
    var sp = new sql.Request();
    sp.execute('sp_GetAllUsers').then(function (users, err) {
        res.json(users.recordset);
    });
});

router.get("/:id", auth, (req, res) => {
    var sp = new sql.Request();
    sp.input('id', sql.Int, req.params.id);
    sp.execute('sp_GetUserByID').then(function (users, err) {
        res.json(users.recordset);
    });
});

router.post("/createUser/", (req, res) => {
    var sp = new sql.Request();
    bcrypt.hash(String(req.body.password), 10, (err, hash) => {
        if (err) throw err;
        sp.input('name', sql.NVarChar, req.body.username);
        sp.input('password', sql.NVarChar, hash);
        sp.input('email', sql.NVarChar, req.body.email);
        sp.execute('sp_CreateUser').then(function (users, err) {
            res.json(users.recordset[0]);
        });
    });
});

router.post("/login", (req, res, next) => {
    var sp = new sql.Request();
    sp.input('name', sql.NVarChar, req.body.username);
    sp.execute('sp_Login').then(function (users, err) {
        if (users.recordset.length == 1) {
            var user = users.recordset[0]; //error handle here
            bcrypt.compare(req.body.password, user.password).then((isValid) => {
                if (isValid) {
                    //console.log(user)
                    res.json({
                        success: true,
                        msg: "log in success",
                        token: jwt.sign({id: user.id, name: user.name}, process.env.TOKEN_SECRET, { expiresIn: 86400, }),
                        user: {
                            id: user.id,
                            username: user.name,
                            email: user.email,
                            lastLogin: user.lastLogin
                        },
                    });
                } else { res.status(400).send("Password Incorrect") }
            })
        } else { res.status(400).send("Username Incorrect") }
    });
});

module.exports = router;