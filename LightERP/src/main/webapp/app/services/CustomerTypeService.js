'use strict';

angular
    .module('app.services')
    .factory("customerTypeService", function ($http, $state) {

        var customerTypeService = {};

        customerTypeService.getAll = function() {

            var customerTypeList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/customerType/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return customerTypeList;
        }

        customerTypeService.disableCustomerType = function(customerTypeId) {

            var disableCustomerTypeResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/customerType/delete',
                data: {
                    id: customerTypeId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response.data.message);
                return response.data.message;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return disableCustomerTypeResult;
        }

        return customerTypeService;
    });





