'use strict';

angular
    .module('app.services')
    .factory("warehouseOrderService", function ($http, $state, $filter, APP_CONSTANTS) {

        var warehouseOrderService = {};
        var addedProductList = [];

        warehouseOrderService.getAddedProductList = function () {
            return addedProductList;
        };

        warehouseOrderService.resetAddedProductList = function () {
            addedProductList = [];
        };

        warehouseOrderService.removeProduct = function (index) {
            addedProductList.splice(index, 1);
        };

        warehouseOrderService.getAll = function () {

            var warehouseOrderList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'warehouseOrder/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return warehouseOrderList;
        };

        warehouseOrderService.get = function (warehouseOrderId) {

            var warehouseOrder = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'warehouseOrder/get?id=' + warehouseOrderId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                addedProductList = formatWarehouseOrderDetails(response.data.data.warehouseOrderDetails);

                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return warehouseOrder;
        };

        warehouseOrderService.addWarehouseOrder= function (newWarehouseOrder) {
            var addWarehouseOrderResult = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'warehouseOrder/create',
                data: {
                    warehouseOrder: newWarehouseOrder
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return addWarehouseOrderResult;
        };

        warehouseOrderService.updateWarehouseOrder = function (updatedWarehouseOrder) {

            var updatedWarehouseOrderResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'warehouseOrder/update',
                data: {
                    updatedWarehouseOrder : updatedWarehouseOrder
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return updatedWarehouseOrderResult;
        };

        warehouseOrderService.approveWarehouseOrder = function(id){

            var approveWarehouseOrderResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'warehouseOrder/approveWarehouseOrder',
                data: {
                    id: id
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return approveWarehouseOrderResult;

        };

        warehouseOrderService.rejectWarehouseOrder = function(rejectOrderObj){

            var rejectWarehouseOrderResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'warehouseOrder/rejectWarehouseOrder',
                data: rejectOrderObj,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return rejectWarehouseOrderResult;

        };

        warehouseOrderService.disableWarehouseOrder = function (warehouseOrderId) {

            var disableWarehouseOrderResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'warehouseOrder/delete',
                data: {
                    id: warehouseOrderId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return disableWarehouseOrderResult;
        };

        warehouseOrderService.getAllWarehouseOrderMovementsTypes = function () {

            var warehouseOrderMovementsTypes = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'warehouseOrderMovementType/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return warehouseOrderMovementsTypes;
        };





        /**=========================================================
         * Formateo de detalles de orden de salida de bodega
         =========================================================*/

        function formatWarehouseOrderDetails(list) {
            warehouseOrderService.resetAddedProductList();

            var formattedList;
            var listLength = list.length;
            var firstProductLot = {};

            var firstItem = list[0].productLot.product;
            firstItem.productLots = [];

            firstItem.productLotsTotal = 1;
            firstItem.totalQuantity = parseInt(list[0].quantity);
            firstProductLot.id = list[0].productLot.id;
            firstProductLot.addedQuantity = list[0].quantity;

            firstItem.productLots.push(firstProductLot);

            formattedList = warehouseOrderService.getAddedProductList();

            formattedList.push(firstItem);

            for(var i = 1; i < listLength; i++){
                var tmpProduct = $filter('filter')(formattedList, {productCode: list[i].productLot.product.productCode })[0];

                if(tmpProduct){
                    var tmpProductLot = {};
                    tmpProductLot.id = list[i].productLot.id;
                    tmpProductLot.addedQuantity = list[i].quantity;

                    tmpProduct.totalQuantity += list[i].quantity;
                    tmpProduct.productLotsTotal ++;
                    tmpProduct.productLots.push(tmpProductLot);

                }else{
                    var newItem = list[i].productLot.product;
                    newItem.productLots = [];
                    var tmpProductLot = {};

                    tmpProductLot.id = list[i].productLot.id;
                    tmpProductLot.addedQuantity = list[i].quantity;

                    newItem.productLotsTotal = 1;
                    newItem.totalQuantity = parseInt(list[i].quantity);
                    newItem.productLots.push(tmpProductLot);

                    formattedList.push(newItem);
                }
            }

            return formattedList;
        }

        return warehouseOrderService;

    });