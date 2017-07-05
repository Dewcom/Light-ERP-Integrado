(function () {
    'use strict';

    angular
        .module('app.bill')
        .controller('BillController', BillController);

    BillController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', 'billService', 'customerService', 'productService', '$scope',
                                '$uibModal', 'productTypeService', 'presentationTypeService', '$state', 'toaster', '$timeout', '$filter',
                                'ngDialog', '$rootScope', '$stateParams', 'APP_CONSTANTS'];
    function BillController(DTOptionsBuilder, DTColumnDefBuilder, billService, customerService, productService, $scope, $uibModal,
                            productTypeService, presentationTypeService, $state, toaster, $timeout, $filter, ngDialog, $rootScope, $stateParams,
                            APP_CONSTANTS) {
        var vm = this;
        $scope.globalConstants = APP_CONSTANTS;
        // Se utiliza para tener disponible el tipo de cambio original traido de BD.
        activateCalendar();
        activateChart();

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

        function activateChart() {

            // SPLINE
            // -----------------------------------

            vm.splineOptions = {
                series: {
                    lines: {
                        show: false
                    },
                    points: {
                        show: true,
                        radius: 4
                    },
                    splines: {
                        show: true,
                        tension: 0.4,
                        lineWidth: 1,
                        fill: 0.5
                    }
                },
                grid: {
                    borderColor: '#eee',
                    borderWidth: 1,
                    hoverable: true,
                    backgroundColor: '#fcfcfc'
                },
                tooltip: true,
                tooltipOpts: {
                    content: function (label, x, y) { return x + ' : ' + y; }
                },
                xaxis: {
                    tickColor: '#fcfcfc',
                    mode: 'categories'
                },
                yaxis: {
                    min: 0,
                    max: 150, // optional: use it for a clear represetation
                    tickColor: '#eee',
                    position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                    tickFormatter: function (v) {
                        return v/* + ' visitors'*/;
                    }
                },
                shadowSize: 0
            };
        }

        vm.taxTotal = 0;
        vm.discountTotal = 0;
        vm.billTotal = 0;

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

        ////////////////

        function init() {

            if($stateParams.tabIndex == 0){
                $scope.tab1 = true;
            }else{
                $scope.tab2 = true;
            }

            /**=========================================================
             * Facturas
             =========================================================*/

            billService.getAll().then(function (response) {
                vm.billList = response;
            });

            /**=========================================================
             * Clientes
             =========================================================*/

            customerService.getAll().then(function (response) {
                vm.customerList = response;
            });

            /**=========================================================
             * Productos
             =========================================================*/

            productService.getAll().then(function (response) {
                vm.productList = $filter('orderBy')(response, 'productCode');
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
             * Unidades de medida
             =========================================================*/

            productService.getAllMeasureUnits().then(function (response) {
                vm.measureUnitsList = response;
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
                vm.currency = response[0].currencyCode;
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

            /**=========================================================
             * Datatable productos agregados
             =========================================================*/

            vm.dtOptionsBills = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withOption('order', [1 , 'desc'])
                .withLanguage(language);
            vm.dtColumnDefsBills = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3)
            ];
        }

        /**=========================================================
         * Formatea el numero de factura para que muestre 6 caracteres
         =========================================================*/

        vm.formatBillNumber = function (bill) {
            var formatedBillNumber = "0";
            var zerosNeeded = 0;

            if(bill.billNumber != null){
                zerosNeeded = 5 - parseInt(bill.billNumber.toString().length);

                for (i = 0; i < zerosNeeded; i++) {
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

        };

        //REGRESA A LA PANTALLA DE LISTA DE FACTURAS
        vm.goBack = function () {
            billService.resetAddedProductList();
            var params = {tabIndex: 1}
            $state.go('app.billingMain', params);
        };

        //LLeva a la pantalla de nueva factura
        vm.createBill = function () {
            billService.resetAddedProductList();
            $state.go('app.newBill');
        };

        /**=========================================================
         * Obtiene las direcciones del cliente de la factura
         =========================================================*/

        vm.getCustomerAddresses = function (customerId) {
            vm.customerAddresses = [];
            customerService.getAllAddresses(customerId).then(function (response) {
                vm.customerAddresses = response;
            });

        };


        /**=========================================================
         * Ajusta el tipo de cambio de acuerdo a la moneda seleccionada
         =========================================================*/

        vm.changeExchangeRate = function (currency) {
            var rate = $filter("filter")(vm.exchangeRateList, {currency: {currencyCode: currency}});
            vm.exchangeRate = rate[0].value;

            vm.updateProductListPrices(vm.exchangeRate);
        };


        /**=========================================================
         * Eliminar un producto de la factura
         =========================================================*/

        vm.removeProduct = function (index) {
            billService.removeProduct(index);
            var addedProductList = billService.getAddedProductList();
            vm.billTotal = calculateTotalAmount(addedProductList);
            vm.taxTotal = calculateTotalTaxes(addedProductList);
            vm.discountTotal = calculateTotalDiscount(addedProductList);
        };

        /**=========================================================
         * Module: modals
         =========================================================*/

        vm.openAddProductModal = function () {

            var modalInstance = $uibModal.open({
                templateUrl: '/addProductToBillModal.html',
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
                        return vm.exchangeRate;
                    },
                    currency: function () {
                        return vm.currency;
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


        /**=========================================================
         * Validación de campos y patrones
         =========================================================*/
        vm.submitted = false;
        vm.validateInput = function (action, name, type) {
            if (action == 'add') {
                var input = vm.addProductToBillForm[name];
                return (input.$dirty || vm.submitted) && input.$error[type];

            } else if (action == 'modify') {
                var input = vm.form[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            }
        };

        // Submit form
        vm.submitForm = function (registrationType) {
            var vm = this;
            vm.submitted = true;

            if(registrationType == APP_CONSTANTS.BILL_SAVED_STATE_CODE){
                vm.addBill(APP_CONSTANTS.BILL_SAVED_STATE_CODE);
            }else if(registrationType == APP_CONSTANTS.BILL_VALIDATED_STATE_CODE){

                if (vm.newBillForm.$valid && billService.getAddedProductList().length > 0){

                    ngDialog.openConfirm({
                        template: 'validateBillModal',
                        className: 'ngdialog-theme-default',
                        closeByDocument: false,
                        closeByEscape: false
                    }).then(function (value) {
                        vm.addBill(APP_CONSTANTS.BILL_VALIDATED_STATE_CODE);
                    }, function (reason) {
                        console.log('Modal promise rejected. Reason: ', reason);
                    });
                } else {
                    var toasterdata = {
                        type: 'warning',
                        title: 'Factura',
                        text: 'Por favor completar todos los campos'
                    };
                    console.log(toasterdata);

                    pop(toasterdata);
                    return false;
                }

            }
        };

        /**=========================================================
         * Agregar facturas
         =========================================================*/

        vm.addBill = function (billState) {

            var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

            var newBill = {
                "userName": userInfo.userName,
                "customerId": vm.chosenCustomer.id,
                "exchangeRate": parseFloat(vm.exchangeRate),
                "billPaymentTypeId": vm.paymentType,
                "creditConditionId": vm.paymentType == APP_CONSTANTS.PAYMENT_TYPE_CREDIT_CODE ? vm.creditCondition : null,
                "currencyId": vm.currency == null ? APP_CONSTANTS.CURRENCY_COLONES_CODE : vm.currency,
                "billState": billState,
                "billDate": $filter('date')(vm.billDate, "dd-MM-yyyy"),
                "billDetails": formatBillDetails(vm.addedProductList),
                "billAddress" : vm.chosenCustomer.chosenAddress != null ? vm.chosenCustomer.chosenAddress.id :null
            };

            console.log(newBill);

            billService.resetAddedProductList();

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
                    callAtTimeout();
                }, 3000);
            }, function (error) {
                console.log(error);
            });

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
                    'linePrice': value.linePrice,
                    'discountPercentage': value.discountPercentage,
                    'taxPercentage': value.taxPercentage
                };
                formattedList.push(item);
            });

            return formattedList;

        }

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
                    init();
                }, function (error) {
                    console.log(error);
                });
            }, function (reason) {
                console.log('Modal promise rejected. Reason: ', reason);
            });
        };

        // Please note that $uibModalInstance represents a modal window (instance) dependency.
        // It is not the same as the $uibModal service used above.

        AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'productList', 'discountTotal', 'taxTotal', 'exchangeRate', 'currency', 'dollarExchangeRateFromDB'];
        function AddModalInstanceCtrl($scope, $uibModalInstance, productList, discountTotal, taxTotal, exchangeRate, currency, dollarExchangeRateFromDB) {
            var vm = this;
            vm.selectedProduct = {};
            vm.productList = productList;
            var rate = APP_CONSTANTS.LOCAL_EXCHANGE_RATE_VALUE;

            if(currency == APP_CONSTANTS.CURRENCY_COLONES_CODE){
                rate = dollarExchangeRateFromDB;
            }else{
                rate = exchangeRate;
            }

            $scope.selectProduct = function (product) {
                vm.selectedProduct = product;
                vm.selectedProduct.quantity = 1;
                vm.selectedProduct.discount = 0;
                vm.selectedProduct.tax = 0;
                vm.selectedProduct.calcDollarPrice = product.price / rate;
                vm.currency = currency;
            };

            $scope.ok = function () {
                var linePrice = 0;

                if(currency == APP_CONSTANTS.CURRENCY_COLONES_CODE || currency == null){
                    linePrice = vm.selectedProduct.price;
                }else{
                    linePrice = vm.selectedProduct.calcDollarPrice;
                }

                var result = addProductToBill(vm.selectedProduct, linePrice);
                $uibModalInstance.close(result);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.adjustDollarPrice = function () {
                vm.selectedProduct.calcDollarPrice = vm.selectedProduct.price / rate;
            }
        }

        UpdateModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
        function UpdateModalInstanceCtrl($scope, $uibModalInstance) {
            var vm = this;

            $scope.currentUser = JSON.parse(JSON.stringify(user));

            $scope.close = function () {
                $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }

        function addProductToBill(selectedProduct, linePrice) {

            console.log(selectedProduct);

            var productToAdd = {
                "productId": selectedProduct.id,
                "productCode": selectedProduct.productCode,
                "name": selectedProduct.name,
                "quantity": selectedProduct.quantity,
                "price": selectedProduct.price,
                "linePrice": linePrice,
                "discountPercentage": selectedProduct.discount,
                "taxPercentage": selectedProduct.tax,
                "subtotal": calculateSubtotal(selectedProduct.quantity, linePrice,
                    selectedProduct.discount, selectedProduct.tax)
            };

            var tmpList = billService.getAddedProductList();

            tmpList.push(productToAdd);

            vm.addedProductList = tmpList;

            var tmpTaxes = calculateTotalTaxes(tmpList);
            var tmpDiscount = calculateTotalDiscount(tmpList);
            var totalAmount = calculateTotalAmount(tmpList);

            return {
                'taxTotal': tmpTaxes,
                'discountTotal': tmpDiscount,
                'totalAmount': totalAmount
            };
        }

        function calculateSubtotal(quantity, price, discount, tax) {
            var tmpSubTotal = price * quantity;

            var totalAfterDiscount = tmpSubTotal - (tmpSubTotal * (discount / 100));

            return totalAfterDiscount + (totalAfterDiscount * (tax / 100));
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
                totalAmount += parseFloat(value.subtotal);
            });

            return totalAmount;
        }

        /**=========================================================
         * Actualiza los montos de la factura de acuerdo a la moneda
         =========================================================*/

        vm.updateProductListPrices = function (exchangeRate) {
            var tmpList = billService.getAddedProductList();

            angular.forEach(tmpList, function (value, key) {
                value.linePrice = value.price / exchangeRate;
                value.subtotal = calculateSubtotal(value.quantity, value.linePrice, value.discountPercentage, value.taxPercentage);
            });

            vm.addedProductList = tmpList;

            vm.billTotal = calculateTotalAmount(tmpList);
            vm.taxTotal = calculateTotalTaxes(tmpList);
            vm.discountTotal = calculateTotalDiscount(tmpList);
        };

        /**=========================================================
         * Resetea el tipo de condicion de credito
         =========================================================*/

        vm.resetCreditCondicion = function () {

            if(vm.paymentType == APP_CONSTANTS.PAYMENT_TYPE_CASH_CODE){
                vm.creditCondition = null;
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

        function callAtTimeout() {
            $state.go("app.billingMain");
        }
    }

    /**
     * AngularJS default filter with the following expression:
     * "person in people | filter: {name: $select.search, age: $select.search}"
     * performs a AND between 'name: $select.search' and 'age: $select.search'.
     * We want to perform a OR.
     */

    (function () {
        'use strict';

        angular
            .module('app.forms')
            .filter('propsFilter', propsFilter);

        function propsFilter() {
            return filterFilter;

            ////////////////
            function filterFilter(items, props) {
                var out = [];

                if (angular.isArray(items)) {
                    items.forEach(function (item) {
                        var itemMatches = false;

                        var keys = Object.keys(props);
                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            }
        }

    })();

})();
