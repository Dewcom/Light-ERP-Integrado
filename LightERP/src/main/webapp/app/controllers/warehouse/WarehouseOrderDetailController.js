'use strict';

(function () {
    'use strict';

    angular
        .module('app.warehouse')
        .controller('WarehouseOrderDetailController', WarehouseOrderDetailController);

    WarehouseOrderDetailController.$inject = ['warehouseOrderService', '$state', '$scope', 'APP_CONSTANTS', '$stateParams', 'billService',
        'ngDialog', '$filter', 'toaster', '$timeout'];
    function WarehouseOrderDetailController(warehouseOrderService, $state, $scope, APP_CONSTANTS, $stateParams, billService, ngDialog,
                                            $filter, toaster, $timeout) {
        var vm = this;
        $scope.globalConstants = APP_CONSTANTS;

        init();

        function init() {

            warehouseOrderService.get($stateParams.warehouseOrderId).then(function (response) {

                if (response.code === '0') {

                    var sortedProductDetailList = $filter('orderBy')(response.data.warehouseOrderDetails, 'productLot.product.lotNumber');
                    sortedProductDetailList = $filter('orderBy')(sortedProductDetailList, 'productLot.product.productCode');

                    response.data.warehouseOrderDetails = sortedProductDetailList;
                    $scope.currentWarehouseOrder = response.data;
                    formatWarehouseOrderNumber();
                }


                if($scope.currentWarehouseOrder.bill.address != null){
                    billService.getAddressInfo($scope.currentWarehouseOrder.bill.address, function (addressInfo) {
                        $scope.currentWarehouseOrder.bill.address = addressInfo;
                    });
                }
            });

        }


        /**=========================================================
         * Formatea el numero de orden para que muestre 6 caracteres
         =========================================================*/

        function formatWarehouseOrderNumber () {
            console.log($scope.currentWarehouseOrder);
            var formatedWarehouseOrderNumber = "OS";
            var zerosNeeded = 4 - parseInt($scope.currentWarehouseOrder.id.toString().length);

            for (var i = 0; i < zerosNeeded; i++) {
                formatedWarehouseOrderNumber = formatedWarehouseOrderNumber.concat("0");
            }

            formatedWarehouseOrderNumber = formatedWarehouseOrderNumber.concat($scope.currentWarehouseOrder.id);

            $scope.formatedWarehouseOrderNumber = formatedWarehouseOrderNumber;

        }

        //REGRESA A LA PANTALLA DE LISTA DE FACTURAS
        vm.goBack = function () {
            var params = {tabIndex: 2, storehouseId : 1};
            $state.go('app.storehouseDetail', params);
        };

        /**=========================================================
         * Aprobar orden de salida de bodega
         =========================================================*/

        vm.approveWarehouseOrder = function (currentWarehouseOrder) {

            warehouseOrderService.approveWarehouseOrder(currentWarehouseOrder.id).then(function (response) {
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
         * Formateo de informacion de facturas
         =========================================================*/

        function formatWarehouseOrderDetails(list) {
            var formattedList = [];

            angular.forEach(list, function (value) {

                var item = {
                    'productLotId': value.productLot.id,
                    'quantity': value.quantity
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
    }

})();