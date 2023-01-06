var express = require('express')
var router = express.Router()

const Notification = require('../models/notification');

router.put('/:platformName/:deviceToken', async function(req, res) {
    try
    {
        await Notification.AddToken(req.user.sub, req.params.deviceToken, req.params.platformName);
        res.send(new StatusMsg({ status: "OK" }));
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send(new Error(err.message));
    }
});

module.exports = router