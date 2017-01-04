'use strict';

angular
    .module('app.services')
    .factory("productService", function ($http, $state) {

        var productService = {};

        productService.getAll = function() {

            var productList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/product/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response);
                return response.data.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return productList;
        };

        productService.get = function(productId) {

            var product = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/product/get?id=' + productId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response);
                return response.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return product;
        };

        productService.addProduct = function(newProduct) {
            console.log(newProduct);
            var addProductResult = $http({
                method: 'POST',
                url: 'http://localhost:8080/api/product/create',
                data: {
                    product: newProduct
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response.data.message);
                return response.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return addProductResult;
        };

        productService.updateProduct= function(updatedProduct) {
            console.log(updatedProduct);
            var updateProductResult = $http({
                method: 'PUT',
                url: 'http://localhost:8080/api/product/update',
                data: updatedProduct,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response.data.message);
                return response.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return updateProductResult;
        };

        productService.disableProduct= function(productId) {

            var disableProductResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/product/delete',
                data: {
                    id: productId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response);
                return response.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return disableProductResult;
        };

        return productService;
    });