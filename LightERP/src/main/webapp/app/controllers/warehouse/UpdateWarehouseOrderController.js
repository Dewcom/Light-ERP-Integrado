'use strict';

(function () {
    'use strict';

    angular
        .module('app.warehouse')
        .controller('UpdateWarehouseOrderController', UpdateWarehouseOrderController);

    UpdateWarehouseOrderController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', '$uibModal', '$resource','warehouseOrderService',
        'productService', 'toaster', '$state', '$filter', '$timeout', 'ngDialog', '$scope', 'usSpinnerService', 'APP_CONSTANTS', '$stateParams'];
    function UpdateWarehouseOrderController(DTOptionsBuilder, DTColumnDefBuilder, $uibModal, $resource, warehouseOrderService, productService,
                                      toaster, $state, $filter, $timeout, ngDialog, $scope, usSpinnerService, APP_CONSTANTS, $stateParams) {
        var vm = this;
        vm.disableInfScroll = false;
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
            warehouseOrderService.get($stateParams.warehouseOrderId).then(function (response) {

                if (response.code === '0') {
                    console.log(response);
                    vm.currentWarehouseOrder = response.data;
                    vm.addedProductList = warehouseOrderService.getAddedProductList();
                }
            });

            /**=========================================================
             * Tipos de movimientos de ordenes de salida de bodega
             =========================================================*/

            warehouseOrderService.getAllWarehouseOrderMovementsTypes().then(function (response) {
                vm.warehouseOrderMovementsTypes = response;
            });

            /**=========================================================
             * Productos
             =========================================================*/

            productService.getAll().then(function (response) {
                vm.productList = response;
            });

            /**=========================================================
             * Datatable productos agregados
             =========================================================*/

            vm.dtOptionsAddedProductLots = DTOptionsBuilder.newOptions()
                .withOption('bFilter', false)
                .withOption('bInfo', false)
                .withOption('bPaginate', false)
                .withOption('bLengthChange', false)
                .withLanguage(language);
            vm.dtColumnDefsAddedProductLots = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3).notSortable()

            ];
        }

        //REGRESA A LA PANTALLA DE LISTA DE FACTURAS
        vm.goBack = function () {
            var params = {warehouseOrderId: vm.currentWarehouseOrder.id};
            $state.go('app.warehouseOrderDetail', params);
        };

        // Submit updated warehouse order form
        vm.submitForm = function () {

            ngDialog.openConfirm({
                template: 'confirmWarehouseOrderUpdate',
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: false
            }).then(function () {

                if(validProductLotsQuantities()){
                    updateWarehouseOrder();
                }else{
                    var toasterdata = {
                            type: 'warning',
                            title: 'Orden',
                            text: "Las cantidades de la orden no deben de ser 0."
                        };

                    pop(toasterdata);
                    $timeout(function () {
                        var params = {tabIndex: 2};
                        $state.go("app.storehouseDetail", params);
                    }, 3000);

                }

            }, function (reason) {
                console.log('Modal promise rejected. Reason: ', reason);
            });
        };

        /**=========================================================
         * Rechazar orden de salidad de bodega
         =========================================================*/

        vm.rejectOrder = function (orderId) {
            ngDialog.openConfirm({
                template: 'rejectOrderModal',
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: false
            }).then(function (rejectReason) {

                var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

                var rejectWarehouserObj = {
                    'warehouseOrderId': orderId,
                    'username': userInfo.userName,
                    'reason': rejectReason
                };

                warehouseOrderService.rejectWarehouseOrder(rejectWarehouserObj).then(function (response) {
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
                        var params = {tabIndex: 2};
                        $state.go("app.storehouseDetail", params);
                    }, 3000);

                }, function (error) {
                    console.log(error);
                });
            }, function (reason) {
                console.log('Modal promise rejected. Reason: ', reason);
            });
        };


        /**=========================================================
         * Agregar ordenes de salida
         =========================================================*/

        function updateWarehouseOrder() {

            var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

            var updatedWarehouseOrder = {
                "username": userInfo.userName,
                "warehouseOrderId": vm.currentWarehouseOrder.id,
                "billId": vm.currentWarehouseOrder.bill.id,
                "warehouseOrderStateType": APP_CONSTANTS.WAREHOUSE_ORDER_VALIDATED_STATE,
                "warehouseOrderMovementType": vm.currentWarehouseOrder.warehouseOrderMovementType.code,
                "warehouseOrderDetails": formatWarehouseOrderDetails(vm.addedProductList)
            };

            console.log(updatedWarehouseOrder);

            warehouseOrderService.resetAddedProductList();

            warehouseOrderService.updateWarehouseOrder(updatedWarehouseOrder).then(function (response) {
                var toasterdata;

                if (response.code === "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Orden validada',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Orden',
                        text: response.message
                    };
                }

                pop(toasterdata);
                $timeout(function () {
                    var params = {tabIndex: 2};
                    $state.go("app.storehouseDetail", params);
                }, 3000);
            }, function (error) {
                console.log(error);
            });
        }


        vm.openUpdateProductModal = function (selectedProduct) {
            console.log(selectedProduct);

            var modalInstance = $uibModal.open({
                templateUrl: '/updateProductInWarehouseOrderModal.html',
                controller: UpdaProductModalInstanceCtrl,
                size: 'lg',
                resolve: {
                    selectedProduct: function () {
                        return selectedProduct;
                    }
                },
                backdrop: 'static', // No cierra clickeando fuera
                keyboard: false // No cierra con escape
            });

            var state = $('#modal-state');
            modalInstance.result.then(function (result) {

                state.text('Modal dismissed with OK status');
            }, function () {
                state.text('Modal dismissed with Cancel status');
            });
        };

        UpdaProductModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'selectedProduct'];
        function UpdaProductModalInstanceCtrl($scope, $uibModalInstance, selectedProduct) {

            $scope.selectedProduct = $filter('filter')(vm.productList, {productCode: selectedProduct.productCode })[0];

            var productLotsTotal = 0;
            var totalQuantity = 0;

            angular.forEach($scope.selectedProduct.productLots, function (value, key) {
                if(value.quantity !== '' && typeof value.quantity !== 'undefined'){
                    productLotsTotal ++;
                    totalQuantity += value.quantity;
                }
            });

            $scope.selectedProduct.productLotsTotal = productLotsTotal;
            $scope.selectedProduct.totalQuantity = totalQuantity;
            console.log($scope.selectedProduct);
            console.log(vm.productList);

            $scope.ok = function () {

                console.log($scope.selectedProduct);
                console.log(vm.productList);

                var productLotsTotal = 0;
                var totalQuantity = 0;

                angular.forEach($scope.selectedProduct.productLots, function (value, key) {
                    if(value.addedQuantity){
                        productLotsTotal ++;
                        totalQuantity += value.addedQuantity;
                    }
                });

                $scope.selectedProduct.productLotsTotal = productLotsTotal;
                $scope.selectedProduct.totalQuantity = totalQuantity;

                addProductsToWarehouseOrder($scope.selectedProduct);
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }

        function addProductsToWarehouseOrder(selectedProduct) {

            var tmpProduct = $filter('filter')(vm.addedProductList, {productCode: selectedProduct.productCode })[0];

            var tmpProductLots = $filter('filter')(selectedProduct.productLots,{addedQuantity: "!== 'undefined'"});


            if(tmpProduct){
                tmpProduct.productLots = tmpProductLots;
                tmpProduct.totalQuantity = selectedProduct.totalQuantity;
                tmpProduct.productLotsTotal = selectedProduct.productLotsTotal;

            }

        }

        /**=============================================================
         * Formateo de detalles de orden de salida de bodega modificada
         ==============================================================*/

        function formatWarehouseOrderDetails(list) {
            var formattedList = [];

            angular.forEach(list, function (value) {

                if(value.productLots){
                    angular.forEach(value.productLots, function (v) {

                        if(v.addedQuantity){

                            var item = {
                                'productLotId': v.id,
                                'quantity': v.addedQuantity
                            };
                            formattedList.push(item);
                        }
                    });
                }
            });
            return formattedList;
        }

        function validProductLotsQuantities(){
            var totalQuantities = 0;
            var validQuantities = false;

            angular.forEach(vm.addedProductList, function (value) {
                if(value.totalQuantity){
                    totalQuantities += value.totalQuantity;
                }
            });

            if(totalQuantities > 0){
                validQuantities = true;
            }

            return validQuantities;
        }

        function pop(toasterdata) {
            toaster.pop({
                type: toasterdata.type,
                title: toasterdata.title,
                body: toasterdata.text
            });
        }
    }

})();