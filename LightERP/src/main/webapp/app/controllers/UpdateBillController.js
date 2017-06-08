'use strict';

angular
    .module('app.bill')
    .controller('UpdateBillController', UpdateBillController);

UpdateBillController.$inject = ['$http', '$state', '$stateParams', '$scope', 'billService', '$timeout', 'ngDialog', 'toaster',
    'customerService', 'productService', 'productTypeService', 'presentationTypeService', '$filter', '$uibModal'];
function UpdateBillController($http, $state, $stateParams, $scope, billService, $timeout, ngDialog, toaster, customerService,
                              productService, productTypeService, presentationTypeService, $filter, $uibModal) {

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
                vm.currentBill = response.data;
                console.log(vm.currentBill);

                customerService.getAllAddresses(vm.currentBill.customer.id).then(function (response) {
                    vm.customerAddresses = response;
                });

                billService.getAddressInfo(vm.currentBill.address, function (addressInfo) {
                    vm.currentBill.address = addressInfo;
                });

                console.log(vm.currentBill.billDetails);

                prepareBillProductList(vm.currentBill.billDetails);

            }
        });

        function prepareBillProductList(billDetailList) {

            var productList = [];

            angular.forEach(billDetailList, function (value, key) {
                var productToAdd = {
                    "productId": value.product.id,
                    "productCode": value.product.productCode,
                    "name": value.product.name,
                    "quantity": value.quantity,
                    "linePrice": value.linePrice,
                    "discountPercentage": value.discountPercentage,
                    "taxPercentage": value.taxPercentage,
                    "subtotal": value.total
                };

                productList.push(productToAdd);
            });

            billService.setUpdateBillProductList(productList);

            console.log(productList);

            vm.currentBill.productList = productList;
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
        });

    }

    //REGRESA A LA PANTALLA DE DETALLE DE FACTURAS
    vm.goBack = function () {
        var params = {billId: vm.currentBill.id}
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
    };


    /**=========================================================
     * Eliminar un producto de la factura
     =========================================================*/

    vm.removeProduct = function (index) {
        billService.removeProductUpdateBill(index);
        var updateBillProductList = billService.getUpdateBillProductList();
        vm.billTotal = calculateTotalAmmount(updateBillProductList);
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
                console.log('Not valid!!');
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
            billStateId = 1;
        } else if (billStateId = 'validated') {
            billStateId = 2;
        }


        var billToUpdate = {
            "billId" : vm.currentBill.id,
            "customerId": vm.currentBill.customer.id,
            "exchangeRate": vm.currentBill.exchangeRate,
            "billPaymentTypeId": vm.currentBill.billPaymentType.id,
            "creditConditionId": vm.currentBill.billPaymentType.id == 2 ? vm.currentBill.creditCondition.id : null,
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
                callAtTimeout();
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
                }
            },
            backdrop: 'static', // No cierra clickeando fuera
            keyboard: false // No cierra con escape
        });

        var state = $('#modal-state');
        modalInstance.result.then(function (result) {
            vm.taxTotal = result.taxTotal;
            vm.discountTotal = result.discountTotal;
            vm.billTotal = result.totalAmmount;
            state.text('Modal dismissed with OK status');
        }, function () {
            state.text('Modal dismissed with Cancel status');
        });
    };

    function addProductToUpdateBill(selectedProduct) {

        var productToAdd = {
            "productId": selectedProduct.id,
            "name": selectedProduct.name,
            "productCode": selectedProduct.productCode,
            "quantity": selectedProduct.quantity,
            "linePrice": selectedProduct.priceInColones,
            "discountPercentage": selectedProduct.discount,
            "taxPercentage": selectedProduct.tax,
            "subtotal": calculateSubtotal(selectedProduct.quantity, selectedProduct.priceInColones,
                selectedProduct.discount, selectedProduct.tax)
        };

        var tmpList = billService.getUpdateBillProductList();

        tmpList.push(productToAdd);

        console.log(tmpList);

        vm.currentBill.productList = tmpList;

        var tmpTaxes = calculateTotalTaxes(tmpList);
        var tmpDiscount = calculateTotalDiscount(tmpList);
        var totalAmmount = calculateTotalAmmount(tmpList);

        var result = {
            'taxTotal': tmpTaxes,
            'discountTotal': tmpDiscount,
            'totalAmmount': totalAmmount
        };

        return result;
    }

    // Please note that $uibModalInstance represents a modal window (instance) dependency.
    // It is not the same as the $uibModal service used above.

    AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'productList', 'discountTotal', 'taxTotal'];
    function AddModalInstanceCtrl($scope, $uibModalInstance, productList, discountTotal, taxTotal) {
        var vm = this;
        vm.selectedProduct = {};

        vm.productList = productList;

        $scope.selectProduct = function (product) {
            vm.selectedProduct = product;
            vm.selectedProduct.quantity = 1;
            vm.selectedProduct.discount = 0;
            vm.selectedProduct.tax = 0;
        };

        $scope.ok = function () {

            console.log(vm.selectedProduct);
            var result = addProductToUpdateBill(vm.selectedProduct);
            $uibModalInstance.close(result);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

    function calculateSubtotal(quantity, price, discount, tax) {
        var tmpSubTotal = price * quantity;

        var totalAfterDiscount = tmpSubTotal - (tmpSubTotal * (discount / 100));

        var subtotal = totalAfterDiscount + (totalAfterDiscount * (tax / 100));

        return subtotal;
    }

    function calculateTotalTaxes(addedProductList) {
        var taxTotal = 0;

        angular.forEach(addedProductList, function (value, key) {
            taxTotal += parseFloat(value.taxPercentage) / 100 * parseFloat(value.linePrice);
        });

        return taxTotal;
    }

    function calculateTotalDiscount(addedProductList) {
        var totalDiscount = 0;

        angular.forEach(addedProductList, function (value, key) {
            totalDiscount += parseFloat(value.discountPercentage) / 100 * parseFloat(value.linePrice);
        });

        return totalDiscount;
    }

    function calculateTotalAmmount(addedProductList) {
        var totalAmmount = 0;

        angular.forEach(addedProductList, function (value, key) {
            totalAmmount += parseFloat(value.subtotal);
        });

        return totalAmmount;
    }

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
            body: toasterdata.text,
            bodyOutputType: 'trustedHtml'
        });
    }

    function callAtTimeout() {
        $state.go("app.billingMain");
    }
}