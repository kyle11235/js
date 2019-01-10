/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'text!my/data.json'],
    function (oj, ko, $, data) {

        function ViewModel() {
            var self = this;
            self.data = {};

            // guid
            self.guid = function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }

            // ajax
            const baseUrl = '';
            self.foo = function (callback) {
                let data = {};
                $.ajax({
                    type: "POST",
                    url: baseUrl,
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType:'json',
                    success: function (data) {
                        callback(data);
                    }
                });
            }

            // bcs ajax
            const proxyUrl = 'http://localhost:8080?url=';
            const bcsQueryUrl = 'http://xxx:4333/bcsgw/rest/v1/transaction/query';
            const bcsInvokeUrl = 'http://xxx:4333/bcsgw/rest/v1/transaction/invocation';
            const bcsData = {
                "channel": "defenceorderer",
                "chaincode": "defence",
                "method": null,
                "args": null,
                "chaincodeVer":
                    "v1"
            };
            self.bar = function(callback){
                let data = JSON.parse(JSON.stringify(bcsData));
                data.args = [];
                data.method = 'createIdentity';
                $.ajax({
                     type: "POST",
                     url: proxyUrl + bcsInvokeUrl,
                     data: JSON.stringify(data),
                     contentType: "application/json",
                     headers: {
                         Accept: "application/json",
                     },
                     success: function (data) {
                         callback(data);
                         // data.returnCode = 'Success'
                     }
                 });
            }

            // all session states for this app
            self.app = ko.observable({});
            self.user = ko.observable({});
            self.pointsOffChain = ko.observable(0);
            self.pointsOnChain = ko.observable(0);

            // init
            self.testing = true;
            self.init = function (appid, userid) {
                if (self.testing) {
                    // fake data
                    self.data = JSON.parse(data);

                    // use the frist one as fake app & username
                    self.app(self.data.apps[0]);
                    self.user(self.data.users[0]);

                    // fake points for current user
                    self.pointsOffChain(20000);
                    self.pointsOnChain(100);
                } else {
                    let app = self.data.apps.find(e => {
                        return e.id === appid ? e : null;
                    });
                    self.app(app);

                    let user = self.data.users.find(e => {
                        return e.id === userid ? e : null;
                    });
                    self.user(user);
                    // get pointsOffChain from DB
                    // get pointsOnChain from BCS
                }

                console.log('app=' + JSON.stringify(self.app()));
                console.log('user=' + JSON.stringify(self.user()));
            }
            self.init();

            // functions
            self.movePointsUpChain = function (points, callback) {
                self.pointsOffChain(self.pointsOffChain() - points);
                self.pointsOnChain(self.pointsOnChain() + points);
                callback();
            }

            self.exchange = function (points, callback) {
                self.pointsOnChain(self.pointsOnChain() - points);
                callback();
            }

            self.movePointsOffChain = function (points, callback) {
                self.pointsOnChain(self.pointsOnChain() - points);
                self.pointsOffChain(self.pointsOffChain() + points);
                callback();
            }

        }

        return new ViewModel();
    }
);
