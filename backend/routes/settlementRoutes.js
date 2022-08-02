const express = require('express')
const cors = require('cors')
const sql = require('mssql')
const auth = require("../middleware/auth");
const SciFiRandom = require('../utility/randomUtility')

router = express()
router.use(express.json())
router.use(cors())
router.set('json spaces', 4)

//auth middleware adds ['user'] prop to the request, allowing user.id to be accessed.

router.post("/all", auth, (req, res, next) => {
    //console.log(req.body);
    //onsole.log(req.user);
    var sp = new sql.Request();
    sp.input('userID', sql.Int, req.user.id);
    sp.input('pageSize', sql.Int, req.body.pageSize || 10);
    sp.input('pageIndex', sql.Int, req.body.pageIndex || 0);
    sp.input('sortColumn', sql.Int, req.body.sortColumn || 1);
    sp.input('isDescending', sql.Bit, req.body.isDescending ? 1 : 0);
    sp.input('searchTerm', sql.NVarChar, req.body.searchTerm || '');

    sp.output('length', sql.Int)

    sp.execute('sp_GetAllSettlements2').then(function (sqlReturn, err) {
        //console.log(sqlReturn)
        res.json(sqlReturn);
    });
});

router.post("/renderable", auth, (req, res) => {
    var sp = new sql.Request();
    sp.input('userID', sql.Int, req.user.id);
    sp.input('returnCap', sql.Int, 10);
    sp.input('northBound', sql.Float, req.body.north);
    sp.input('southBound', sql.Float, req.body.south);
    sp.input('eastBound', sql.Float, req.body.east);
    sp.input('westBound', sql.Float, req.body.west);
    sp.input('regionID', sql.Int, req.body.regionID);
    sp.input('resolution', sql.Int, req.body.resolution);
    sp.execute('sp_GetSettlementsToRender').then(function (sqlReturn, err) {
        //console.log(sqlReturn)
        res.json(sqlReturn);
    });
});

router.post("/add", auth, (req, res) => {
    var sp = new sql.Request();
    sp.input('userID', sql.Int, req.user.id);
    sp.input('x', sql.Int, req.body.x);
    sp.input('y', sql.Int, req.body.y);
    sp.input('regionID', sql.Int, req.body.regionID);
    sp.input('name', sql.NVarChar, req.body.name);
    sp.input('description', sql.NVarChar, req.body.description);
    sp.input('displayAtResolution', sql.Int, req.body.displayAtResolution);
    sp.execute('sp_CreateSettlement').then(function (sqlReturn, err) {
        //console.log(sqlReturn)
        res.json(sqlReturn);
    });
});

module.exports = router;