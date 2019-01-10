// modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// base url address - http://localhost:3000
app.listen(3000, function () {
    console.log('running at 3000...');
});

// taobao api - search
app.get('/taobao/api/search', function (req, res) {
    var keyword = req.query.keyword;
    var result = null;

    if(keyword === 'apple'){
        result = {
          title: 'apple',
          price: 1000
        };
    }else if(keyword === 'huawei'){
        result = {
          title: 'huawei',
          price: 500
        };
    } else{
        // what can you enhance here?
        result = {
          error: 'cannot find any items'
        }
    }
  
    // send response back to user's browser
    res.json(result);
});

// taobao api - pay
app.get('/taobao/api/pay', function (req, res) {

    const params = {
        user: req.query.user,
        seller: req.query.seller,
        money: req.query.money
    };
    
    const options = {
        url: 'http://localhost:4000/alipay/api/pay',
        json: true,
        body: params
    };
    
    // call alipay's api
    request.post(options, function (error, response, result) {
        // transfer alipay's response to taotao's user
        res.json(result);
    });
    
});

