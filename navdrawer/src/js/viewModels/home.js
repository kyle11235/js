/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'my/session', 'ojs/ojavatar', 'ojs/ojbutton', 'ojs/ojtoolbar',
        'ojs/ojpopup'],
    function (oj, ko, $, session) {

        function ViewModel() {
            var self = this;

            // Router setup
            self.router = oj.Router.rootInstance;
            self.go = function (stateId, data) {
                self.router.go(stateId);
            };

            // get app and username from url and init session
            self.getParam = (function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return decodeURI(r[2]);
                return null;
            });

            session.init(self.getParam('appid'), self.getParam('userid'));
            self.session = session;

            // popup, do not use multiple popups, instead use an index to represent the state of one popup with many sections
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

            // goUpChain
            self.goUpChain = function () {
                if (session.pointsOffChain() <= 0) {
                    self.open(1);
                    return;
                }
                self.router.go('upChain');
            };

            // goExchange
            self.goExchange = function () {
                if (session.pointsOnChain() <= 0) {
                    self.open(2);
                    return;
                }
                self.router.go('exchange');
            };

            // goOffChain
            self.goOffChain = function () {
                if (session.pointsOnChain() <= 0) {
                    self.open(3);
                    return;
                }
                self.router.go('offChain');
            };


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
                // Implement if needed
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
