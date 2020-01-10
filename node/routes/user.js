const express = require('express');
const moment = require('moment');
const router = express.Router();
const userService = require('../service/UserService');


// put login before update, the router order matters
router.post('/login', async (req, res) => {
    const user = req.body;

    let result = await userService.getByName(user.name).catch((error) => { res.json(error) });
    if (result && result.data.password === user.password) {
        res.json({status: 'success', message: 'success'});
        return;
    }else{
        res.json({status: 'failed', message: 'failed'});
        return;
    }
});

router.get('/list', async (req, res) => {
    let result = await userService.getList().catch((error) => { res.json(error) });
    res.json(result);
});

router.post('/create', async (req, res) => {
    // insert from mysql workbench / new Date() by program -> UTC+0 without timezone stored on server
    // display proper time format based on your device time zone
    let now = new Date();
    let user = req.body;
    console.log('user=',user);
    user.add_time = now;
    user.update_time = now;
    
    let result = await userService.create(user).catch((error) => { res.json(error) });
    res.json(result);
});

router.get('/read', async (req, res) => {
    console.log('id=' + req.param('id'));
    let result = await userService.getByID(req.param('id')).catch((error) => { res.json(error) });
    res.json(result);
});

router.post('/update', async (req, res) => {
    let user = req.body;
    user.update_time = new Date();
    let result = await userService.update(user).catch((error) => { res.json(error) });
    res.json(result);
});

router.get('/delete', async (req, res) => {
    console.log('id=' + req.param('id'));
    let result = await userService.delete(req.param('id')).catch((error) => { res.json(error) });
    res.json(result);
});


module.exports = router;
