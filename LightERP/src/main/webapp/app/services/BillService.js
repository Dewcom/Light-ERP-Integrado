'use strict';

angular
    .module('app.services')
    .factory("billService", function ($http, $state, $resource, $filter) {

        var billService = {};
        var addedProductList = [];
        var updateBillProductList = [];

        billService.getAddedProductList = function () {
            return addedProductList;
        };

        billService.resetAddedProductList = function () {
            addedProductList = [];
        };

        billService.removeProduct = function (index) {
            addedProductList.splice(index, 1);
        };


        /**=========================================================
         * Para ser usado a la hora de editar una factura
         =========================================================*/

        billService.getUpdateBillProductList = function () {
            return updateBillProductList;
        };

        billService.setUpdateBillProductList = function (list) {
            updateBillProductList = list;
        };

        billService.resetUpdateBillProductList = function () {
            updateBillProductList = [];
        };

        billService.removeProductUpdateBill = function (index) {
            updateBillProductList.splice(index, 1);
        };

        /**=========================================================
         *
         =========================================================*/

        billService.getAddressInfo = function (address, callback) {
            console.log(address);

            var tmpIdAddress = address.id;
            var tmpAddress = address.address;
            var tmpIdDistrict = parseInt(address.idDistrict);
            var tmpDistrict = null;
            var tmpProvince = null;
            var tmpCanton = null;

            $resource('server/location/distritos.json').query().$promise.then(function (data) {
                var districtObjList = $filter('filter')(data, {idDistrict: tmpIdDistrict});

                var districtNotFound = true;
                do {
                    angular.forEach(districtObjList, function (value) {
                        if (parseInt(value.idDistrict) === tmpIdDistrict) {
                            tmpDistrict = value;
                            districtNotFound = false;
                        }
                    });

                } while (districtNotFound);

                var tmpIdProvince = parseInt(tmpDistrict.idProvince);

                var tmpIdCanton = parseInt(tmpDistrict.idCanton);

                $resource('server/location/provincias.json').query().$promise.then(function (data) {
                    var provinceObjList = $filter('filter')(data, {idProvince: tmpIdProvince});

                    var provinceNotFound = true;
                    do {
                        angular.forEach(provinceObjList, function (value) {
                            if (parseInt(value.idProvince) === tmpIdProvince) {
                                tmpProvince = value;
                                provinceNotFound = false;
                            }
                        });

                    } while (provinceNotFound);

                }).catch(function (e) {
                    console.log(e);
                });


                $resource('server/location/cantones.json').query().$promise.then(function (data) {
                    var cantonObjList = $filter('filter')(data, {idCanton: tmpIdCanton});

                    var cantonNotFound = true;
                    do {
                        angular.forEach(cantonObjList, function (value) {
                            if (parseInt(value.idCanton) === tmpIdCanton) {

                                tmpCanton = value;

                                cantonNotFound = false;
                            }
                        });

                    } while (cantonNotFound);

                    callback({
                        id: tmpIdAddress,
                        province: tmpProvince,
                        canton: tmpCanton,
                        district: tmpDistrict,
                        address: tmpAddress
                    });

                }).catch(function (e) {
                    console.log(e);
                });

            }).catch(function (e) {
                console.log(e);
            });
        };

        billService.getAll = function () {

            var billList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/bill/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return billList;
        };

        billService.get = function (billId) {

            var bill = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/bill/get?id=' + billId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return bill;
        };

        billService.addBill = function (newBill) {
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
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return addBillResult;
        };

        billService.updateBill = function (updateBill) {
            var updateBillResult = $http({
                method: 'PUT',
                url: 'http://localhost:8080/api/bill/' + updateBill.billId,
                data: updateBill,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return updateBillResult;
        };

        billService.disableBill = function (billId) {


            var disableBillResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/bill/delete',
                data: {
                    id: billId
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

            return disableBillResult;
        };

        billService.voidBill = function (billId) {


            var voidBillResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/bill/delete',
                data: {
                    id: billId
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

            return voidBillResult;
        };

        billService.getAllPaymentTypes = function () {

            var paymentTypeList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/billPaymentType/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return paymentTypeList;
        };

        billService.getAllCurrency = function () {

            var currencyList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/currency/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return currencyList;
        };

        billService.getAllCreditCondition = function () {

            var creditConditionList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/creditCondition/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return creditConditionList;
        };

        billService.getAllExchangeRates = function () {

            var exchangeRateList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/exchangeRate/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return exchangeRateList;
        };

        return billService;
    });