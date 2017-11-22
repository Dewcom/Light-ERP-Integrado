'use strict';

angular
    .module('app.productLot')
    .controller('ProductLotController', ProductLotController);

ProductLotController.$inject = ['$scope', '$stateParams', 'APP_CONSTANTS'];
function ProductLotController($scope, $stateParams, APP_CONSTANTS) {
    var vm = this;
    $scope.globalConstants = APP_CONSTANTS;

    var storehouseProdList;
    ////////////////
    init();

    function init() {
        console.log($stateParams.filteredProductLotList);
        vm.currentProduct = $stateParams.filteredProductLotList[0].product;
        vm.productLotList = $stateParams.filteredProductLotList;
    }

}