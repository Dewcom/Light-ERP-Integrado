'use strict';

angular
    .module('app.bill')
    .controller('UpdateBillController', UpdateBillController);

UpdateBillController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', '$http', '$state', '$stateParams', '$scope', 'billService', '$timeout', 'ngDialog', 'toaster',
    'customerService', 'productService', 'productTypeService', 'presentationTypeService', '$filter', '$uibModal', 'APP_CONSTANTS'];
function UpdateBillController(DTOptionsBuilder, DTColumnDefBuilder, $http, $state, $stateParams, $scope, billService, $timeout, ngDialog, toaster, customerService,
                              productService, productTypeService, presentationTypeService, $filter, $uibModal, APP_CONSTANTS) {

    var vm = this;
    $scope.globalConstants = APP_CONSTANTS;

    var language = {
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "",
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
        var bill;
        billService.get($stateParams.billId).then(function (response) {
                console.log(response);

            if (response.code == '0') {
                vm.currentBill = response.data;

                customerService.getAllAddresses(vm.currentBill.customer.id).then(function (response) {
                    vm.customerAddresses = response;
                });


                if(vm.currentBill.address != null || vm.currentBill.address != undefined){
                    billService.getAddressInfo(vm.currentBill.address, function (addressInfo) {
                        vm.currentBill.address = addressInfo;
                    });
                }

                prepareBillProductList(vm.currentBill);

                //iniciando variables de control del form de edicion de factura
                vm.billTotal = calculateTotalAmount(vm.currentBill.billDetails);
                vm.taxTotal = calculateTotalTaxes(vm.currentBill.billDetails);
                vm.discountTotal = calculateTotalDiscount(vm.currentBill.billDetails);
                //variable para mostrar fecha de la factura en el datePicker
                vm.billDate = new Date(vm.currentBill.billDate);
            }
        });

        function prepareBillProductList(currentBill) {
            var productList = [];
            angular.forEach(currentBill.billDetails, function (value, key) {
                var productToAdd = {
                    "productId": value.product.id,
                    "productCode": value.product.productCode,
                    "name": value.product.name,
                    "quantity": value.quantity,
                    "linePrice": parseFloat(value.linePrice),
                    "discountPercentage": value.discountPercentage,
                    "taxPercentage": value.taxPercentage,
                    "subTotal": parseFloat(value.total),
                    "product": value.product
                };

                productList.push(productToAdd);
            });


            billService.setUpdateBillProductList(productList);

            vm.currentBill.productList = billService.getUpdateBillProductList();
        }


        /**=========================================================
         * Productos
         =========================================================*/

        productService.getAll().then(function (response) {
            var sortedProducts = $filter('orderBy')(response, 'productCode');
            vm.productList = sortedProducts;
        });

        /**=========================================================
         * Tipos de producto
         =========================================================*/

        productTypeService.getAll().then(function (response) {
            vm.productTypeList = response;
        });

        /**=========================================================
         * Tipos de presentación
         =========================================================*/

        presentationTypeService.getAll().then(function (response) {
            vm.presentationTypeList = response;
        });

        /**=========================================================
         * Tipos de pago
         =========================================================*/

        billService.getAllPaymentTypes().then(function (response) {
            vm.paymentTypeList = response;
        });

        /**=========================================================
         * Tipos de monedas
         =========================================================*/

        billService.getAllCurrency().then(function (response) {
            vm.currencyList = response;
        });

        /**=========================================================
         * Tipos de condiciones de credito
         =========================================================*/

        billService.getAllCreditCondition().then(function (response) {
            vm.creditConditionList = response;
        });

        /**=========================================================
         * Tipos de cambio
         =========================================================*/

        billService.getAllExchangeRates().then(function (response) {
            vm.exchangeRateList = response;
            vm.exchangeRate = APP_CONSTANTS.LOCAL_EXCHANGE_RATE_VALUE;

            var rate = $filter("filter")(vm.exchangeRateList, {code: APP_CONSTANTS.EXCHANGE_RATE_DOLLARS_CODE});

            vm.dollarExchangeRateFromDB = rate[0].value;
        });

        /**=========================================================
         * Datatable productos agregados
         =========================================================*/

        vm.dtOptionsAddedProducts = DTOptionsBuilder.newOptions()
            .withOption('bFilter', false)
            .withOption('bInfo', false)
            .withOption('bPaginate', false)
            .withOption('bLengthChange', false)
            .withLanguage(language);
        vm.dtColumnDefsAddedProducts = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3).notSortable()

        ];
    }

    //REGRESA A LA PANTALLA DE DETALLE DE FACTURAS
    vm.goBack = function () {
        var params = {billId: vm.currentBill.id};
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
     * Ajusta el tipo de cambio de acuerdo a la moneda seleccionada
     =========================================================*/

    vm.changeExchangeRate = function (currency) {
        var rate = $filter("filter")(vm.exchangeRateList, {currency: {id: currency.id}});
        vm.currentBill.exchangeRate = rate[0].value;

        vm.updateProductListPrices(vm.currentBill.exchangeRate);
    };


    /**=========================================================
     * Eliminar un producto de la factura
     =========================================================*/

    vm.removeProduct = function (index) {
        billService.removeProductUpdateBill(index);
        var updateBillProductList = billService.getUpdateBillProductList();
        vm.billTotal = calculateTotalAmount(updateBillProductList);
        vm.taxTotal = calculateTotalTaxes(updateBillProductList);
        vm.discountTotal = calculateTotalDiscount(updateBillProductList);
    };

    // Submit form
    vm.submitForm = function (action, registrationType) {
        var vm = this;

        vm.submitted = true;

        if (action == 'add') {
            if (vm.updateBillForm.$valid) {
                if (registrationType == 'validated') {

                    ngDialog.openConfirm({
                        template: 'validateBillModal',
                        className: 'ngdialog-theme-default',
                        closeByDocument: false,
                        closeByEscape: false
                    }).then(function (value) {
                        vm.updateBill(registrationType);
                    }, function (reason) {
                        console.log('Modal promise rejected. Reason: ', reason);
                    });

                } else if (registrationType == 'saved') {
                    vm.updateBill(registrationType);
                }
            } else {
                var toasterdata = {
                    type: 'warning',
                    title: 'Factura',
                    text: 'Por favor completar todos los campos'
                };

                pop(toasterdata);
                return false;
            }

        } else if (action == 'modify') {
            if (vm.form.$valid) {
                updateUser();
            } else {
                console.log('Not valid!!');
                return false;
            }

        }
    };

    /**=========================================================
     * Modificar facturas
     =========================================================*/
    vm.updateBill = function (regType) {

        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        var billStateId;
        if (regType == 'saved') {
            billStateId = APP_CONSTANTS.BILL_SAVED_STATE_CODE;
        } else if (billStateId = 'validated') {
            billStateId = APP_CONSTANTS.BILL_VALIDATED_STATE_CODE;
        }


        var billToUpdate = {
            "billId" : vm.currentBill.id,
            "customerId": vm.currentBill.customer.id,
            "exchangeRate": parseFloat(vm.currentBill.exchangeRate),
            "billPaymentTypeId": vm.currentBill.billPaymentType.code,
            "creditConditionId": vm.currentBill.billPaymentType.code == APP_CONSTANTS.PAYMENT_TYPE_CREDIT_CODE ? vm.currentBill.creditCondition.id : null,
            "currencyId": vm.currentBill.currency.id,
            "billStateId": billStateId,
            "billDate": $filter('date')(vm.billDate, "dd-MM-yyyy"),
            "billDetails": formatBillDetails(vm.currentBill.productList),
            "addressId" : vm.currentBill.address.id
        };

        console.log(billToUpdate);

        billService.resetAddedProductList();

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
                var params = {billId: vm.currentBill.id};
                $state.go('app.billDetail', params);
            }, 3000);
        }, function (error) {
            console.log(error);
        });
    };

    /**=========================================================
     * Eliminar facturas
     =========================================================*/

    vm.disableBill = function (billId) {
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
                    var params = {tabIndex: 1};
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

    vm.voidBill = function (billId) {
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

                $timeout(function () {
                    var params = {tabIndex: 1};
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
     * Module: modals
     =========================================================*/

    vm.openAddProductModal = function () {

        var modalInstance = $uibModal.open({
            templateUrl: '/addProductToUpdateBillModal.html',
            controller: AddModalInstanceCtrl,
            size: 'lg',
            resolve: {
                productList: function () {
                    return vm.productList;
                },
                taxTotal: function () {
                    return vm.taxTotal;
                },
                discountTotal: function () {
                    return vm.discountTotal;
                },
                exchangeRate: function () {
                    return vm.currentBill.exchangeRate;
                },
                currency: function () {
                    return vm.currentBill.currency.id;
                },
                dollarExchangeRateFromDB: function () {
                    return vm.dollarExchangeRateFromDB;
                }
            },
            backdrop: 'static', // No cierra clickeando fuera
            keyboard: false // No cierra con escape
        });

        var state = $('#modal-state');
        modalInstance.result.then(function (result) {
            vm.taxTotal = result.taxTotal;
            vm.discountTotal = result.discountTotal;
            vm.billTotal = result.totalAmount;
            state.text('Modal dismissed with OK status');
        }, function () {
            state.text('Modal dismissed with Cancel status');
        });
    };

    function addProductToUpdateBill(selectedProduct, linePrice, currentProduct) {

        var productToAdd = {
            "productId": selectedProduct.id,
            "name": selectedProduct.name,
            "productCode": selectedProduct.productCode,
            "quantity": selectedProduct.quantity,
            "linePrice": parseFloat(linePrice),
            "discountPercentage": selectedProduct.discount,
            "taxPercentage": selectedProduct.productTax,
            "subTotal": parseFloat(calculateSubtotal(selectedProduct.quantity, linePrice, selectedProduct.discount, selectedProduct.productTax)),
            "product" : currentProduct
        };

        var tmpList = billService.getUpdateBillProductList();

        tmpList.push(productToAdd);

        console.log(tmpList);

        vm.currentBill.productList = tmpList;

        var tmpTaxes = calculateTotalTaxes(tmpList);
        var tmpDiscount = calculateTotalDiscount(tmpList);
        var totalAmount = calculateTotalAmount(tmpList);

        var result = {
            'taxTotal': tmpTaxes,
            'discountTotal': tmpDiscount,
            'totalAmount': totalAmount
        };

        return result;
    }

    // Please note that $uibModalInstance represents a modal window (instance) dependency.
    // It is not the same as the $uibModal service used above.

    AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'productList', 'discountTotal', 'taxTotal', 'currency', 'exchangeRate', 'dollarExchangeRateFromDB'];
    function AddModalInstanceCtrl($scope, $uibModalInstance, productList, discountTotal, taxTotal, currency, exchangeRate, dollarExchangeRateFromDB) {
        var vm = this;
        vm.selectedProduct = {};
        vm.productList = productList;
        var rate = APP_CONSTANTS.LOCAL_EXCHANGE_RATE_VALUE;
        var currentProduct;

        if(currency == APP_CONSTANTS.CURRENCY_COLONES_CODE){
            rate = dollarExchangeRateFromDB;
        }else{
            rate = exchangeRate;
        }

        $scope.selectProduct = function (product) {
            currentProduct = product;
            vm.selectedProduct = product;
            vm.selectedProduct.quantity = 1;
            vm.selectedProduct.discount = 0;
            vm.selectedProduct.calcDollarPrice = product.price / rate;
        };

        $scope.ok = function () {
            var linePrice = 0;

            if(currency == APP_CONSTANTS.CURRENCY_COLONES_CODE || currency == null){
                linePrice = vm.selectedProduct.price;
            }else{
                linePrice = vm.selectedProduct.calcDollarPrice;
            }

            var result = addProductToUpdateBill(vm.selectedProduct, linePrice, currentProduct);
            $uibModalInstance.close(result);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.adjustDollarPrice = function () {
            vm.selectedProduct.calcDollarPrice = vm.selectedProduct.price / rate;
        }
    }

    function calculateSubtotal(quantity, price, discount, tax) {
        var tmpSubTotal = price * quantity;

        var totalAfterDiscount = tmpSubTotal - (tmpSubTotal * (discount / 100));

        return totalAfterDiscount + (totalAfterDiscount * (tax / 100));
    }

    function calculateTotalAmount(addedProductList) {
        var totalAmount = 0;

        angular.forEach(addedProductList, function (value, key) {
            totalAmount += parseFloat(value.subTotal);
        });

        return totalAmount;
    }

    function calculateTotalTaxes(addedProductList) {
        var taxTotal = 0;
        var discount = 0;

        angular.forEach(addedProductList, function (value, key) {
            discount = parseFloat((value.discountPercentage) / 100 * parseFloat(value.linePrice));
            taxTotal += (parseFloat(value.linePrice) - discount) * parseFloat((value.taxPercentage)/100) * value.quantity;
        });

        return taxTotal;
    }

    function calculateTotalDiscount(addedProductList) {
        var totalDiscount = 0;

        angular.forEach(addedProductList, function (value, key) {
            totalDiscount += parseFloat((value.discountPercentage) / 100 * parseFloat(value.linePrice)) * value.quantity;
        });

        return totalDiscount;
    }

    function calculateTotalAmount(addedProductList) {
        var totalAmount = 0;

        angular.forEach(addedProductList, function (value, key) {
            totalAmount += parseFloat(value.subTotal);
        });

        return totalAmount;
    }

    /**=========================================================
     * Actualiza los montos de la factura de acuerdo a la moneda
     =========================================================*/

    vm.updateProductListPrices = function (exchangeRate) {
        var tmpList = billService.getUpdateBillProductList();

        angular.forEach(tmpList, function (value, key) {

            value.linePrice = value.product.price / exchangeRate;
            value.subTotal = calculateSubtotal(value.quantity, value.linePrice, value.discountPercentage, value.taxPercentage);
        });

        vm.currentBill.productList = tmpList;

        vm.billTotal = calculateTotalAmount(tmpList);
        vm.taxTotal = calculateTotalTaxes(tmpList);
        vm.discountTotal = calculateTotalDiscount(tmpList);
    };

    /**=========================================================
     * Formateo de informacion de facturas
     =========================================================*/

    function formatBillDetails(list) {
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
     * Resetea el tipo de condicion de credito
     =========================================================*/

    vm.resetCreditCondition = function () {
        if(vm.currentBill.billPaymentType.id == APP_CONSTANTS.PAYMENT_TYPE_CASH_CODE){
            vm.currentBill.creditCondition.id = null;
        }
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