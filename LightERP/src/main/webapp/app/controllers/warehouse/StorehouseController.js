'use strict';

(function () {
    'use strict';

    angular
        .module('app.storehouse')
        .controller('StorehouseController', StorehouseController);

    StorehouseController.$inject = ['$scope','storehouseService', '$stateParams'];
    function StorehouseController($scope, storehouseService, $stateParams) {
        var vm = this;
        init();

        function init() {

            if($stateParams.tabIndex == 0){
                $scope.tab1 = true;
            }else{
                $scope.tab2 = true;
            }

            /**=========================================================
             * Bodegas
             =========================================================*/

            storehouseService.getAll().then(function (response) {
                vm.storehousesList = response;
            });
        }
    }

})();