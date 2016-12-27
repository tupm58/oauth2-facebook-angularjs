/**
 * Created by MinhTu on 12/22/2016.
 */
var app = angular.module('app')
    .config(
        ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

                // lazy controller, directive and service
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;
            }
        ])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $urlRouterProvider.when('', '/app/login');

            $httpProvider.defaults.headers.get = {'Content-Type': 'application/json'};
            $httpProvider.defaults.headers.common = {'Content-Type': 'application/json'};
            $httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};
            $httpProvider.defaults.headers.put = {'Content-Type': 'application/json'};
            $httpProvider.defaults.headers.patch = {'Content-Type': 'application/json'};

            $httpProvider.interceptors.push('httpRequestInterceptor');
            
        }
    ])
    .config(['$authProvider',
        function ($authProvider) {
            $authProvider.facebook({
                clientId: '1113089908714345',
                responseType: 'token'
            });

            $authProvider.google({
                clientId: '988472407535-5h3tjhtk1a8l3qpu7aics6qjfdsaqdb3.apps.googleusercontent.com',
                responseType: 'token'
            });
        }
    ]);