'use strict';

angular
    .module('app.bill')
    .controller('UpdateBillController', UpdateBillController);

UpdateBillController.$inject = ['$http', '$state', '$stateParams', '$scope', 'billService', '$timeout', 'ngDialog', 'toaster'];
function UpdateBillController($http, $state, $stateParams, $scope, billService, $timeout, ngDialog, toaster) {
    var vm = this;

    init();

    activate();

    ////////////////

    function activate() {
        vm.today = function () {
            vm.dt = new Date();
        };
        vm.today();

        vm.clear = function () {
            vm.dt = null;
        };

        // Disable weekend selection
        vm.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        vm.toggleMin = function () {
            vm.minDate = vm.minDate ? null : new Date();
        };
        vm.toggleMin();

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.initDate = new Date('2019-10-20');
        vm.format = 'dd-MM-yyyy'
    }

    function init() {
        console.log($stateParams.billId);
        var bill;
        billService.get($stateParams.billId).then(function (response) {
            console.log(response.data);

            if (response.code == '0') {

                bill = response.data;

                $scope.currentBill = bill;

                console.log(bill);
                $scope.billDate = bill.billDate;
                $scope.totalTaxAmount = bill.totalTaxAmount;
                $scope.totalDiscount = bill.totalDiscount;
                $scope.totalAmount = bill.totalAmount;
            }
        });

    }

    //REGRESA A LA PANTALLA DE DETALLE DE FACTURAS
    vm.goBack = function () {
        console.log($scope.currentBill.id);
        var params = {billId : $scope.currentBill.id}
        $state.go('app.billDetail', params);
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
     * Modificar clientes
     =========================================================*/
    /*
     vm.updateCustomer = function () {
     var updatedCustomer = {
     "id": $scope.currentCustomer.id,
     "name": $scope.currentCustomer.name,
     "firstLastName": $scope.currentCustomer.firstLastName,
     "secondLastName": $scope.currentCustomer.secondLastName,
     "identification": $scope.currentCustomer.identification,
     "addresses": formatAddreses(),
     "phoneNumber1": $scope.currentCustomer.phoneNumber1,
     "phoneNumber2": $scope.currentCustomer.phoneNumber2,
     "mobile": $scope.currentCustomer.mobile,
     "website": $scope.currentCustomer.website,
     "email": $scope.currentCustomer.email,
     "discountPercentage": $scope.currentCustomer.discountPercentage,
     "creditLimit": $scope.currentCustomer.creditLimit,
     "identificationType": $scope.currentCustomer.selectedIdentificationType,
     "customerType": $scope.currentCustomer.selectedCustomerType
     };
     console.log(updatedCustomer);
     customerService.updateCustomer(updatedCustomer).then(function (response) {
     var toasterdata;

     if (response.code == "0") {
     toasterdata = {
     type: 'success',
     title: 'Cliente',
     text: response.message
     };
     } else {
     toasterdata = {
     type: 'warning',
     title: 'Cliente',
     text: response.message
     };
     }
     $scope.pop(toasterdata);
     }, function (error) {
     console.log(error);
     });

     };*/

    /**=========================================================
     * Eliminar facturas
     =========================================================*/

    vm.cloneBill = function (billToClone) {
        console.log(billToClone);
        console.log("################");
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

    vm.voidBill = function (billId) {
        console.log(billId);
        ngDialog.openConfirm({
            template: 'voidBillModal',
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false
        }).then(function (value) {
            billService.voidBill(billId).then(function (response) {
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

    function pop(toasterdata) {
        toaster.pop({
            type: toasterdata.type,
            title: toasterdata.title,
            body: toasterdata.text,
            bodyOutputType: 'trustedHtml'
        });
    }
}