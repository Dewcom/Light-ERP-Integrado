'use strict';

angular
    .module('app.services')
    .factory("customerReportService", function ($http, $state, APP_CONSTANTS) {

        var customerReportService = {};

        customerReportService.getPurchasesReport = function (customerId, productCode, startDate, endDate) {

            var reportResults = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customer/purchaseReport?startDate='+startDate+'&endDate='+endDate+'&customerIdentification='+customerId+'&productCode='+productCode,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return null
            });

            return reportResults;
        };

        customerReportService.getBillsReport = function (customerId, isPendingPaymentReport, startDate, endDate) {

            var reportResults = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customer/billingReport?startDate='+startDate+'&endDate='+endDate+'&customerIdentification='+customerId+'&isPaymentPendingReport='+isPendingPaymentReport,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return null
            });

            return reportResults;
        };

        return customerReportService;
    });





