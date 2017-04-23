'use strict';

angular
    .module('app.services')
    .factory("presentationTypeService", function ($http, $state) {

        var presentationTypeService = {};

        presentationTypeService.getAll = function () {

            var presentationTypeList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/presentationType/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return presentationTypeList;
        };

        presentationTypeService.disablePresentationType = function (presentationTypeId) {

            var disablePresentationTypeResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/presentationType/delete',
                data: {
                    id: presentationTypeId
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

            return disablePresentationTypeResult;
        };

        return presentationTypeService;
    });