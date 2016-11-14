'use strict';

angular
    .module('app.services')
    .factory("identificationTypeService", function ($http, $state) {

        var identificationTypeService = {};

        identificationTypeService.getAll = function() {

            var identificationTypeList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/identificationType/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return identificationTypeList;
        }

        identificationTypeService.disableIdentificationType = function(identificationTypeId) {

            var disableIdentificationTypeResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/identificationType/delete',
                data: {
                    id: identificationTypeId
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

            return disableIdentificationTypeResult;
        }

        return identificationTypeService;
    });




