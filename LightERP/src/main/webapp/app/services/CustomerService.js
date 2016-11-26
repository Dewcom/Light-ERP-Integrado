'use strict';

angular
    .module('app.services')
    .factory("customerService", function ($http, $state) {

        var customerService = {};

        customerService.getAll = function() {

            var customerList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/customer/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return customerList;
        }

        customerService.get = function(customerId) {

            var customer = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/customer/get?id=' + customerId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return customer;
        }

        customerService.addCustomer = function(newCustomer) {
            console.log(newCustomer);
            var addCustomerResult = $http({
                method: 'POST',
                url: 'http://localhost:8080/api/customer/create',
                data: {
                    customer: newCustomer
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

            return addCustomerResult;
        }

        customerService.updateCustomer = function(updatedCustomer) {
            console.log(updatedCustomer);
            var updateCustomerResult = $http({
                method: 'PUT',
                url: 'http://localhost:8080/api/customer/update',
                data: updatedCustomer,
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

            return updateCustomerResult;
        }

        customerService.disableCustomer = function(customerId) {

            var disableCustomerResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/customer/delete',
                data: {
                    id: customerId
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

            return disableCustomerResult;
        }

        return customerService;
    });





