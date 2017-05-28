'use strict';

angular
    .module('app.bill')
    .controller('BillDetailController', BillDetailController);

BillDetailController.$inject = ['$uibModal', '$http', '$state', '$stateParams', '$scope', 'billService', '$timeout', 'ngDialog', 'toaster',
    '$filter', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'APP_CONSTANTS', 'printService'];
function BillDetailController($uibModal, $http, $state, $stateParams, $scope, billService, $timeout, ngDialog, toaster, $filter,
                              DTOptionsBuilder, DTColumnDefBuilder, APP_CONSTANTS, printService) {
    var vm = this;



    var language = {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    };


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

        /**=========================================================
         * Payments datatable
         =========================================================*/

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withLanguage(language);
        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4).notSortable()
        ];

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

    /**=========================================================
     * Update payment modal
     =========================================================*/

    vm.openUpdatePaymentModal = function (paymentObj) {

        var modalInstance = $uibModal.open({
            templateUrl: '/updatePaymentModal.html',
            controller: UpdatePaymentModalInstanceCtrl,
            size: 'md',
            resolve: {
                paymentObj: function () {
                    return paymentObj;
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

        vm.currentBill = JSON.parse(JSON.stringify(billObj));

        $scope.close = function () {
            $uibModalInstance.close('closed');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }


    UpdatePaymentModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'paymentObj'];
    function UpdatePaymentModalInstanceCtrl($scope, $uibModalInstance, paymentObj) {

        $scope.currentPayment = JSON.parse(JSON.stringify(paymentObj));

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
    vm.validateInput = function (action, name, type) {

        if (action == 'add') {
            var input = vm.paymentForm[name];
            return (input.$dirty || vm.submitted) && input.$error[type];

        } else if (action == 'modify') {
            var input = vm.updatePaymentForm[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
        }
    };

    // Submit form
    vm.submitForm = function (action) {
        vm.submitted = true;

        if(action == 'add'){

            if (vm.paymentForm.$valid) {
                makePayment();
            } else {
                console.log('Not valid!!');
                return false;
            }

        }else if(action == 'modify'){

            if (vm.updatePaymentForm.$valid) {
                updatePayment();
            } else {
                console.log('Not valid!!');
                return false;
            }
        }
    };

    /**=========================================================
     * Emitir pago
     =========================================================*/

    function makePayment() {

        var newPayment = {
            "billId": $scope.currentBill.id,
            "amount": parseFloat($scope.makePaymentForm.amount),
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

            $timeout(function () {
                $state.reload();
            }, 3000);

        }, function (error) {
            console.log(error);
        });

        $scope.cancel();
    }

    /**=========================================================
     * Actualizar pago
     =========================================================*/

    function updatePayment() {

        var updatedPayment = {
            "id": $scope.currentPayment.id,
            "amount": parseFloat($scope.currentPayment.amount),
            "bank": $scope.currentPayment.bank,
            "bankReceipt": $scope.currentPayment.bankReceipt,
            "observation": $scope.currentPayment.observation
        };
        console.log(updatedPayment);

        billService.updatePayment(updatedPayment).then(function (response) {
            console.log(response);
            var toasterdata;

            if (response.code == "0") {
                toasterdata = {
                    type: 'success',
                    title: 'Modificación exitosa',
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

            $timeout(function () {
                $state.reload();
            }, 3000);

        }, function (error) {
            console.log(error);
        });

        $scope.cancel();
    }

    /**=========================================================
     * Eliminar pago
     =========================================================*/

    vm.deletePayment = function (paymentId) {
        console.log(paymentId);
        ngDialog.openConfirm({
            template: 'deletePaymentModal',
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false
        }).then(function (value) {
            billService.deletePayment(paymentId).then(function (response) {
                var toasterdata;
                console.log(response);

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Eliminar pago',
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

                $timeout(function () {
                    $state.reload();
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

    /**=========================================================
     * Coversion a PFF
     =========================================================*/

    vm.toPDF = function (bill) {

        var billNumber = bill.billNumber;

        if(billNumber == null){
            billNumber = 'B' + bill.id;
        }

        var docDefinition = printService.createDocDefinition(bill);

        //pdfMake.createPdf(docDefinition).download('factura ' + billNumber + '.pdf');

        //pdfMake.createPdf(docDefinition).open();

        pdfMake.createPdf(docDefinition).print();
    };

}