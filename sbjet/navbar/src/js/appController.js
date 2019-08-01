/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'my/session', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource', 'ojs/ojmodule'],
    function (oj, ko, session) {
        function ViewModel() {
            var self = this;

            // Media queries for repsonsive layouts
            var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

            // why use currentState/currentValue but stateId to represent current values, stupid naming
            // child router doesn't automatically help organize modules in folder structure, so set path in value field and use myModulePath

            // Router setup
            oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
            self.router = oj.Router.rootInstance;
            self.router.configure({
                'home': {value: 'home', label: 'Home', isDefault: true},
                'home_list': {value: 'home/list', label: 'List'},
                'home_details': {value: 'home/details', label: 'Details'},

                'follow': {value: 'follow', label: 'Follow'},

                'tools': {value: 'tools', label: 'Tools'},
                'tools_docker': {value: 'tools/docker', label: 'Docker'},
                'tools_git': {value: 'tools/git', label: 'Git'},
                'tools_mail': {value: 'tools/mail', label: 'Mail List'},
                'tools_buddy': {value: 'tools/buddy', label: 'Buddy'},

                'me': {value: 'me', label: 'Me'},
                'me_setting': {value: 'me/setting', label: 'Setting'}
            });
            self.router.myModulePath = function () {
                console.log('myModulePath:' + self.router.currentValue());
                return self.router.currentValue() ? self.router.currentValue() : 'home';
            };
            self.showNavBar = session.showNavBar;

            // Navigation setup
            var navData = [
                {
                    name: 'Home', id: 'home',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa fa-home fa-lg'
                },
                {
                    name: 'Follow', id: 'follow',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa fa-heart-o fa-lg'
                },
                {
                    name: 'Tools', id: 'tools',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa fa-dropbox fa-lg'
                },
                {
                    name: 'Me', id: 'me',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 fa fa-user-circle fa-lg'
                }
            ];
            self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

        }

        return new ViewModel();
    }
);
