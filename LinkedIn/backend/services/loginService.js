var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')

router.post('/login', (req, res) => {
    console.log("\n\nIn login request");
    // console.log(`email: ${req.body.email}, password: ${req.body.password} `)
    // kafka.make_request('login', req.body, async function (err, result) {
    //     if (err) {
    //         res.code = "400";
    //         res.value = "Something went wrong!";
    //         console.log(res.value);
    //         res.sendStatus(400).end();
    //     } else {

           

    //     }
    // })


})

module.exports = router;