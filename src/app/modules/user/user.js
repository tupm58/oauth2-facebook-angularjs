/**
 * Created by MinhTu on 12/22/2016.
 */
'use strict';

var user = angular.module('user', []);

user.config(['$stateProvider',  function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'src/app/modules/user/login.html',
            controller: 'loginCtrl'
        })
}]);