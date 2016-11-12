'use strict';

angular
    .module('app.adminConfig')
    .controller('CustomerDetailController', CustomerDetailController);

CustomerDetailController.$inject = ['$http', '$state', '$stateParams', '$scope'];
function CustomerDetailController($http, $state, $stateParams, $scope) {
    var vm = this;

    ////////////////
    init();

    function init() {
        console.log($stateParams.customer);
        $scope.currentCustomer = $stateParams.customer;
    }



}