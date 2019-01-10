var crypto = require('crypto');
var request = require('request');
var logger = require('../utils/Logger');
var Promise = require('bluebird');

var cache = {};

exports.BAIDU_APPID = 'xxx';
exports.BAIDU_SECRET_KEY = 'xxx';
exports.BAIDU_TRANSLATE_URL = 'xxx';

exports.translate = function (fromLang, toLang, message) {

    return new Promise(function (resolve, reject) {
        var messageKey = encodeURI(message, 'utf8');
        if(messageKey in cache){
            logger.info('TranslateModule', 'Found translation in Local Results:', cache[messageKey]);
            resolve(cache[messageKey]);
        }
        else{
            var appid = exports.BAIDU_APPID;
            var key = exports.BAIDU_SECRET_KEY;
            var salt = (new Date).getTime();
            var query = message;
            var from = fromLang;
            var to = toLang;
            var str1 = appid + query + salt +key;
            var sign = crypto.createHash('md5').update(new Buffer(str1, 'utf8')).digest("hex");
            var url = exports.BAIDU_TRANSLATE_URL + '?q=' + encodeURI(query, 'utf8') + '&appid=' + appid + '&salt=' + salt + '&from=' + from + '&to=' + to + '&sign=' + sign;
            var options = {
                url: url
            };
            request.get(options, function (error, response, body) {
                logger.info('TranslateModule', 'Translate Result:', body);
                var value = JSON.parse(body).trans_result[0].dst;
                cache[messageKey] = value;
                logger.info('TranslateModule', 'Local Results:', JSON.stringify(cache));
                resolve(value);
            });
        }
    });
};

//this.translate('auto', 'en','查询kyle技能');
//this.translate('auto', 'en','查看kyle技能');


