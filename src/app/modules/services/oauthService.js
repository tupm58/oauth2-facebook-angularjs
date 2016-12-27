(function () {
    'use strict';

    angular
        .module('services')
        .factory('oauthService', oauthService);

    function oauthService($rootScope, $http, $cookies, $q, $location, $state) {

        return {
            exchangeToken : exchangeToken
        };

        /////////////////

        function exchangeToken(opts, successCallback, failureCallback) {
            return $http({
                url: config.oauthServiceUrl + "/" + opts.provider + '/access-token/exchange',
                method: 'POST',
                data: opts.data
            }).then(function (data) {
                console.log(data.data.accessToken.token);
                $cookies.put('auth-token', data.accessToken.token);
                $cookies.put('display-name', data.accessToken.user.name);
                $cookies.put('avatar-url', data.accessToken.user.avatarUrl);
                $rootScope.authToken = data.accessToken.token;
                $rootScope.displayName = data.accessToken.user.name;
                $rootScope.avatarUrl = data.accessToken.user.avatarUrl;
                successCallback(data);
            }).catch(function (error) {
                console.log(error);
                failureCallback(error);
            });
        }
    }
})();