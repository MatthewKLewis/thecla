//Dependencies
const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv').config()
const sql = require('mssql')
const path = require('path')
const jwt = require('jsonwebtoken');

//Middleware and MW settings
const app = express();
app.use(express.json());
app.use(cors())
app.set("json spaces", 4);

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
async function connectToMSSQL() {
    try {
        await sql.connect(sqlConfig).then((pool)=>{
            console.log("Ready!");
        })
    } catch (err) {
        console.dir(err)
    }
}
connectToMSSQL();

//ALL SPECIFIC ROUTES MUST BE HERE ON THE TOP
app.use("/api/documentation", express.static(__dirname + '/documentation.html'));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/settlements", require("./routes/settlementRoutes"));
app.use("/api/random", require("./routes/randomRoutes"));

//SERVING THE ANGULAR ROUTED APP AS FOLLOWS
app.get('*.*', express.static(`${__dirname}/dist/thecla`, {maxAge: '1y'}));
app.all('*', function (req, res) {res.status(200).sendFile(`/`, {root: `${__dirname}/dist/thecla`});});

app.set("port", process.env.PORT || 6666);
app.listen(app.get('port'), () => {
  console.log(`Listening on Port ${app.get('port')}`);
});