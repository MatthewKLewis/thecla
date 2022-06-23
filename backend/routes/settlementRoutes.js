const express = require('express')
const cors = require('cors')
const sql = require('mssql')
const auth = require("../middleware/auth");
const SciFiRandom = require('../utility/randomUtility')

router = express()
router.use(express.json())
router.use(cors())
router.set('json spaces', 4)

//auth middleware adds ['user'] prop to the request, allowing user.ID to be accessed.

router.post("/all", auth, (req, res, next) => {
    var sp = new sql.Request();
    sp.input('userID', sql.Int, req.user.ID);
    sp.input('pageSize', sql.Int, req.body.pageSize || 10);
    sp.input('pageIndex', sql.Int, req.body.pageIndex || 0);
    sp.input('sortColumn', sql.Int, req.body.sortColumn || 1);
    sp.input('isDescending', sql.Bit, req.body.isDescending ? 1 : 0);
    sp.input('searchTerm', sql.NVarChar, req.body.searchTerm || '');

    sp.output('length', sql.Int)

    sp.execute('sp_GetAllSettlements2').then(function (sqlReturn, err) {
        res.json(sqlReturn);
    });
});

router.post("/renderable", auth, (req, res) => {
    var sp = new sql.Request();
    sp.input('userID', sql.Int, req.user.ID);
    sp.input('returnCap', sql.Int, 10);
    sp.input('northBound', sql.Float, req.body.north);
    sp.input('southBound', sql.Float, req.body.south);
    sp.input('eastBound', sql.Float, req.body.east);
    sp.input('westBound', sql.Float, req.body.west);
    sp.execute('sp_GetSettlementsToRender').then(function (sqlReturn, err) {
        res.json(sqlReturn);
    });
});

router.post("/add", auth, (req, res) => {
    var sp = new sql.Request();
    sp.input('userID', sql.Int, req.user.ID);
    sp.input('name', sql.NVarChar, req.body.Name);
    sp.input('description', sql.NVarChar, req.body.Description);
    sp.execute('sp_CreateSettlement').then(function (sqlReturn, err) {
        res.json(sqlReturn);
    });
});

module.exports = router;