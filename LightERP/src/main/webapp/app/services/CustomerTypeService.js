'use strict';

angular
    .module('app.services')
    .factory("customerTypeService", function ($http, $state, APP_CONSTANTS) {

        var customerTypeService = {};

        customerTypeService.getAll = function () {

            var customerTypeList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customerType/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return customerTypeList;
        }

        customerTypeService.disableCustomerType = function (customerTypeId) {

            var disableCustomerTypeResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'customerType/delete',
                data: {
                    id: customerTypeId
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

            return disableCustomerTypeResult;
        }

        return customerTypeService;
    });





