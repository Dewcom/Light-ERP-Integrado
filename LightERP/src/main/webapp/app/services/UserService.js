'use strict';

angular
    .module('app.services')
    .factory("userService", function ($http, $state) {

        var userService = {};

        userService.getAll = function () {

            var userList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/user/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return userList;
        };

        userService.get = function (userId) {

            var user = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/user/get?id=' + userId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return user;
        };

        userService.addUser = function (newUser) {
            var addUserResult = $http({
                method: 'POST',
                url: 'http://localhost:8080/api/user/create',
                data: {
                    user: newUser
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return addUserResult;
        };

        userService.updateUser = function (updatedUser) {
            var updateUserResult = $http({
                method: 'PUT',
                url: 'http://localhost:8080/api/user/update',
                data: updatedUser,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return updateUserResult;
        };

        userService.disableUser = function (userId) {

            var disableUserResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/user/delete',
                data: {
                    id: userId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return disableUserResult;
        };

        return userService;
    });