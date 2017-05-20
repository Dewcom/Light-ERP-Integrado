'use strict';

angular
    .module('app.bill')
    .controller('BillDetailController', BillDetailController);

BillDetailController.$inject = ['$uibModal', '$http', '$state', '$stateParams', '$scope', 'billService', '$timeout', 'ngDialog', 'toaster',
    '$filter'];
function BillDetailController($uibModal, $http, $state, $stateParams, $scope, billService, $timeout, ngDialog, toaster, $filter) {
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
            "creditConditionId": billToClone.creditCondition.id != null ? billToClone.creditCondition.id : null,
            "currencyId": billToClone.currency.id,
            "registrationType": 0,
            "billDate": $filter('date')(new Date(), "dd-MM-yyyy"),
            "billDetails": formatBillDetails(billToClone.billDetails),
            "billAddress": billToClone.address.id
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

                $timeout(function () {
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

                $timeout(function () {
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
     * Make payment modal
     =========================================================*/

    vm.openPaymentModal = function (billObj) {

        var modalInstance = $uibModal.open({
            templateUrl: '/makePaymentModal.html',
            controller: MakePaymentModalInstanceCtrl,
            size: 'md',
            resolve: {
                billObj: function () {
                    return billObj;
                }
            },
            backdrop: 'static', // No cierra clickeando fuera
            keyboard: false // No cierra con escape
        });

        var state = $('#modal-state');
        modalInstance.result.then(function () {
            state.text('Modal dismissed with OK status');
        }, function () {
            state.text('Modal dismissed with Cancel status');
        });
    };


    MakePaymentModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'billObj'];
    function MakePaymentModalInstanceCtrl($scope, $uibModalInstance, billObj) {
        var vm = this;

        console.log(billObj);

        vm.currentBill = JSON.parse(JSON.stringify(billObj));

        $scope.close = function () {
            $uibModalInstance.close('closed');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }


    /**=========================================================
     * Validación de campos y patrones
     =========================================================*/
    vm.submitted = false;
    vm.validateInput = function (name, type) {
        var input = vm.paymentForm[name];
        return (input.$dirty || vm.submitted) && input.$error[type];
    }

    // Submit form
    vm.submitForm = function (action) {
        vm.submitted = true;

        if (vm.paymentForm.$valid) {
            makePayment();
        } else {
            console.log('Not valid!!');
            return false;
        }
    };

    /**=========================================================
     * Emitir pago
     =========================================================*/

    function makePayment() {

        var newPayment = {
            "billId": $scope.currentBill.id,
            "amount": $scope.makePaymentForm.amount,
            "bank": $scope.makePaymentForm.bank,
            "bankReceipt": $scope.makePaymentForm.bankReceipt,
            "observation": $scope.makePaymentForm.observation
        };
        console.log(newPayment);

        billService.makePayment(newPayment).then(function (response) {
            console.log(response);
            var toasterdata;

            if (response.code == "0") {
                toasterdata = {
                    type: 'success',
                    title: 'Pago exitoso',
                    text: response.message
                };
            } else {
                toasterdata = {
                    type: 'warning',
                    title: 'Pago',
                    text: response.message
                };

            }
            pop(toasterdata);
        }, function (error) {
            console.log(error);
        });

        $scope.cancel();
    }


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