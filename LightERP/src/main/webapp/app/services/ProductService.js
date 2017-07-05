'use strict';

angular
    .module('app.services')
    .factory("productService", function ($http, $state, APP_CONSTANTS) {

        var productService = {};

        productService.getAll = function () {

            var productList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'product/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return productList;
        };

        productService.get = function (productId) {

            var product = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'product/get?id=' + productId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return product;
        };

        productService.addProduct = function (newProduct) {
            var addProductResult = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'product/create',
                data: {
                    product: newProduct
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

            return addProductResult;
        };

        productService.updateProduct = function (updatedProduct) {
            var updateProductResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'product/update',
                data: updatedProduct,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return updateProductResult;
        };

        productService.disableProduct = function (productId) {

            var disableProductResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'product/delete',
                data: {
                    id: productId
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

            return disableProductResult;
        };

        productService.getAllMeasureUnits = function () {

            var measureTypes = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'product/getMeasureUnits',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return measureTypes;
        };

        return productService;
    });