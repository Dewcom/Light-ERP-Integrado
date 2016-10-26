'use strict';

angular
    .module('app.adminConfig')
    .controller('AdminConfigController', AdminConfigController);

AdminConfigController.$inject = ['$http', '$state', 'customerTypeService'];
function AdminConfigController($http, $state, customerTypeService) {
    var vm = this;
    var customerTypes;

    ////////////////
    init();

    function init() {
        customerTypeService.getAl
        l().then(function(response) {
            vm.customerTypes = response;
        });
    }

    vm.disableCustomerType = function(customerTypeId){
        customerTypeService.disableCustomerType(customerTypeId).then(function(response) {
            init();
        });
    }


}