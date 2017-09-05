'use strict';

(function () {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$uibModal', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        'productService', 'productTypeService', 'presentationTypeService', 'toaster', '$state',
        '$filter', '$timeout', 'ngDialog', '$scope'];
    function ProductController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, productService,
                               productTypeService, presentationTypeService, toaster, $state, $filter, $timeout, ngDialog, $scope) {
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

        init();

        ////////////////

        function init() {

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
             * Productos
             =========================================================*/

            productService.getAll().then(function (response) {
                console.log(response);
                vm.productList = response;
                vm.productListInf = response.slice(0,10);
            });

            /**=========================================================
             * Unidades de medida
             =========================================================*/

            productService.getAllMeasureUnits().then(function (response) {
                vm.measureUnitList = response;
            });

            /**=========================================================
             * Datatables
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

        vm.loadMoreProducts = function() {
            vm.productListInf = vm.productList.slice(0, vm.productListInf.length + 10);
        };

        vm.filterProducts = function(){
            vm.productListInf = vm.productList;
            var listByCode = $filter('filter')(vm.productList, {productCode: vm.search });
            var listByName = $filter('filter')(vm.productList, {name: vm.search });
            vm.productListInf = listByCode.concat(listByName);
        };


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
                    console.log(response);
                    var toasterdata;

                    if (response.code == "0") {
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar producto',
                            text: response.message
                        };
                    } else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Producto',
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

        /**=========================================================
         * Module: modals
         =========================================================*/

        vm.openAddModal = function () {

            var modalInstance = $uibModal.open({
                templateUrl: '/addProductModal.html',
                controller: AddModalInstanceCtrl,
                size: 'md',
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

        vm.openUpdateModal = function (productObj) {

            var modalInstance = $uibModal.open({
                templateUrl: '/updateProductModal.html',
                controller: UpdateModalInstanceCtrl,
                size: 'md',
                resolve: {
                    product: function () {
                        return productObj;
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
         * Validación de campos y patrones
         =========================================================*/
        vm.submitted = false;
        vm.validateInput = function (action, name, type) {
            if (action == 'add') {
                var input = vm.productForm[name];
                return (input.$dirty || vm.submitted) && input.$error[type];

            } else if (action == 'modify') {
                var input = vm.modifyProductForm[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            }
        };

        // Submit form
        vm.submitForm = function (action) {
            vm.submitted = true;

            if (action == 'add') {
                if (vm.productForm.$valid) {
                    addProduct();
                } else {
                    console.log('Not valid!!');
                    return false;
                }

            } else if (action == 'modify') {
                if (vm.modifyProductForm.$valid) {
                    updateProduct();
                } else {
                    console.log('Not valid!!');
                    return false;
                }

            }
        };

        /**=========================================================
         * Agregar productos
         =========================================================*/

        function addProduct() {

            console.log($scope.addProductForm.utilityPercentage);

            var newProduct = {
                "productCode": $scope.addProductForm.productCode,
                "name": $scope.addProductForm.productName,
                "commercialName": $scope.addProductForm.productCommercialName,
                "productType": $scope.addProductForm.productType,
                "presentationType": $scope.addProductForm.presentationType,
                "bulkQuantity": $scope.addProductForm.bulkQuantity != null ? parseFloat($scope.addProductForm.bulkQuantity) : $scope.addProductForm.bulkQuantity,
                "price": $scope.addProductForm.price != null ? parseFloat($scope.addProductForm.price) : $scope.addProductForm.price,
                "cost": $scope.addProductForm.cost != null ? parseFloat($scope.addProductForm.cost) : $scope.addProductForm.cost,
                "suggestedCost": $scope.addProductForm.suggestedCost != null ? parseFloat($scope.addProductForm.suggestedCost) : $scope.addProductForm.suggestedCost,
                "tariffHeading": $scope.addProductForm.tariffHeading,
                "utilityPercentage": $scope.addProductForm.utilityPercentage != undefined ? parseFloat($scope.addProductForm.utilityPercentage) : $scope.addProductForm.utilityPercentage,
                "measureUnit": $scope.addProductForm.measureUnit,
                "productTax": $scope.addProductForm.productTax != null ? parseFloat($scope.addProductForm.productTax) : $scope.addProductForm.productTax
            };
            console.log(newProduct);
            productService.addProduct(newProduct).then(function (response) {
                console.log(response);
                var toasterdata;

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Agregar producto',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Producto',
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


            $scope.cancel();
        }

        /**=========================================================
         * Modificar productos
         =========================================================*/

        function updateProduct() {

            console.log($scope.currentProduct.utilityPercentage);

            var updatedProduct = {
                "id": $scope.currentProduct.id,
                "productCode": $scope.currentProduct.productCode,
                "name": $scope.currentProduct.name,
                "commercialName": $scope.currentProduct.commercialName,
                "productType": $scope.currentProduct.productType.id,
                "presentationType": $scope.currentProduct.presentationType.id,
                "bulkQuantity": parseFloat($scope.currentProduct.bulkQuantity),
                "price": parseFloat($scope.currentProduct.price),
                "cost": parseFloat($scope.currentProduct.cost),
                "suggestedCost": parseFloat($scope.currentProduct.suggestedCost),
                "tariffHeading": $scope.currentProduct.tariffHeading,
                "utilityPercentage": $scope.currentProduct.utilityPercentage != undefined &&  $scope.currentProduct.utilityPercentage != ""? parseFloat($scope.currentProduct.utilityPercentage) : 0,
                "measureUnit": $scope.currentProduct.measureUnit.id,
                "productTax": parseFloat($scope.currentProduct.productTax)
            };
            console.log(updatedProduct);
            productService.updateProduct(updatedProduct).then(function (response) {
                console.log(response);
                var toasterdata;

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Modificar producto',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Producto',
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

            $scope.cancel();
        }


        AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
        function AddModalInstanceCtrl($scope, $uibModalInstance) {
            var vm = this;


            $scope.close = function () {
                $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }

        UpdateModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'product'];
        function UpdateModalInstanceCtrl($scope, $uibModalInstance, product) {
            var vm = this;

            console.log(product);

            $scope.currentProduct = JSON.parse(JSON.stringify(product));

            $scope.close = function () {
                $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
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