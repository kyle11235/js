var request = require('request');
var Promise = require('bluebird');
var parser = require('xml2js');
var logger = require('./Logger');

var cache = {};

exports.TOKEN_URL = 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken';
exports.KEY = 'xxx';
exports.TRANSLATE_URL = 'https://api.microsofttranslator.com/V2/Http.svc/Translate';

exports.getAccessToken = function () {
    return new Promise(function (resolve, reject) {
    	var options = {
				url: exports.TOKEN_URL,
				headers: {
					'Ocp-Apim-Subscription-Key': exports.KEY
				},
				method: 'POST'
		};
    	request.post(options, function(error, response, body){
    			if (error) {
    				reject(error);
				}else{
					resolve(body);
				}
		});
    });
};

exports.translate = function (text, from, to) {
	logger.info('Microsoft', "translating");
	var self = this;
	return new Promise(function (resolve, reject) {
		var messageKey = encodeURI(text, 'utf8');
		if(messageKey in cache){
			logger.info('Microsoft', 'Found translation in Local Results:', cache[messageKey]);
			resolve(cache[messageKey]);
		}
		else{
			self.getAccessToken().then(function(accessToken){
				var url = exports.TRANSLATE_URL + '?text=' + encodeURI(text, 'utf8') + '&from=' + from + '&to=' + to;
				//logger.info('Microsoft', 'ms url:' + url);
				var options = {
						url: url,
						headers: {
							'Authorization': 'Bearer' + ' ' + accessToken,
							'Content-Type': 'text/plain;charset=utf-8'
						},
				};
				request.get(options, function (error, response, body) {
					var str = JSON.stringify(body);
					logger.info('Microsoft', str);
					parser.parseString(body, function (err, res) {
						//console.dir(res);
						var value = res.string._;
						logger.info('Microsoft', text + '--->' + value);
					    cache[messageKey] = value;
					    resolve(value);
					});
					
				});
			}).catch(function(error){
				logger.error('Microsoft', error);
				reject(error);
			});
		}
	});
};

//this.translate('我的帳戶裡有多少錢', 'zh-TW', 'en');          //我的帳戶裡有多少錢--->>>How much money is in my account                              
//this.translate('我的臺幣帳戶裡有多少錢', 'zh-TW', 'en');      //我的臺幣帳戶裡有多少錢--->>>My NT accounts in money                                    
//this.translate('我的外幣帳戶裡還有錢嗎', 'zh-TW', 'en');      //我的外幣帳戶裡還有錢嗎--->>>My foreign currency accounts in money, please              
//this.translate('顯示臺幣帳戶最後5筆交易記錄', 'zh-TW', 'en'); //顯示臺幣帳戶最後5筆交易記錄--->>>Show last 5 NT account transaction history              
//this.translate('我上個月花費多少錢在衣服上', 'zh-TW', 'en');  //我上個月花費多少錢在衣服上--->>>Last month I spent money on clothes                      
//this.translate('存款', 'zh-TW', 'en');                        //存款--->>>Deposit                                                             
//this.translate('我要轉帳給媽媽', 'zh-TW', 'en');              //我要轉帳給媽媽--->>>I want to transfer to my mother                                
//this.translate('臺幣', 'zh-TW', 'en');                        //臺幣--->>>NT                                                                  
//this.translate('我的帳戶裡還有多少錢', 'zh-TW', 'en');        //我的帳戶裡還有多少錢--->>>And how much money in my account                            
//this.translate('轉帳', 'zh-TW', 'en');                        //轉帳--->>>Transfer                                                            
//this.translate('信用卡', 'zh-TW', 'en');                        //轉帳--->>>Credit card                                                            


this.translate('我上個月花費多少錢在衣服上', 'zh-TW', 'en');

















