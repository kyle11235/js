/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'my/session', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojinputtext',
        'ojs/ojpopup', 'ojs/ojselectcombobox'],
    function (oj, ko, $, session) {

        function ViewModel() {
            var self = this;
            self.session = session;
            self.actioning = ko.observable(false);
            self.message = ko.observable('');

            // router
            self.router = oj.Router.rootInstance;
            self.go = function (stateId, data) {
                self.router.go(stateId);
            };

            // popup
            self.popupIndex = ko.observable(1);
            self.open = function (index) {
                self.popupIndex(index)
                document.querySelector('#popup').open();
            }
            self.close = function () {
                document.querySelector('#popup').close();
            }
            self.showMe = function (index) {
                return index === self.popupIndex();
            }

            // form
            self.points = ko.observable();
            self.placeholder = ko.computed(function () {
                return '最多可兑换 ' + session.pointsOnChain() + ' 积分';
            }, self);

            self.warning = ko.observable();
            self.disabled = ko.computed(function() {
                if(!self.points()){
                    self.warning('请输入要兑换的积分数');
                    return true;
                }
                if(isNaN(self.points()) || self.points() < 0){
                    self.warning('请输入大于0的数字');
                    return true;
                }
                if(self.points() > session.pointsOnChain()){
                    self.warning('已超出积分余额数');
                    return true;
                }
                self.warning('');
                return false;
            }, self);


            // target & ratio
            self.target = ko.observable(session.data.apps[0]);
            self.ratio = ko.computed(function() {
                return '1:' + self.target().ratio/session.app().ratio;
            }, self);
            self.targetPoints = ko.computed(function () {
                return self.points() * (self.target().ratio/session.app().ratio);
            }, self);

            // submit
            self.submit1 = function() {
                self.actioning(true);
                self.message('submitting...');
                session.exchange(parseInt(self.points()), function(){
                    self.actioning(false);
                    self.message('');
                    self.open(2);
                });
            }


            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additional available methods.

            /**
             * Optional ViewModel method invoked when this ViewModel is about to be
             * used for the View transition.  The application can put data fetch logic
             * here that can return a Promise which will delay the handleAttached function
             * call below until the Promise is resolved.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
             * the promise is resolved
             */
            self.handleActivated = function (info) {
                self.actioning(false);
                self.message('');
            };

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function (info) {
                // Implement if needed
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View.
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function (info) {
                // Implement if needed
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function (info) {
                // Implement if needed
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new ViewModel();
    }
);
