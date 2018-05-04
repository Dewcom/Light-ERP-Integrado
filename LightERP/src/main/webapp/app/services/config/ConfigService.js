'use strict';

angular
    .module('app.services')
    .factory("configService", function ($http, $state, APP_CONSTANTS) {

        var configService = {};

        configService.getExchangeRateByCode = function (code) {

            var exchangeRate = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'exchangeRate/'+code,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return exchangeRate;
        }

        configService.updateExchangeRateByCode = function (code, exchangeRate) {

            var updateExchangeRateResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'exchangeRate/'+code,
                data: {
                    exchangeRate: exchangeRate
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

            return updateExchangeRateResult;
        }

        return configService;
    });





