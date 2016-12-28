'use strict';

(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$uibModal','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        'productService', 'productTypeService', 'presentationTypeService','toaster', '$state',
        '$filter', '$timeout', 'ngDialog', '$scope'];
    function ProductController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, productService,
                               productTypeService, presentationTypeService, toaster, $state, $filter, $timeout, ngDialog, $scope) {
        var vm = this;

        var language = {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        };

        init();

        ////////////////

        function init() {

            /**=========================================================
             * Tipos de producto
             =========================================================*/

            productTypeService.getAll().then(function(response) {
                vm.productTypeList = response;
            });

            /**=========================================================
             * Tipos de presentación
             =========================================================*/

            presentationTypeService.getAll().then(function(response) {
                vm.presentationTypeList = response;
            });

            /**=========================================================
             * Productos
             =========================================================*/

            productService.getAll().then(function(response) {
                vm.productList = response;
            });

            /**=========================================================
             * Datatables
             =========================================================*/

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withLanguage(language)
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3),
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ];


            /**=========================================================
             * Eliminar productos
             =========================================================*/
            vm.disableProduct = function (productId) {
                ngDialog.openConfirm({
                    template: 'disableProductModal',
                    className: 'ngdialog-theme-default',
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function (value) {
                    productService.disableProduct(productId).then(function (response) {
                        var toasterdata;
                        console.log(response);

                        if(response.code == "0"){
                            toasterdata = {
                                type: 'success',
                                title: 'Eliminar producto',
                                text: response.message
                            };
                        }else{
                            toasterdata = {
                                type: 'warning',
                                title: 'Producto',
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
            };

        /**=========================================================
         * Module: modals
         =========================================================*/

        vm.open = function (size) {

            var modalInstance = $uibModal.open({
                templateUrl: '/addProductModal.html',
                controller: ModalInstanceCtrl,
                size: size,
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

        // Please note that $uibModalInstance represents a modal window (instance) dependency.
        // It is not the same as the $uibModal service used above.

        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
        function ModalInstanceCtrl($scope, $uibModalInstance) {
            $scope.addProductForm = {};


            $scope.close = function () {
                $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            /**=========================================================
             * Agregar productos
             =========================================================*/

            $scope.addProduct = function() {


                var newCustomer ={
                    "name":$scope.addCustomerForm.name,
                    "firstLastName":$scope.addCustomerForm.firstLastName ,
                    "secondLastName":$scope.addCustomerForm.secondLastName,
                    "identification":$scope.addCustomerForm.identification,
                    "addresses": $scope.formatAddreses(),
                    "phoneNumber1":$scope.addCustomerForm.phoneNumber1,
                    "phoneNumber2":$scope.addCustomerForm.phoneNumber2 ,
                    "mobile":$scope.addCustomerForm.mobile ,
                    "website":$scope.addCustomerForm.website ,
                    "email":$scope.addCustomerForm.email ,
                    "discountPercentage":$scope.addCustomerForm.discountPercentage,
                    "creditLimit":$scope.addCustomerForm.creditLimit,
                    "identificationType":$scope.addCustomerForm.selectedIdentificationType,
                    "customerType":$scope.addCustomerForm.selectedCustomerType,
                    "contacts": [
                        { "name": $scope.addCustomerForm.contactName1,
                            "firstLastName": $scope.addCustomerForm.contactFirstLastName1,
                            "secondLastName": $scope.addCustomerForm.contactSecondLastName1,
                            "jobTitle": $scope.addCustomerForm.contactPosition1,
                            "department": $scope.addCustomerForm.contactDepartment1,
                            "phoneNumber1": $scope.addCustomerForm.contactPhoneNumber1,
                            "email": $scope.addCustomerForm.contactEmail1,
                            "mobile": $scope.addCustomerForm.contactMobile1
                        },
                        {
                            "name": $scope.addCustomerForm.contactName2,
                            "firstLastName": $scope.addCustomerForm.contactFirstLastName2,
                            "secondLastName": $scope.addCustomerForm.contactSecondLastName2,
                            "jobTitle": $scope.addCustomerForm.contactPosition2,
                            "department": $scope.addCustomerForm.contactDepartment2,
                            "phoneNumber1": $scope.addCustomerForm.contactPhoneNumber2,
                            "email": $scope.addCustomerForm.contactEmail2,
                            "mobile": $scope.addCustomerForm.contactMobile2
                        }
                    ]
                };
                console.log(newProduct);
                customerService.addCustomer(newProduct).then(function (response) {
                    var toasterdata;

                    if(response.code == "0"){
                        toasterdata = {
                            type: 'success',
                            title: 'Agregar producto',
                            text: response.message
                        };
                    }else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Producto',
                            text: response.message
                        };

                    }
                    pop(toasterdata);
                    $timeout(function(){ callAtTimeout(); }, 3000);
                },function (error) {
                    console.log(error);
                });

                $uibModalInstance.close('closed');
            };
            };
        }


        function pop(toasterdata){
            toaster.pop({
                type: toasterdata.type,
                title : toasterdata.title,
                body: toasterdata.text
            });
        }

        function callAtTimeout(){
            $state.reload();
        }
    }

})();