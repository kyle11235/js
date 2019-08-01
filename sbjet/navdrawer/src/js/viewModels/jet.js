/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise',
        'ojs/ojdatagrid', 'ojs/ojarraydatagriddatasource','ojs/ojlistview','ojs/ojselectcombobox','ojs/ojmodule', 'ojs/ojbutton',
        'ojs/ojcomposite', 'jet-composites/demo-card/loader'],
 function(oj, ko, $) {
  
    function ViewModel() {
        var self = this;

        // data drid
        var dataArray = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];
        self.dataSource = new oj.ArrayDataGridDataSource(dataArray);

        // button
        self.clickedButton = ko.observable("(None clicked yet)");
        self.buttonClick = function(event){
            self.clickedButton(event.currentTarget.id);
            return true;
        }


        // select
        self.val = ko.observable("CH");


        //module
        self.currentModule = ko.observable("second");
        self.modulePath = ko.pureComputed(
            function()
            {
                var name = self.currentModule();
                return (name === 'oj:blank'? name: 'ojModule-simple/' + name);
            }
        );

        //composite
        self.employees = [
            {
                name: 'Deb Raphaely',
                avatar: 'images/person/01.png',
                title: 'Purchasing Director',
                work: 5171278899,
                email: 'deb.raphaely@oracle.com'
            },
            {
                name: 'Adam Fripp',
                avatar: null,
                title: 'IT Manager',
                work: 6501232234,
                email: 'adam.fripp@oracle.com'
            }
        ];
    }
    return new ViewModel();
  }
);
