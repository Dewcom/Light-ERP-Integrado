'use strict';

(function () {
    'use strict';

    angular
        .module('app.warehouse')
        .controller('WarehouseOrderController', WarehouseOrderController);

    WarehouseOrderController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', '$uibModal', '$resource','warehouseOrderService',
        'productService', 'toaster', '$state', '$filter', '$timeout', 'ngDialog', '$scope', 'usSpinnerService', 'APP_CONSTANTS'];
    function WarehouseOrderController(DTOptionsBuilder, DTColumnDefBuilder, $uibModal, $resource, warehouseOrderService, productService,
        toaster, $state, $filter, $timeout, ngDialog, $scope, usSpinnerService, APP_CONSTANTS) {
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

            /**=========================================================
             * Ordenes de salida de bodega
             =========================================================*/

            warehouseOrderService.getAll().then(function (response) {
                vm.warehouseOrderList = response;
                vm.warehouseOrderListInf = response.slice(0,10);
                usSpinnerService.stop('warehouseOrdersSpinner');
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
                vm.productList = $filter('orderBy')(response, 'productCode');
            });

            /**=========================================================
             * Tipos de movimiento
             =========================================================*/

            productService.getAll().then(function (response) {
                vm.productList = $filter('orderBy')(response, 'productCode');
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


        vm.goBack = function () {
            warehouseOrderService.resetAddedProductList();

            angular.forEach(vm.productList, function (v){

                angular.forEach(v.productLots, function (value){
                    delete value['addedQuantity'];
                });
            });

            var params = {tabIndex: 1};
            $state.go('app.storehouseDetail', params);
        };

        /**=========================================================
         * Formatea el numero de orden para que muestre 6 caracteres
         =========================================================*/

        vm.formatWarehouseOrderNumber = function (warehouseOrder) {
            var formatedWarehouseOrderNumber = "OS";
            var zerosNeeded = 4 - parseInt(warehouseOrder.id.toString().length);

            for (var i = 0; i < zerosNeeded; i++) {
                formatedWarehouseOrderNumber = formatedWarehouseOrderNumber.concat("0");
            }

            formatedWarehouseOrderNumber = formatedWarehouseOrderNumber.concat(warehouseOrder.id);

            return formatedWarehouseOrderNumber;

        };

        vm.loadMoreWarehouseOrders = function() {
            vm.warehouseOrderListInf = vm.warehouseOrderList.slice(0, vm.warehouseOrderListInf.length + 10);
        };

        vm.filterWarehouseOrders = function(){
            vm.warehouseOrderListInf = vm.warehouseOrderList;

            if(vm.search === undefined || vm.search === ''){
                vm.warehouseOrderListInf = vm.warehouseOrderList.slice(0,10);
                vm.disableInfScroll = false;
            }else{
                var listByCode = $filter('filter')(vm.warehouseOrderList, {productCode: vm.search });
                var listByName = $filter('filter')(vm.warehouseOrderList, {name: vm.search });
                vm.warehouseOrderListInf = listByName.concat(listByCode);
                vm.disableInfScroll = true;
            }
        };

        vm.goToCreateNewOrder = function (){
            warehouseOrderService.resetAddedProductList();
            $state.go("app.newWarehouseOrder");
        };


        /**=========================================================
         * Eliminar ordenes de salida
         =========================================================*/
        vm.disableWarehouseOrder = function (warehouseOrderId) {
            ngDialog.openConfirm({
                template: 'disableWarehouseOrderModal',
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: false
            }).then(function (value) {
                warehouseOrderService.disableWarehouseOrder(warehouseOrderId).then(function (response) {
                    var toasterdata;

                    if (response.code === "0") {
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar orden',
                            text: response.message
                        };
                    } else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Orden de salida',
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
                templateUrl: '/addWarehouseOrderModal.html',
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
                templateUrl: '/updateWarehouseOrderModal.html',
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

        // Submit form
        vm.submitForm = function (action) {

            ngDialog.openConfirm({
                template: 'confirmWarehouseOrder',
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: false
            }).then(function (value) {
                addWarehouseOrder();
            }, function (reason) {
                console.log('Modal promise rejected. Reason: ', reason);
            });
        };

        /**=========================================================
         * Agregar ordenes de salida
         =========================================================*/

        function addWarehouseOrder() {

            var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

            var newWarehouseOrder = {
                "username": userInfo.userName,
                "warehouseOrderStateType": APP_CONSTANTS.WAREHOUSE_ORDER_VALIDATED_STATE,
                "warehouseOrderMovementType": vm.warehouseOrderMovementType,
                "warehouseOrderDetails": formatDetails(warehouseOrderService.getAddedProductList())
            };

            warehouseOrderService.resetAddedProductList();

            warehouseOrderService.addWarehouseOrder(newWarehouseOrder).then(function (response) {
                var toasterdata;

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Orden creada',
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

        vm.openAddProductModal = function () {

            var modalInstance = $uibModal.open({
                templateUrl: '/addProductToWarehouseOrderModal.html',
                controller: AddModalInstanceCtrl,
                size: 'lg',
                resolve: {
                    productList: function () {
                        return vm.productList;
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

        AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'productList'];
        function AddModalInstanceCtrl($scope, $uibModalInstance, productList) {

            $scope.selectedProduct = {};

            $scope.modalProductList = productList;

            $scope.selectProduct = function (product) {
                $scope.selectedProduct = product;
            };

            $scope.ok = function () {

                var productLotsTotal = 0;
                var totalQuantity = 0;

                angular.forEach($scope.selectedProduct.productLots, function (value, key) {
                    if(value.addedQuantity !== '' && typeof value.addedQuantity !== 'undefined'){
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

            var tmpList = warehouseOrderService.getAddedProductList();

            var tmpProduct = $filter('filter')(tmpList, {productCode: selectedProduct.productCode })[0];

            if(tmpProduct){

                angular.forEach(tmpProduct.productLots, function (value, key) {

                    angular.forEach(selectedProduct.productLots, function (v, k){
                        if(value.lotNumber === v.lotNumber){
                            value.quantity = v.quantity
                        }
                    });
                });
            }else{

                if(selectedProduct.totalQuantity > 0){
                    tmpList.push(selectedProduct);
                }
            }

            vm.addedProductList = tmpList;
        }

        /**=========================================================
         * Formateo de detalles de orden de salida de bodega
         =========================================================*/

        function formatDetails(list) {
            var formattedList = [];
            angular.forEach(list, function (value) {

                angular.forEach(value.productLots, function (v) {

                    if(typeof v.addedQuantity !== 'undefined'){

                        var item = {
                            'productLotId': v.id,
                            'quantity': v.addedQuantity
                        };
                        formattedList.push(item);
                    }
                });
            });
            return formattedList;
        }

        /**=========================================================
         * Eliminar un producto de la orden de salida
         =========================================================*/

        vm.removeProduct = function (index) {
            warehouseOrderService.removeProduct(index);
        };

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