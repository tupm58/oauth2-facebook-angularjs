/**
 * Created by MinhTu on 12/22/2016.
 */
angular.module('user')
    .controller('loginCtrl',
        function ($scope, $rootScope, $location, $window, $cookies, userService, oauthService, $auth) {

            $scope.initData = initData;
            $scope.authenticate = authenticate;
            $scope.loginFB = loginFB;
            $scope.exchangeToken = exchangeToken;

            function initData() {
                console.log("Login Controller...");
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));

                window.fbAsyncInit = function () {
                    FB.init({
                        appId : OAuthConfig.facebook.appId,
                        cookie : false,
                        xfbml : true,
                        version : OAuthConfig.facebook.graphAPIVersion
                    });
                };
            }
            function loginFB() {
                FB.login(function (response) {
                    $scope.exchangeToken(
                        OAuthProvider.FACEBOOK,
                        response.authResponse.accessToken
                    );
                }, function (error) {
                    console.log(error);
                });
            }

            function authenticate(provider) {
                $auth
                    .authenticate(provider)
                    .then(function () {
                        console.log($auth.getToken());
                        exchangeToken(provider, $auth.getToken());
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
            
            function exchangeToken(provider, accessToken) {
                var opts = {
                    provider: provider,
                    data: {
                        token: accessToken
                    }
                };
                oauthService.exchangeToken(opts, function (response) {
                    console.log(response);
                   
                }, function (error) {
                    console.log(error);
                });
            }

            $scope.initData();

        });