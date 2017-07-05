'use strict';

angular
    .module('app.bill')
    .controller('BillDetailController', BillDetailController);

BillDetailController.$inject = ['$uibModal', '$http', '$state', '$stateParams', '$scope', 'billService', '$timeout', 'ngDialog', 'toaster',
    '$filter', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'APP_CONSTANTS', 'printService'];
function BillDetailController($uibModal, $http, $state, $stateParams, $scope, billService, $timeout, ngDialog, toaster, $filter,
                              DTOptionsBuilder, DTColumnDefBuilder, APP_CONSTANTS, printService) {
    var vm = this;
    $scope.globalConstants = APP_CONSTANTS;
    activateCalendar();

    /**=========================================================
     * Inicializa el calendario
     =========================================================*/

    function activateCalendar() {
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
        vm.format = 'dd-MM-yyyy';
    }

    ////////////////

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



        if($stateParams.tabIndex == 0){
            $scope.tab1 = true;
        }else{
            $scope.tab2 = true;
        }

        var bill;
        billService.get($stateParams.billId).then(function (response) {
            console.log(response.data);

            if (response.code == '0') {

                bill = response.data;

                $scope.currentBill = bill;

                if(bill.address != null){
                    billService.getAddressInfo(bill.address, function (addressInfo) {
                        $scope.currentBill.address = addressInfo;
                    });
                }

                vm.paymentQuantity = bill.payments.length;
                vm.paidTotal = calculatePaidTotal(bill);
                vm.toBepaidTotal = calculateToBePaidTotal(bill);
            }
        });

        /**=========================================================
         * Payments datatable
         =========================================================*/

        vm.dtPaymentOptions = DTOptionsBuilder.newOptions()
            .withOption('bFilter', false)
            .withOption('bInfo', false)
            .withOption('bPaginate', false)
            .withOption('bLengthChange', false)
            .withLanguage(language);
        vm.dtPaymentColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4).notSortable()
        ];

    }

    //REGRESA A LA PANTALLA DE LISTA DE FACTURAS
    vm.goBack = function () {
        var params = {tabIndex: 1}
        $state.go('app.billingMain', params);
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
     * Clonar facturas
     =========================================================*/

    vm.cloneBill = function (billToClone) {

        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        var newBill = {
            "userName": userInfo.userName,
            "customerId": billToClone.customer.id,
            "exchangeRate": billToClone.exchangeRate,
            "billPaymentTypeId": billToClone.billPaymentType.id,
            "creditConditionId": billToClone.creditCondition != null ? billToClone.creditCondition.id : null,
            "currencyId": billToClone.currency.id,
            "billState": APP_CONSTANTS.BILL_SAVED_STATE_CODE,
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
                    var params = {tabIndex: 1}
                    $state.go('app.billingMain', params);
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
        //se envia solamente el billstateid en el put ya q es
        // lo unico q ocupo cambiar
        var billToUpdate = {
            "billStateId": APP_CONSTANTS.BILL_VOID_STATE_CODE
        };

        ngDialog.openConfirm({
            template: 'voidBillModal',
            className: 'ngdialog-theme-default',
            closeByDocument: false,
            closeByEscape: false
        }).then(function (value) {
            billService.voidBill(billToUpdate, bill.id).then(function (response) {
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
                    var params = {tabIndex: 1}
                    $state.go('app.billingMain', params);
                }, 3000);

            }, function (error) {
                console.log(error);
            });
        }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });
    };

    /**=========================================================
     * Validar facturas
     =========================================================*/

    vm.validateBill = function (currentBill) {
        console.log(currentBill);

        var result = billService.billCustomValidator(currentBill);

        if (result.valid){

            ngDialog.openConfirm({
                template: 'validateBillModal',
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: false
            }).then(function (value) {
                vm.updateBill(currentBill);
            }, function (reason) {
                console.log('Modal promise rejected. Reason: ', reason);
            });
        } else {
            var toasterdata = {
                type: 'warning',
                title: 'Factura',
                text: result.message
            };

            pop(toasterdata);
            return false;
        }

    };

    /**=========================================================
     * Modificar facturas
     =========================================================*/
    vm.updateBill = function (currentBill) {

        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        var billToUpdate = {
            "billId" : currentBill.id,
            "customerId": currentBill.customer.id,
            "exchangeRate": parseFloat(currentBill.exchangeRate),
            "billPaymentTypeId": currentBill.billPaymentType.code,
            "creditConditionId": vm.creditCondition != null ? vm.creditCondition.id : null,
            "currencyId": currentBill.currency.id,
            "billStateId": APP_CONSTANTS.BILL_VALIDATED_STATE_CODE,
            "billDate": $filter('date')(currentBill.billDate, "dd-MM-yyyy"),
            "billDetails": formatBillDetails(currentBill.billDetails),
            "addressId" : currentBill.address.id
        };

        console.log(billToUpdate);

        billService.updateBill(billToUpdate).then(function (response) {
            var toasterdata;

            if (response.code == "0") {
                toasterdata = {
                    type: 'success',
                    title: 'Factura actualizada',
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
                $state.go("app.billingMain");
            }, 3000);
        }, function (error) {
            console.log(error);
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
        $scope.currentPayment.paymentDate = new Date($scope.currentPayment.paymentDate);

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
     * Formateo de informacion de facturas
     =========================================================*/

    function formatBillDetails(list) {
        console.log(list);

        var formattedList = [];

        angular.forEach(list, function (value, key) {

            var item = {
                'productId': value.productId,
                'quantity': value.quantity,
                'linePrice': parseFloat(value.linePrice),
                'discountPercentage': value.discountPercentage,
                'taxPercentage': value.taxPercentage
            };
            formattedList.push(item);
        });

        return formattedList;

    }

    /**=========================================================
     * Emitir pago
     =========================================================*/

    function makePayment() {

        var newPayment = {
            "billId": $scope.currentBill.id,
            "paymentDate": $filter('date')($scope.makePaymentForm.paymentDate, "dd-MM-yyyy"),
            "amount": parseFloat($scope.makePaymentForm.amount),
            "bankAccount": $scope.makePaymentForm.bankAccount,
            "bankReceipt": $scope.makePaymentForm.bankReceipt,
            "observation": $scope.makePaymentForm.observation,
            "paymentType": $scope.makePaymentForm.paymentType
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
                pop(toasterdata);

                $timeout(function () {
                    var params = {billId : $scope.currentBill.id, tabIndex: 1};
                    $state.go('app.billDetail', params);
                }, 3000);
            } else {
                toasterdata = {
                    type: 'warning',
                    title: 'Pago',
                    text: response.message
                };
                pop(toasterdata);
            }

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
            "paymentDate": $filter('date')($scope.currentPayment.paymentDate, "dd-MM-yyyy"),
            "amount": parseFloat($scope.currentPayment.amount),
            "bankAccount": $scope.currentPayment.bankAccount,
            "bankReceipt": $scope.currentPayment.bankReceipt,
            "observation": $scope.currentPayment.observation,
            "paymentType": $scope.currentPayment.paymentType
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
        toaster.pop({
            type: toasterdata.type,
            title: toasterdata.title,
            body: toasterdata.text
        });
    }

    /**=========================================================
     * Coversion a PDF
     =========================================================*/

    vm.toPDF = function (bill) {

        var billNumber = bill.billNumber;

        if(billNumber == null){
            billNumber = 'B' + bill.id;
        }

        var docDefinition = printService.createDocDefinition(bill);

        //pdfMake.createPdf(docDefinition).download('factura ' + billNumber + '.pdf');

        pdfMake.createPdf(docDefinition).open();

        //pdfMake.createPdf(docDefinition).print();
    };

    /**=========================================================
     * Calcula el total pagado
     =========================================================*/

    function calculatePaidTotal (currentBill) {
        var paidTotal = 0;

        angular.forEach(currentBill.payments, function (value, key) {
            paidTotal += value.amount;
        });

        return paidTotal;
    }

    /**=========================================================
     * Calcula el total por ser pagado
     =========================================================*/

    function calculateToBePaidTotal (currentBill) {
        var toBePaidTotal = 0;
        var paidTotal = 0;

        angular.forEach(currentBill.payments, function (value, key) {
            console.log(value);
            paidTotal += value.amount;
        });

        toBePaidTotal = parseFloat(currentBill.totalAmount) - parseFloat(paidTotal);

        return toBePaidTotal;
    }

    /**=========================================================
     * Formatea el numero de factura para que muestre 6 caracteres
     =========================================================*/

    vm.formatBillNumber = function (bill) {
        var formatedBillNumber = "0";
        var zerosNeeded = 0;

        if(bill != undefined){
            if(bill.billNumber != null){
                zerosNeeded = 5 - parseInt(bill.billNumber.toString().length);

                for (var i = 0; i < zerosNeeded; i++) {
                    formatedBillNumber = formatedBillNumber.concat("0");
                }

                formatedBillNumber = formatedBillNumber.concat(bill.billNumber);
            }else{
                zerosNeeded = 4 - parseInt(bill.id.toString().length);

                for (var i = 0; i < zerosNeeded; i++) {
                    formatedBillNumber = formatedBillNumber.concat("0");
                }

                formatedBillNumber = formatedBillNumber.concat("B");

                formatedBillNumber = formatedBillNumber.concat(bill.id);

            }

            return formatedBillNumber;

        }

    };

}