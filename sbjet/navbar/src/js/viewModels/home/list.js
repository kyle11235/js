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

            // 1. init UI variables here
            // 2. init session variables in session
            // 3. update variables in click/attach/detach functions

            // Router setup
            self.router = oj.Router.rootInstance;

            // fake data
            self.data = JSON.parse(data);

            // filters
            self.selectedFilter = ko.observable("");

            // industry
            self.selectedIndustries = session.selectedIndustries;
            self.markIndustry = function (data, event) {
                console.log("markIndustry:" + JSON.stringify(this));
                $(event.target).toggleClass('myOption-on');
                if(this.id !== 1){
                    $('#industry1').removeClass('myOption-on');
                }else{
                    self.clearIndustries();
                }
            };

            self.clearIndustries = function () {
                $('#Industry-tab-panel div').removeClass('myOption-on');
                $('#industry1').addClass('myOption-on');
            };
            self.markIndustries = function(){
                $.each(self.selectedIndustries(), function( index, industry ) {
                    $('#industry' + industry.id).toggleClass('myOption-on');
                });
            }

            self.confirmIndustries = function () {
                self.selectedIndustries.removeAll();
                $.each(self.data.industries, function( index, industry ) {
                    if($('#industry' + industry.id).hasClass('myOption-on')){
                        self.selectedIndustries().push(industry);
                    }
                });
                self.selectedFilter('');
                if(self.selectedIndustries().length === 0){
                    $('#industry1').addClass('myOption-on');
                }
                // apply filter
                self.search();
            };

            // tags
            self.selectedTags = session.selectedTags;
            self.markTag = function (data, event) {
                console.log("markTag:" + JSON.stringify(this));
                $(event.target).toggleClass('myOption-on');
                if(this.id !== 1){
                    $('#tag1').removeClass('myOption-on');
                }else{
                    self.clearTags();
                }
            };

            self.clearTags = function () {
                $('#Tag-tab-panel div').removeClass('myOption-on');
                $('#tag1').addClass('myOption-on');
            };
            self.markTags = function(){
                $.each(self.selectedTags(), function( index, tag) {
                    $('#tag' + tag.id).toggleClass('myOption-on');
                });
            }

            self.confirmTags = function () {
                self.selectedTags.removeAll();
                $.each(self.data.tags, function( index, tag ) {
                    if($('#tag' + tag.id).hasClass('myOption-on')){
                        self.selectedTags().push(tag);
                    }
                });
                self.selectedFilter('');
                if(self.selectedTags().length === 0){
                    $('#tag1').addClass('myOption-on');
                }
                // apply filter
                self.search();
            };

            // products
            self.selectedProducts = session.selectedProducts;
            self.markProduct = function (data, event) {
                console.log("markProduct:" + JSON.stringify(this));
                $(event.target).toggleClass('myOption-on');
                if(this.id !== 1){
                    $('#product1').removeClass('myOption-on');
                }else{
                    self.clearProducts();
                }
            };

            self.clearProducts = function () {
                $('#Product-tab-panel div').removeClass('myOption-on');
                $('#product1').addClass('myOption-on');
            };
            self.markProducts = function(){
                $.each(self.selectedProducts(), function( index, product) {
                    $('#product' + product.id).toggleClass('myOption-on');
                });
            }

            self.confirmProducts = function () {
                self.selectedProducts.removeAll();
                $.each(self.data.products, function( index, product ) {
                    if($('#product' + product.id).hasClass('myOption-on')){
                        self.selectedProducts().push(product);
                    }
                });
                self.selectedFilter('');
                if(self.selectedProducts().length === 0){
                    $('#product1').addClass('myOption-on');
                }
                // apply filter
                self.search();
            };

            // more filters
            self.selectedTypes = session.selectedTypes;
            self.markType = function (data, event) {
                console.log("markType:" + JSON.stringify(this));
                $(event.target).toggleClass('myOption-on');
                if(this.id !== 1){
                    $('#type1').removeClass('myOption-on');
                }else{
                    self.clearTypes();
                }
            };

            self.clearTypes = function () {
                $('#Type-panel div').removeClass('myOption-on');
                $('#type1').addClass('myOption-on');
            };

            self.clearMore = function () {
                self.clearTypes();
                self.isLive(false);
                self.includeRetired(false);
            };
            self.markTypes = function(){
                $.each(self.selectedTypes(), function( index, type) {
                    $('#type' + type.id).toggleClass('myOption-on');
                });
            }

            self.confirmMore = function () {
                self.selectedTypes.removeAll();
                $.each(self.data.types, function( index, type ) {
                    if($('#type' + type.id).hasClass('myOption-on')){
                        self.selectedTypes().push(type);
                    }
                });
                self.selectedFilter('');
                if(self.selectedTypes().length === 0){
                    $('#type1').addClass('myOption-on');
                }
                // apply filter
                self.search();
            };

            // below are not implemented yet
            self.isLive = ko.observable();
            self.includeRetired = ko.observable();


            // observableArray and datasource
            self.allItems = ko.observableArray();
            self.dataSource = new oj.ArrayTableDataSource(self.allItems, {
                idAttribute : "id"
            });


            // search related functions
            self.search = function(){
                // industry
                console.log('apply industries:' + JSON.stringify(self.selectedIndustries()));
                self.industryResult = [];
                $.each(self.data.assets, function( index, asset) {
                    let ok = true;
                    // user has not checked 'All'
                    if(self.selectedIndustries()[0].id !== 1){
                        $.each(self.selectedIndustries(), function( index, industry ) {
                            if($.inArray(industry.id, asset.industries) === -1){
                                ok = false;
                                return;
                            }
                        });
                    }
                    if(ok){
                        self.industryResult.push(asset);
                    }
                });

                // tag
                console.log('apply tags:' + JSON.stringify(self.selectedTags()));
                self.tagResult = [];
                $.each(self.industryResult, function( index, asset) {
                    let ok = true;
                    if(self.selectedTags()[0].id !== 1){
                        $.each(self.selectedTags(), function( index, tag ) {
                            if($.inArray(tag.id, asset.tags) === -1){
                                ok = false;
                                return;
                            }
                        });
                    }
                    if(ok){
                        self.tagResult.push(asset);
                    }
                });

                // product
                console.log('apply products:' + JSON.stringify(self.selectedProducts()));
                self.productResult = [];
                $.each(self.tagResult, function( index, asset) {
                    let ok = true;
                    if(self.selectedProducts()[0].id !== 1){
                        $.each(self.selectedProducts(), function( index, product ) {
                            if($.inArray(product.id, asset.products) === -1){
                                ok = false;
                                return;
                            }
                        });
                    }
                    if(ok){
                        self.productResult.push(asset);
                    }
                });

                // more
                console.log('apply more:' + JSON.stringify(self.selectedTypes()));
                self.typeResult = [];
                $.each(self.productResult, function( index, asset) {
                    if(self.selectedTypes()[0].id === 1){
                        self.typeResult.push(asset);
                    }else{
                        $.each(self.selectedTypes(), function( index, type ) {
                            if(type.name === asset.type){
                                self.typeResult.push(asset);
                                return;
                            }
                        });
                    }
                });

                // modify before rendering
                self.beautify(self.typeResult);
                

                // refresh data
                self.allItems(self.typeResult);
                self.dataSource = new oj.ArrayTableDataSource(self.allItems, {
                    idAttribute : "id"
                });


                // required by swipe gesture list, call this manually to make it work after remove/add to array
                self.handleTransitionCompleted();
            }

            self.beautify = function(assetList){
                $.each(assetList, function( index, asset ) {
                    // checked or not
                    if($.inArray(asset.id, session.checkedAssetIds()) !== -1){
                        asset.isChecked = true;
                    }else{
                        asset.isChecked = false;
                    }
                });
            }


            // go to details page
            self.currentItemId = ko.observable();
            self.handleCurrentItemChanged = function(event){
                var item = event.detail.value;
                // Access current item via ui.item
                self.currentItemId(item);
                // launch popup to show current item element's id when current item changes
                console.log('currentAssetId:' +  self.currentItemId());
                session.currentAssetId = self.currentItemId;
                session.checkedAssetIds.push(self.currentItemId());
                self.router.go('home_details');
            }


            // below are required by swipe gesture list
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
                self.search();
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
                self.selectedFilter('');
                self.markIndustries();
                self.markTags();
                self.markProducts();
                self.markTypes();
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
