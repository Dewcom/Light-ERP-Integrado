'use strict';

angular
    .module('app.storehouse')
    .controller('StorehouseDetailController', StorehouseDetailController);

StorehouseDetailController.$inject = ['$uibModal', '$http', '$state', '$stateParams', '$scope', 'storehouseService', 'APP_CONSTANTS', 'usSpinnerService', '$filter'];
function StorehouseDetailController($uibModal, $http, $state, $stateParams, $scope, storehouseService, APP_CONSTANTS, usSpinnerService, $filter) {
    var vm = this;
    $scope.globalConstants = APP_CONSTANTS;

    var storehouseProdList;
    ////////////////
    init();

    function init() {

        var storehouse;
        storehouseService.get($stateParams.storehouseId).then(function (response) {

            if (response.code == '0') {
                vm.currentStorehouse = response.data;
                formatStorehouseProductList(response.data.productLots);
                usSpinnerService.stop('productsSpinner');
            }
        });

    }

    //REGRESA AL DASHBOARD DE BODEGAS
    vm.goBack = function () {
        var params = {tabIndex: 1};
        $state.go('app.warehouseMain', params);
    };

    vm.loadMoreProducts = function() {
        vm.storehouseProdListInf = vm.storehouseProdList.slice(0, vm.storehouseProdListInf.length + 10);
    };

    vm.goToProductLotDetail = function(productObj) {
        // Filtra la lista de lotes por producto
        var filteredProductLotList = vm.currentStorehouse.productLots.filter(function (productLot) {
            return (productLot.product.productCode == productObj.productCode);
        });
        $state.go('app.productLotDetail', {filteredProductLotList : filteredProductLotList});
    };

    vm.filterProducts = function(){
        vm.storehouseProdListInf = vm.storehouseProdList

        if(vm.search == undefined || vm.search == ''){
            vm.storehouseProdListInf = vm.storehouseProdList.slice(0,10);
            vm.disableInfScroll = false;
        }else{
            var listByCode = $filter('filter')(vm.storehouseProdList, {productCode: vm.search });
            var listByName = $filter('filter')(vm.storehouseProdList, {name: vm.search });
            vm.storehouseProdListInf = listByName.concat(listByCode);
            vm.disableInfScroll = true;
        }
    };

    function formatStorehouseProductList(productLotList){

        var formatProductLotList = [];

        angular.forEach(productLotList, function (productLotListValue, productLotListKey) {
            var itemFound = false;

            var item = {"productCode": productLotListValue.product.productCode,
                "name": productLotListValue.product.name,
                "measureUnit": productLotListValue.product.measureUnit.symbol,
                "productType": productLotListValue.product.productType.name,
                "lotTotal": 1,
                "productTotal": productLotListValue.quantity,
                "productObj": productLotListValue.product};

            if(formatProductLotList.length > 0){
                angular.forEach(formatProductLotList, function (value, key) {
                    if(value.productCode === item.productCode){
                        value.lotTotal ++;
                        value.productTotal += productLotListValue.quantity;

                        itemFound = true;
                    }
                });

                if(!itemFound){
                    formatProductLotList.push(item);
                }

            }else{
                formatProductLotList.push(item);
            }
        });

        formatProductLotList.sort(function(a, b){
            if(a.productCode < b.productCode) return -1;
            if(a.productCode > b.productCode) return 1;
            return 0;
        });

        vm.storehouseProdList = formatProductLotList;
        vm.storehouseProdListInf = vm.storehouseProdList.slice(0,10);

    }
}