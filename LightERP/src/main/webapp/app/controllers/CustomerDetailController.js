'use strict';

angular
    .module('app.adminConfig')
    .controller('CustomerDetailController', CustomerDetailController);

CustomerDetailController.$inject = ['$http', '$state', '$stateParams', '$scope', 'customerTypeService', 'identificationTypeService'];
function CustomerDetailController($http, $state, $stateParams, $scope, customerTypeService, identificationTypeService) {
    var vm = this;
    var test;

    ////////////////
    init();

    function init() {
        $scope.currentCustomer = $stateParams.customer;
        test = $stateParams.customer;

        /**=========================================================
         * Tipos de cliente
         =========================================================*/

        customerTypeService.getAll().then(function(response) {
            vm.customerTypeList = response;
        });

        /**=========================================================
         * Tipos de identificacion
         =========================================================*/

        identificationTypeService.getAll().then(function(response) {
            vm.identificationTypeList = response;
        });
    }

    //REGRESA A LA PANTALLA DE LISTA DE CLIENTES
    vm.goBack = function() {
        $state.go('app.thirdPartyMain');
    };

}