'use strict';

angular
    .module('app.adminConfig')
    .controller('AdminConfigController', AdminConfigController);

AdminConfigController.$inject = ['$http', '$state', 'customerTypeService', 'configService', 'APP_CONSTANTS', 'toaster', '$scope', '$timeout'];
function AdminConfigController($http, $state, customerTypeService, configService, APP_CONSTANTS, toaster, $scope, $timeout) {
    var vm = this;

    init();

    function init() {

        getAllCustomerTypes();
        getExchangeRateByCode(APP_CONSTANTS.TIPO_CAMBIO_DOLAR);
        vm.submitted = false;
        vm.validateInput = function(name, type) {
            var input = vm.exchangeConfigForm[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
        };

        // Submit form
        vm.submitForm = function () {
            vm.submitted = true;
                if (vm.exchangeConfigForm.$valid) {
                    updateExchangeRate(APP_CONSTANTS.TIPO_CAMBIO_DOLAR, vm.exchangeRateValue);
                    console.log('leoTEst')
                } else {
                    return false;
                }
        };
    }


    /**=========================================================
     * Modificar tipoCambio
     =========================================================*/

    function updateExchangeRate(code, value) {
        configService.updateExchangeRateByCode(code, value).then(function (response) {
            var toasterdata;
            if (response.code == "0") {
                toasterdata = {
                    type: 'success',
                    title: 'Modificar tipo cambio',
                    text: response.message
                };
            } else {
                toasterdata = {
                    type: 'warning',
                    title: 'Modificar tipo cambio',
                    text: response.message
                };
            }
            pop(toasterdata);
            $timeout(function () {
                callAtTimeout();
            }, 3000);
        }, function (error) {
            console.log(error);
        });
    };

    function getExchangeRateByCode(code){
        configService.getExchangeRateByCode(code).then(function(response) {
            vm.exchangeRateValue = response.value;
        });
    }

    function getAllCustomerTypes(){
        customerTypeService.getAll().then(function(response) {
            vm.customerTypes = response;
        });

    }

    vm.disableCustomerType = function(customerTypeId){
        customerTypeService.disableCustomerType(customerTypeId).then(function(response) {
            getAllCustomerTypes();
        });
    }

    function callAtTimeout() {
        $state.reload();
    }

    function pop(toasterdata) {
        toaster.pop({
            type: toasterdata.type,
            title: toasterdata.title,
            body: toasterdata.text
        });
    }
}