'use strict';

angular
    .module('app.services')
    .factory("billService", function ($http, $state) {

        var billService = {};
        var addedProductList = [];
        // var totalTax = 0;

        billService.getAddedProductList = function () {
            return addedProductList;
        };

        billService.resetAddedProductList = function () {
            addedProductList = [];
        };

        billService.removeProduct = function (index) {

            console.log(index);
            addedProductList.splice(index, 1);
        };

        billService.getAll = function() {

            var billList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/bill/get',
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

            return billList;
        };

        billService.get = function(billId) {

            var bill = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/bill/get?id=' + billId,
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

            return bill;
        };

        billService.addBill = function(newBill) {
            console.log(newBill);
            var addBillResult = $http({
                method: 'POST',
                url: 'http://localhost:8080/api/bill/create',
                data: {
                    bill: newBill
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

            return addBillResult;
        };

        billService.updateBill = function(updateBill) {
            console.log(updateBill);
            var updateBillResult = $http({
                method: 'PUT',
                url: 'http://localhost:8080/api/bill/update',
                data: updatedBill,
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

            return updateBillResult;
        };

        billService.disableBill= function(billId) {

            var disablebillResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/bill/delete',
                data: {
                    id: billId
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

            return disablebillResult;
        };

        billService.getAllPaymentTypes = function() {

            var paymentTypeList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/billPaymentType/get',
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

            return paymentTypeList;
        };

        billService.getAllCurrency = function() {

            var currencyList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/currency/get',
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

            return currencyList;
        };

        billService.getAllCreditCondition = function() {

            var creditConditionList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/creditCondition/get',
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

            return creditConditionList;
        };

        billService.getAllExchangeRates = function() {

            var exchangeRateList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/exchangeRate/get',
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

            return exchangeRateList;
        };

        return billService;
    });