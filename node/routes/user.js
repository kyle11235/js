const express = require('express');
const moment = require('moment');
const router = express.Router();
const userService = require('../service/UserService');


// put login before update, the router order matters
router.post('/login', function (req, res) {
    const user = {
        name: req.body.name,
        password: req.body.password
    };
    userService.queryByName(user.name).then(result => {
        if (result && result.password === user.password) {
            res.json({status: 0, message: 'success'});
            return;
        }
        res.json({status: 1, message: 'invalid name or password'});
    }).catch(error => {
        res.json(error);
    });
});

// queryAll
router.get('/', function (req, res) {
    userService.queryAll().then(result => {
        res.json(result);
        // if you have more than one res.json, use return to prevent program from going down
        return;
    }).catch(error => {
        res.json(error);
    });
});

// insert
router.put('/', function (req, res) {
    const user = {
        name: req.body.name,
        password: req.body.password,
        create_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    };
    userService.insert(user).then(result => {
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// queryByName
router.get('/:name', function (req, res) {
    userService.queryByName(req.params.name).then(result => {
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// update
router.post('/:name', function (req, res) {
    const user = {
        name: req.params.name,
        password: req.body.password
    };
    userService.update(user).then(result => {
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// close this endpoint
router.delete('/:name', function (req, res) {
    res.json({status: 1, message: 'endpoint is closed'});
});


module.exports = router;
