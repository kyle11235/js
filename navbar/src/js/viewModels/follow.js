/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery',
        'my/session',
        'text!data/data.json',
        'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojmenu','ojs/ojavatar', 'ojs/ojlabel','ojs/ojinputtext',
        'ojs/ojnavigationlist',
        'ojs/ojswitcher',
        'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojarraytabledatasource',
        'ojs/ojswitch',
        'ojs/ojswipetoreveal', 'ojs/ojdatacollection-common'],
    function (oj, ko, $, session, data) {

        function ViewModel() {
            var self = this;

            // Router setup
            self.router = oj.Router.rootInstance;

            // fake data
            self.data = JSON.parse(data);

            self.allItems = ko.observableArray(self.data.assets.slice());
            self.currentItemId = ko.observable();

            // swipe
            self.dataSource = new oj.ArrayTableDataSource(self.allItems, {
                idAttribute : "id"
            });

            // viewModel ojModule convention method
            self.handleTransitionCompleted = function() {
                var busyContext = oj.Context.getPageContext()
                    .getBusyContext();
                busyContext
                    .whenReady(5000)
                    .then(
                        function() {
                            // register swipe to reveal for all new
                            // list items
                            $("#listview")
                                .find(".item-marker")
                                .each(
                                    function(index) {
                                        var item = $(this);
                                        var id = item
                                            .prop("id");
                                        var startOffcanvas = item
                                            .find(
                                                ".oj-offcanvas-start")
                                            .first();
                                        var endOffcanvas = item
                                            .find(
                                                ".oj-offcanvas-end")
                                            .first();

                                        // setup swipe
                                        // actions
                                        oj.SwipeToRevealUtils
                                            .setupSwipeActions(startOffcanvas);
                                        oj.SwipeToRevealUtils
                                            .setupSwipeActions(endOffcanvas);

                                        // make sure
                                        // listener only
                                        // registered once
                                        endOffcanvas
                                            .off("ojdefaultaction");
                                        endOffcanvas
                                            .on(
                                                "ojdefaultaction",
                                                function() {
                                                    self
                                                        .handleDefaultAction(item);
                                                });
                                    });
                        });
            };

            // viewModel ojModule convention method
            self.handleDeactivated = function() {
                // register swipe to reveal for all new list items
                $("#listview").find(".item-marker").each(
                    function(index) {
                        var startOffcanvas = $(this).find(
                            ".oj-offcanvas-start").first();
                        var endOffcanvas = $(this).find(
                            ".oj-offcanvas-end").first();

                        oj.SwipeToRevealUtils
                            .tearDownSwipeActions(startOffcanvas);
                        oj.SwipeToRevealUtils
                            .tearDownSwipeActions(endOffcanvas);
                    });
            };

            self.handleMenuBeforeOpen = function(event)
            {
                var target = event.detail.originalEvent.target;
                var context = document.getElementById("listview").getContextByNode(target);
                if (context != null)
                {
                    self.currentItem = $("#"+context['key']);
                }
                else
                {
                    self.currentItem = null;
                }
            };

            self.handleMenuItemAction = function(event)
            {
                var id = event.target.id;
                if (id == "read")
                    self.handleRead();
                else if (id == "more1" || id == "more2")
                    self.handleMore();
                else if (id == "follow")
                    self.handleFlag();
                else if (id == "delete")
                    self.handleTrash();
            };

            self.closeToolbar = function(which, item)
            {
                var toolbarId = "#"+which+"_toolbar_"+item.prop("id");
                var drawer = {"displayMode": "push", "selector": toolbarId};

                oj.OffcanvasUtils.close(drawer);
            };

            self.handleAction = function(which, action, event)
            {
                if (event != null)
                {
                    self.currentItem = $(event.target).closest(".item-marker");

                    // offcanvas won't be open for default action case
                    if (action != "default")
                        self.closeToolbar(which, self.currentItem);
                }

                if (self.currentItem != null)
                    self.action("Handle "+action+" action on: "+self.currentItem.prop("id"));
            };

            self.handleFollow = function(data, event)
            {
                // var id = data.id;
                self.handleAction("second", "follow", event);
                // stop clicking into details page
                event.stopPropagation()
            };

            self.handleDefaultAction = function(item)
            {
                self.currentItem = item;
                self.handleAction("second", "default");
                self.remove(item);
            };

            self.remove = function(item)
            {
                // unregister swipe to reveal for removed item
                var startOffcanvas = item.find(".oj-offcanvas-start").first();
                var endOffcanvas = item.find(".oj-offcanvas-end").first();

                oj.SwipeToRevealUtils.tearDownSwipeActions(startOffcanvas);
                oj.SwipeToRevealUtils.tearDownSwipeActions(endOffcanvas);

                self.allItems.remove(function(current)
                {
                    return (current.id == item.prop("id"));
                });
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
            self.handleBindingsApplied = function(info) {
                // Implement if needed
                session.showNavBar(true);
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function(info) {
                session.showNavBar(false);
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
