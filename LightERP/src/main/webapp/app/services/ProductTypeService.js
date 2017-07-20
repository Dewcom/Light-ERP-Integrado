'use strict';

angular
    .module('app.services')
    .factory("productTypeService", function ($http, $state, APP_CONSTANTS) {

        var productTypeService = {};

        productTypeService.getAll = function () {

            var productTypeList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'productType/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return productTypeList;
        };

        productTypeService.disableProductType = function (productTypeId) {

            var disableProductTypeResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'productType/delete',
                data: {
                    id: productTypeId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.message;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return disableProductTypeResult;
        };

        return productTypeService;
    });