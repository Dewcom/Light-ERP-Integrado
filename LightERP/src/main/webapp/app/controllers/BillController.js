'use strict';

(function () {
    'use strict';

    angular
        .module('app.bill')
        .controller('BillController', BillController);

    BillController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', 'billService', 'customerService', 'productService', '$scope',
        '$uibModal', 'productTypeService', 'presentationTypeService'];
    function BillController(DTOptionsBuilder, DTColumnDefBuilder, billService, customerService, productService, $scope, $uibModal,
                            productTypeService, presentationTypeService) {
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
                vm.productList = response;
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
             * Lista de productos por agregar
             =========================================================*/

            vm.addedProductList = billService.getAddedProductList();

            /**=========================================================
             * Datatable clientes
             =========================================================*/

            vm.dtOptionsCustomers = DTOptionsBuilder.newOptions()
                .withOption('bInfo', true)
                .withOption('bPaginate', true)
                .withOption('bLengthChange', false)
                .withOption('iDisplayLength', 2)
                .withLanguage(language);
            vm.dtColumnDefsCustomers = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];

            /**=========================================================
             * Datatable productos
             =========================================================*/

            vm.dtOptionsProducts = DTOptionsBuilder.newOptions()
                .withOption('bInfo', true)
                .withOption('bPaginate', true)
                .withOption('bLengthChange', false)
                .withOption('iDisplayLength', 2)
                .withLanguage(language);
            vm.dtColumnDefsProducts = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];

            /**=========================================================
             * Datatable direcciones
             =========================================================*/

            vm.dtOptionsAddresses = DTOptionsBuilder.newOptions()
                .withOption('bFilter', false)
                .withOption('bInfo', false)
                .withOption('bPaginate', false)
                .withOption('bLengthChange', false)
                .withLanguage(language);
            vm.dtColumnDefsAddresses = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()
            ];

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



        /**=========================================================
         * Escoger el cliente de la factura
         =========================================================*/

        vm.chooseCustomer = function (chosenCustomer) {
            console.log(chosenCustomer);
            $scope.chosenCustomer = JSON.parse(JSON.stringify(chosenCustomer));

            customerService.getAllAddresses(chosenCustomer.id).then(function (response) {
                $scope.customerAddresses = response;
                console.log($scope.customerAddresses);
            });
        };

        /**=========================================================
         * Escoger la dirección del cliente de la factura
         =========================================================*/

        vm.chooseAddress = function (chosenAddress) {
            console.log(chosenAddress);
            $scope.chosenAddress = JSON.parse(JSON.stringify(chosenAddress));
        };

        /**=========================================================
         * Module: modals
         =========================================================*/

        vm.openAddProductModal = function (product) {

            var modalInstance = $uibModal.open({
                templateUrl: '/addProductToBillModal.html',
                controller: AddModalInstanceCtrl,
                size: 'lg',
                resolve: {
                    product: function () {
                        return product;
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
                if (vm.addProductToBillForm.$valid) {
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

        function addBill() {

            /*var newUser ={
             "username":$scope.addUserForm.username,
             "password":$scope.addUserForm.password,
             "userCode":$scope.addUserForm.userCode,
             "name":$scope.addUserForm.name ,
             "firstLastName":$scope.addUserForm.firstLastName,
             "secondLastName":$scope.addUserForm.secondLastName,
             "phoneNumber":$scope.addUserForm.phoneNumber,
             "extension":$scope.addUserForm.extension,
             "mobile":$scope.addUserForm.mobile,
             "email":$scope.addUserForm.email,
             "commissionPercentage":parseFloat($scope.addUserForm.commissionPercentage)
             };
             console.log(newUser);
             billService.addUser(newUser).then(function (response) {
             var toasterdata;

             if(response.code == "0"){
             toasterdata = {
             type: 'success',
             title: 'Agregar usuario',
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

        AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'product', 'taxTotal', 'discountTotal'];
        function AddModalInstanceCtrl($scope, $uibModalInstance, product, taxTotal, discountTotal) {
            var vm = this;

            $scope.currentProduct = JSON.parse(JSON.stringify(product));
            $scope.currentProduct.quantity = 1;
            $scope.currentProduct.discount = 0;
            $scope.currentProduct.tax = 0;

            $scope.ok = function () {
                var result = addProductToBill($scope, taxTotal, discountTotal);
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

        function addProductToBill($scope, taxTotal, discountTotal) {

            var productToAdd = {
                "productId": $scope.currentProduct.id,
                "productCode": $scope.currentProduct.productCode,
                "name": $scope.currentProduct.name,
                "quantity": $scope.currentProduct.quantity,
                "linePrice": $scope.currentProduct.priceInColones,
                "discountPercentage": $scope.currentProduct.discount,
                "taxPercentage": $scope.currentProduct.tax,
                "subtotal": calculateSubtotal($scope.currentProduct.quantity, $scope.currentProduct.priceInColones,
                   $scope.currentProduct.discount,$scope.currentProduct.tax)
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
                'totalAmmount' : totalAmmount
            };
            return result;
        }

        function calculateSubtotal(quantity, price, discount, tax ){
            var tmpSubTotal = price * quantity;

            var totalAfterDiscount = tmpSubTotal - (tmpSubTotal * (discount/100));

            var subtotal = totalAfterDiscount + (totalAfterDiscount * (tax/100));

            return subtotal;
        }

        function calculateTotalTaxes(addedProductList) {
            var taxTotal = 0;

            angular.forEach(addedProductList, function(value, key) {
                taxTotal += parseFloat(value.taxPercentage) / 100 * parseFloat(value.linePrice);
            });

            return taxTotal;
        }

        function calculateTotalDiscount(addedProductList) {
            var totalDiscount = 0;

            angular.forEach(addedProductList, function(value, key) {
                totalDiscount += parseFloat(value.discountPercentage) / 100 * parseFloat(value.linePrice);
            });

            return totalDiscount;
        }

        function calculateTotalAmmount(addedProductList) {
            var totalAmmount = 0;

            angular.forEach(addedProductList, function(value, key) {
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

})();