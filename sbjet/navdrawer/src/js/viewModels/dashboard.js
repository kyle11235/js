/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojbutton'],
    function (oj, ko, $) {

        function ViewModel() {
            var self = this;
            self.router = oj.Router.rootInstance;

            // functions
            self.q = ko.observable("a");
            self.search = function (event) {
                self.syncFormToUrl();
                self.router.go('departments');
                return true;
            }


            // remarkable url
            self.syncFormToUrl = function () {
                var query = {};
                query.q = self.q();
                self.router.store(query);
                return query;
            }

            self.syncUrlToForm = function () {
                var query = self.router.retrieve();
                if (query && query.q) {
                    self.q = ko.observable(query.q);
                }
            }

            self.handleActivated = function (info) {
                self.syncUrlToForm();
            };
        }

        return new ViewModel();
    }
);
