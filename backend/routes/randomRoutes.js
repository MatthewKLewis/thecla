const express = require('express')
const cors = require('cors')
const sql = require('mssql')
const auth = require("../middleware/auth");

const SciFiRandom = require('../utility/randomUtility')
const sFR = new SciFiRandom();

router = express()
router.use(express.json())
router.use(cors())
router.set('json spaces', 4)


//auth middleware adds ['user'] prop to the request, allowing user.ID to be accessed.

router.get("/word", auth, (req, res) => {
    res.json(sFR.getSciFiName(3));
});

module.exports = router;