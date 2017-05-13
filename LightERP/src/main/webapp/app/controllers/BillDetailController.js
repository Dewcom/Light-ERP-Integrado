'use strict';

angular
    .module('app.bill')
    .controller('BillDetailController', BillDetailController);

BillDetailController.$inject = ['$http', '$state', '$stateParams', '$scope', 'billService', '$timeout', 'ngDialog', 'toaster', '$filter'];
function BillDetailController($http, $state, $stateParams, $scope, billService, $timeout, ngDialog, toaster, $filter) {
    var vm = this;


    ////////////////
    init();

    function init() {
        console.log($stateParams);
        var bill;
        billService.get($stateParams.billId).then(function (response) {
            console.log(response.data);

            if (response.code == '0') {

                bill = response.data;

                $scope.currentBill = bill;

                billService.getAddressInfo(bill.address, function (addressInfo) {
                    $scope.currentBill.address = addressInfo;
                });
            }
        });

    }

    //REGRESA A LA PANTALLA DE LISTA DE FACTURAS
    vm.goBack = function () {
        $state.go('app.billingMain');
    };

    //CANCELA LOS CAMBIOS EN PANTALLA
    vm.cancel = function () {
        var toasterdata;

        toasterdata = {
            type: 'info',
            title: 'Factura',
            text: "Cambios cancelados"
        };

        $scope.pop(toasterdata);
        $timeout(function () {
            $scope.callAtTimeout();
        }, 3000);
    };

    /**=========================================================
     * Eliminar facturas
     =========================================================*/

    vm.cloneBill = function (billToClone) {

        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        var newBill = {
            "userName": userInfo.userName,
            "customerId": billToClone.customer.id,
            "exchangeRate": billToClone.exchangeRate,
            "billPaymentTypeId": billToClone.billPaymentType.id,
            "creditConditionId": billToClone.creditCondition.id != null ? billToClone.creditCondition.id :null,
            "currencyId": billToClone.currency.id,
            "registrationType": 0,
            "billDate": $filter('date')(new Date(), "dd-MM-yyyy"),
            "billDetails": formatBillDetails(billToClone.billDetails),
            "billAddress" : billToClone.address.id
        };

        billService.addBill(newBill).then(function (response) {

            var toasterdata;

            if (response.code == "0") {
                toasterdata = {
                    type: 'success',
                    title: 'Factura creada',
                    text: response.message
                };
            } else {
                toasterdata = {
                    type: 'warning',
                    title: 'Factura',
                    text: response.message
                };
            }

            pop(toasterdata);
            $timeout(function () {
                var params = {billId: response.data.id};
                $state.go('app.updateBill', params);
            }, 3000);
        }, function (error) {
            console.log(error);
        });
    };

    /**=========================================================
     * Eliminar facturas
     =========================================================*/

    vm.disableBill = function (billId) {
        console.log(billId);
        ngDialog.openConfirm({
            template: 'disableBillModal',
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false
        }).then(function (value) {
            billService.disableBill(billId).then(function (response) {
                var toasterdata;
                console.log(response);

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Eliminar factura',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Factura',
                        text: response.message
                    };

                }

                pop(toasterdata);

                $timeout(function() {
                    $state.go('app.billingMain');
                }, 3000);

            }, function (error) {
                console.log(error);
            });
        }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });
    };

    /**=========================================================
     * Anular facturas
     =========================================================*/

    vm.voidBill = function (bill) {

        bill.billState = 3;

        console.log(bill);

        ngDialog.openConfirm({
            template: 'voidBillModal',
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false
        }).then(function (value) {
            billService.voidBill(bill).then(function (response) {
                var toasterdata;
                console.log(response);

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Anular factura',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Factura',
                        text: response.message
                    };

                }

                pop(toasterdata);

                $timeout(function() {
                    $state.go('app.billingMain');
                }, 3000);

            }, function (error) {
                console.log(error);
            });
        }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });
    };



    /**=========================================================
     * Formateo de informacion de facturas
     =========================================================*/

    function formatBillDetails(list) {
        console.log(list);
        var formattedList = [];

        angular.forEach(list, function (value, key) {

            var item = {
                'productId': value.product.id,
                'quantity': value.quantity,
                'linePrice': value.linePrice,
                'discountPercentage': value.discountPercentage,
                'taxPercentage': value.taxPercentage
            };
            formattedList.push(item);
        });

        return formattedList;

    }


    function pop(toasterdata) {
        console.log(toasterdata);
        toaster.pop({
            type: toasterdata.type,
            title: toasterdata.title,
            body: toasterdata.text
        });
    }
}