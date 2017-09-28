'use strict';

angular
    .module('app.services')
    .factory("presentationTypeService", function ($http, $state, APP_CONSTANTS) {

        var presentationTypeService = {};

        presentationTypeService.getAll = function () {

            var presentationTypeList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'presentationType/get',
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
                url: APP_CONSTANTS.appURL + 'presentationType/delete',
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