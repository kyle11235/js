/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojbutton', 'promise', 'ojs/ojtable', 'ojs/ojgauge', 'ojs/ojarraytabledatasource'],
    function (oj, ko, $) {
        function ViewModel() {

            var self = this;
            self.router = oj.Router.rootInstance;

            // table
            self.observableArray = ko.observableArray([]);
            self.datasource = new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'ID'});
            self.columnArray = [
                {
                    "headerText": "ID",
                    "field": "ID",
                    "className": "xxx",
                    "headerStyle": "color: red"
                },
                {
                    "headerText": "Name",
                    "sortable": "enabled",
                    "renderer": oj.KnockoutTemplateUtils.getRenderer("name", true),
                    "sortProperty": "name"
                },
                {
                    "headerRenderer": oj.KnockoutTemplateUtils.getRenderer("oracle_link_header", true),
                    "renderer": oj.KnockoutTemplateUtils.getRenderer("oracle_link", true)
                }]

            // fake table data
            self.fakedata = [
                {
                    ID: '1',
                    name: 'aaa',
                    url: 'oracle.com'
                },
                {
                    ID: '2',
                    name: 'bbb',
                    url: 'oracle.com'
                }];

            // table functions
            self.q = ko.observable();
            self.search = function () {
                var query = self.syncFormToUrl();
                console.log('searching with ' + JSON.stringify(query));

                // local search
                var result = [];
                if(!query.q || query.q.trim() === ''){
                    result = self.fakedata;
                }else{
                    for (var i = 0; i < self.fakedata.length; i++) {
                        if (self.fakedata[i].name.toLowerCase().indexOf(query.q.toLowerCase()) > -1) {
                            result.push(self.fakedata[i]);
                        }
                    }
                }
                

                // refresh
                self.observableArray(result);
                self.datasource = new oj.ArrayTableDataSource(self.observableArray, {idAttribute: 'ID'});
            }

            // table desktop style
            window.updateCurrent = function (id, name) {
                alert('update:' + id + ',' + name)
                //  self.id(id);
                // self.type(name);
            }

            // table mobile style
            self.currentID = ko.observable('');
            self.selectCurrent = function(event){
                // setting currentRow null will trigger event again
                if(!event.detail.value){
                    return;
                }
                self.currentID(event.detail.value.rowKey);
                alert('select:' + self.currentID());
                document.getElementById("table").currentRow = null;
                // open popup OR route to another view
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
                self.search();
            };

        }

        return new ViewModel();
    }
);
