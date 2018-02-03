'use strict';

angular
    .module('app.services')
    .factory("storehouseService", function ($http, $state, APP_CONSTANTS) {

        var storehouseService = {};

        storehouseService.getAll = function () {

            var storehouseList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'storehouse/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return storehouseList;
        };

        storehouseService.get = function (storehouseId) {

            var storehouse = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'storehouse/get?id=' + storehouseId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return storehouse;
        };

        return storehouseService;
    });