const express = require('express');
const moment = require('moment');
const router = express.Router();
const userService = require('../service/UserService');


// put login before update, the router order matters
router.post('/login', function (req, res) {
    const user = req.body;
    userService.getByName(user.name).then(result => {
        if (result && result.data.password === user.password) {
            res.json({status: 'success', message: 'success'});
            return;
        }
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// getAll
router.get('/list', function (req, res) {
    userService.getList().then(result => {
        res.json(result);
        // if you have more than one res.json, use return to prevent program from going down
        return;
    }).catch(error => {
        res.json(error);
    });
});

// create
router.post('/create', function (req, res) {
    
    // insert from mysql workbench / new Date() by program -> UTC+0 without timezone stored on server
    // display proper time format based on your device time zone
    let now = new Date();
    let user = req.body;
    console.log('user=',user);
    user.add_time = now;
    user.update_time = now;
   
    userService.create(user).then(result => {
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// read
router.get('/read', function (req, res) {
    console.log('id=' + req.param('id'));
    userService.getByID(req.param('id')).then(result => {
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// update
router.post('/update', function (req, res) {
    let user = req.body.user;
    user.update_time = new Date();
    userService.update(user).then(result => {
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});

// delete
router.delete('/delete', function (req, res) {
    userService.delete(req.param('id')).then(result => {
        res.json(result);
    }).catch(error => {
        res.json(error);
    });
});


module.exports = router;
