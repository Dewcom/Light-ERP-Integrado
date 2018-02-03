'use strict';

angular
    .module('app.services')
    .factory("warehouseReportService", function ($http, $state, APP_CONSTANTS) {

        var warehouseReportService = {};

        warehouseReportService.getProductLotHistory = function (startDate, endDate, lotNumber) {

            var reportResults = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'warehouseReport/getProductLotHistory?startDate='+startDate+'&endDate='+endDate+'&lotNumber='+lotNumber,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return null
            });

            return reportResults;
        };

        return warehouseReportService;
    });





