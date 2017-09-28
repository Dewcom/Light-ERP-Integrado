'use strict';

angular
    .module('app.services')
    .factory("billService", function ($http, $state, $resource, $filter, APP_CONSTANTS) {

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
                url: APP_CONSTANTS.appURL + 'bill/get',
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
                url: APP_CONSTANTS.appURL + 'bill/get?id=' + billId,
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
                url: APP_CONSTANTS.appURL + 'bill/create',
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
                url: APP_CONSTANTS.appURL + 'bill/' + updateBill.billId,
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
                url: APP_CONSTANTS.appURL + 'bill/delete',
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

        billService.voidBill = function (bill, billId) {


            var voidBillResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'bill/' + billId,
                data:bill,
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
                url: APP_CONSTANTS.appURL + 'billPaymentType',
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
                url: APP_CONSTANTS.appURL + 'currency',
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
                url: APP_CONSTANTS.appURL + 'creditCondition',
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
                url: APP_CONSTANTS.appURL + 'exchangeRate',
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

        billService.makePayment = function (newPayment) {

            var exchangeRateList = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'payment/create',
                data: {
                    payment: newPayment
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response);
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return exchangeRateList;
        };

        billService.deletePayment = function (paymentId) {

            var deletePaymentResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'payment/' + paymentId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return deletePaymentResult;
        };

        billService.updatePayment = function (updatedPayment) {
            var updatePaymentResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'payment/' + updatedPayment.id,
                data: {
                    payment: updatedPayment
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

            return updatePaymentResult;
        };

        billService.billCustomValidator = function (currentBill) {

            var msj = {
                "valid":true,
                "message": ""
            };

            if (currentBill.billDetails.length == 0){
                return msj = {
                    "valid":false,
                    "message": "La factura no posee productos"
                }
            }

            if (currentBill.address == null){
                return msj = {
                    "valid":false,
                    "message": "La factura no tiene dirección"
                }
            }

            if (currentBill.billPaymentType == null){
                return msj = {
                    "valid":false,
                    "message": "La factura no tiene tipo de pago"
                }
            }

            if (currentBill.creditCondition == null && currentBill.billPaymentType.code == APP_CONSTANTS.PAYMENT_TYPE_CREDIT_CODE ){
                return msj = {
                    "valid":false,
                    "message": "La factura no tiene de condición de crédito"
                }
            }

            return msj;
        };

        return billService;
    });
