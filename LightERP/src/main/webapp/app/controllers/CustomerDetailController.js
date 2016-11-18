'use strict';

angular
    .module('app.adminConfig')
    .controller('CustomerDetailController', CustomerDetailController);

CustomerDetailController.$inject = ['$http', '$state', '$stateParams', '$scope', 'customerTypeService',
                                    'identificationTypeService', 'customerService', 'toaster'];
function CustomerDetailController($http, $state, $stateParams, $scope, customerTypeService,
                                  identificationTypeService, customerService, toaster) {
    var vm = this;

    ////////////////
    init();

    function init() {
        $scope.currentCustomer = $stateParams.customer;

        /**=========================================================
         * Tipos de cliente
         =========================================================*/

        customerTypeService.getAll().then(function (response) {
            vm.customerTypeList = response;
        });

        /**=========================================================
         * Tipos de identificacion
         =========================================================*/

        identificationTypeService.getAll().then(function (response) {
            vm.identificationTypeList = response;
        });
    }

    //REGRESA A LA PANTALLA DE LISTA DE CLIENTES
    vm.goBack = function () {
        $state.go('app.thirdPartyMain');
    };


    /**=========================================================
     * Modificar clientes
     =========================================================*/

    vm.updateCustomer = function () {

        var updatedCustomer = {
            "id" : $scope.currentCustomer.id,
            "name": $scope.currentCustomer.name,
            "firstLastName": $scope.currentCustomer.firstLastName,
            "secondLastName": $scope.currentCustomer.secondLastName,
            "identification": $scope.currentCustomer.identification,
            "idDistrict": $scope.currentCustomer.selectedDistrict1,
            "address1": $scope.currentCustomer.address1,
            "address2": $scope.currentCustomer.address2,
            "phoneNumber1": $scope.currentCustomer.phoneNumber1,
            "phoneNumber2": $scope.currentCustomer.phoneNumber2,
            "mobile": $scope.currentCustomer.mobile,
            "website": $scope.currentCustomer.website,
            "email": $scope.currentCustomer.email,
            "discountPercentage": $scope.currentCustomer.discountPercentage,
            "creditLimit": $scope.currentCustomer.creditLimit,
            "identificationType": $scope.currentCustomer.selectedIdentificationType,
            "customerType": $scope.currentCustomer.selectedCustomerType
        };
        console.log(updatedCustomer);
        customerService.updateCustomer(updatedCustomer).then(function (response) {
            var toasterdata;

            if (response.code == "0") {
                toasterdata = {
                    type: 'success',
                    title: 'Cliente',
                    text: response.message
                };
            } else {
                toasterdata = {
                    type: 'warning',
                    title: 'Cliente',
                    text: response.message
                };

            }
            $scope.pop(toasterdata);
        }, function (error) {
            console.log(error);
        });

    };

    $scope.pop = function(toasterdata){
        toaster.pop({
            type: toasterdata.type,
            title : toasterdata.title,
            body: toasterdata.text,
            onHideCallback: function () {
                $state.reload();
            }
        });

    }

}