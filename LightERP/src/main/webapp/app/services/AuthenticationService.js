'use strict';

angular
    .module('app.services')
    .factory("authenticationService", function ($http, $state, $q, $window) {


        function login(userName, password) {
            var userInfo;
            debugger;
            $http.post("http://localhost:8080/api/login", {
                username: "admin",
                password: "admin"
            }).then(function (result) {
                userInfo = {
                    accessToken: result.data.access_token,
                    userName: result.data.username
                };
                console.log(userInfo);
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            }, function (error) {
                console.log(error);
            });

        }

        return {
            login: login
        };
    });






