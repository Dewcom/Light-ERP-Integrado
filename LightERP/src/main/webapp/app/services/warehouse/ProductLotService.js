'use strict';

angular
    .module('app.services')
    .factory("productLotService", function ($http, $state, APP_CONSTANTS) {

        var productLotService = {};

        productLotService.updateProductLot = function (updatedProductLot) {
            var updateProductLotResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'productLot/update',
                data: updatedProductLot,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return updateProductLotResult;
        };

        productLotService.addProductLot = function (newProductLot) {
            var addProductLotResult = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'productLot/create',
                data: {
                    productLot: newProductLot
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

            return addProductLotResult;
        };

        productLotService.disableProductLot = function (productLotId, username, reason) {

            var disableProductLotResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'productLot/delete',
                data: {
                    id: productLotId,
                    username: username,
                    deleteReason: reason
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

            return disableProductLotResult;
        };

        return productLotService;
    });