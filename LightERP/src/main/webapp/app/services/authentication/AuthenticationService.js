'use strict';

angular
    .module('app.services')
    .factory("authenticationService", function ($http, $state, $q, $window, APP_CONSTANTS) {


        function login(userName, password) {

            var userInfo;
            var promise = $http.post(APP_CONSTANTS.appURL + 'login', {
                username: userName,
                password: password
            }).then(function (response) {
                userInfo = {
                    accessToken: response.data.access_token,
                    userName: response.data.username,
                    role: response.data.roles[0]
                };
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                return response
            });
            return promise;
        }

        function logout() {
            $window.sessionStorage.removeItem('userInfo');
        }

        return {
            login: login,
            logout: logout
        };
    });







