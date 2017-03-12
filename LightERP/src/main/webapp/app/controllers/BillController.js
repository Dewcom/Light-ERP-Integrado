'use strict';

(function () {
    'use strict';

    angular
        .module('app.bill')
        .controller('BillController', BillController);

    BillController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', 'billService', 'customerService', 'productService', '$scope',
        '$uibModal', 'productTypeService', 'presentationTypeService', '$state', 'toaster', '$timeout' , '$filter'];
    function BillController(DTOptionsBuilder, DTColumnDefBuilder, billService, customerService, productService, $scope, $uibModal,
                            productTypeService, presentationTypeService, $state, toaster, $timeout, $filter) {
        var vm = this;

        vm.taxTotal = 0;
        vm.discountTotal = 0;
        vm.billTotal = 0;

        var language = {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "",
            "sEmptyTable": "",
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
                var sortedProducts =  $filter('orderBy')(response, 'productCode');
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
             * Datatable productos agregados
             =========================================================*/

            vm.dtOptionsAddedProductos = DTOptionsBuilder.newOptions()
                .withOption('bFilter', false)
                .withOption('bInfo', false)
                .withOption('bPaginate', false)
                .withOption('bLengthChange', false)
                .withLanguage(language);
            vm.dtColumnDefsAddedProductos = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];
        }

        vm.getCustomerAddresses = function (customerId) {
            console.log(customerId);
            vm.customerAddresses = [];
            customerService.getAllAddresses(customerId).then(function (response) {
                vm.customerAddresses = response;
            });

        };


        /**=========================================================
         * Eliminar un producto de la factura
         =========================================================*/

        vm.removeProduct = function (index) {
            billService.removeProduct(index);
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

        /*vm.openUpdateModal = function (billObj) {

         var modalInstance = $uibModal.open({
         templateUrl: '/updateBillModal.html',
         controller: UpdateModalInstanceCtrl,
         size: 'md',
         resolve: {
         user: function () {
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
         };*/


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
        vm.submitForm = function (action) {

            var vm = this;

            vm.submitted = true;

            if (action == 'add') {
                if (vm.newBillForm.$valid) {
                    //HACE ALGO CON LA VALIDACION
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
         * Agregar facturas
         =========================================================*/

        vm.addBill = function () {

            var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

            var newBill = {
                "username": userInfo.userName,
                "customerId": $scope.chosenCustomer.id,
                "exchangeRate": 561,
                "billPaymentTypeId": 1,
                "creditConditionId": 1,
                "currencyId": 1,
                "billDetails": formatBillDetails(vm.addedProductList)

            };
            console.log(newBill);

            billService.resetAddedProductList();

            billService.addBill(newBill).then(function (response) {
                var toasterdata;

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Agregar usuario',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Usuario',
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


            $state.reload();
        };

        /**=========================================================
         * Modificar facturas
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
         * Modificar facturas
         =========================================================*/

        function updateBill() {

            /* var updatedUser={
             "id":$scope.currentUser.id,
             "username":$scope.currentUser.username,
             "password":$scope.currentUser.password,
             "userCode":$scope.currentUser.userCode,
             "name":$scope.currentUser.name ,
             "firstLastName":$scope.currentUser.firstLastName,
             "secondLastName":$scope.currentUser.secondLastName,
             "phoneNumber":$scope.currentUser.phoneNumber,
             "extension":$scope.currentUser.extension,
             "mobile":$scope.currentUser.mobile,
             "email":$scope.currentUser.email,
             "commissionPercentage":$scope.currentUser.commissionPercentage
             };
             console.log(updatedUser);
             billService.updateUser(updatedUser).then(function (response) {
             var toasterdata;

             if(response.code == "0"){
             toasterdata = {
             type: 'success',
             title: 'Modificar usuario',
             text: response.message
             };
             }else{
             toasterdata = {
             type: 'warning',
             title: 'Usuario',
             text: response.message
             };

             }
             pop(toasterdata);
             $timeout(function(){ callAtTimeout(); }, 3000);
             },function (error) {
             console.log(error);
             });

             $scope.cancel();*/
        }


        /* /!**=========================================================
         * Eliminar facturas
         =========================================================*!/
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

         if(response.code == "0"){
         toasterdata = {
         type: 'success',
         title: 'Eliminar factura',
         text: response.message
         };
         }else{
         toasterdata = {
         type: 'warning',
         title: 'Factura',
         text: response.message
         };

         }
         pop(toasterdata);
         init();
         },function (error) {
         console.log(error);
         });
         }, function (reason) {
         console.log('Modal promise rejected. Reason: ', reason);
         });
         };*/

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
                var result = addProductToBill(vm.selectedProduct);
                $uibModalInstance.close(result);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
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

        function addProductToBill(selectedProduct) {

            console.log(selectedProduct);

            var productToAdd = {
                "productId": selectedProduct.id,
                "productCode": selectedProduct.productCode,
                "name": selectedProduct.name,
                "quantity": selectedProduct.quantity,
                "linePrice": selectedProduct.priceInColones,
                "discountPercentage": selectedProduct.discount,
                "taxPercentage": selectedProduct.tax,
                "subtotal": calculateSubtotal(selectedProduct.quantity, selectedProduct.priceInColones,
                    selectedProduct.discount, selectedProduct.tax)
            };

            var tmpList = billService.getAddedProductList();

            tmpList.push(productToAdd);

            vm.addedProductList = tmpList;

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


        function pop(toasterdata) {
            toaster.pop({
                type: toasterdata.type,
                title: toasterdata.title,
                body: toasterdata.text
            });
        }

        function callAtTimeout() {
            $state.reload();
        }
    }



    /**
     * AngularJS default filter with the following expression:
     * "person in people | filter: {name: $select.search, age: $select.search}"
     * performs a AND between 'name: $select.search' and 'age: $select.search'.
     * We want to perform a OR.
     */

    (function() {
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
                    items.forEach(function(item) {
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