'use strict';

angular
    .module('app.services')
    .factory("storehouseService", function ($http, $state, APP_CONSTANTS) {

        var productService = {};

        productService.getAll = function () {

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

        return productService;

    });