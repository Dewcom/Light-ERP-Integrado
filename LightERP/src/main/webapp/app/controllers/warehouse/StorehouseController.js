'use strict';

(function () {
    'use strict';

    angular
        .module('app.storehouse')
        .controller('StorehouseController', StorehouseController);

    StorehouseController.$inject = ['storehouseService'];
    function StorehouseController(storehouseService) {
        var vm = this;
        init();

        function init() {

            /**=========================================================
             * Bodegas
             =========================================================*/

            storehouseService.getAll().then(function (response) {
                console.log(response);
                vm.storehousesList = response;
            });
        }
    }

})();