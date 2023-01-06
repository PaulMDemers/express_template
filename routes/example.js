var express = require('express')
var router = express.Router();

const StatusMsg = require('../models/statusMsg');
const ErrorMsg = require('../models/errorMsg');

router.get('/', async function(req, res) {
    try {
        //DB Access etc
        res.send(new StatusMsg({status: "OK"}));
    } catch (err) {
        console.log(err.message);
        res.status(500).send(new Error(err.message));
    }
})

module.exports = router;