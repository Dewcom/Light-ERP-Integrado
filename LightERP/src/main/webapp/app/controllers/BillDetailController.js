'use strict';

angular
    .module('app.bill')
    .controller('BillDetailController', BillDetailController);

BillDetailController.$inject = ['$http', '$state', '$stateParams', '$scope', 'billService'];
function BillDetailController($http, $state, $stateParams, $scope, billService) {
    var vm = this;


    ////////////////
    init();

    function init() {
        console.log($stateParams.billId);
        var bill;
        billService.get($stateParams.billId).then(function (response) {
            console.log(response);

            if (response.code == '0') {

                bill = response.data;

                $scope.currentBill = bill;
            }
        });

    }

    //REGRESA A LA PANTALLA DE LISTA DE FACTURAS
    vm.goBack = function () {
        $state.go('app.billingMain');
    };

    //CANCELA LOS CAMBIOS EN PANTALLA
    vm.cancel = function () {
        var toasterdata;

        toasterdata = {
            type: 'info',
            title: 'Factura',
            text: "Cambios cancelados"
        };

        $scope.pop(toasterdata);
        $timeout(function () {
            $scope.callAtTimeout();
        }, 3000);
    };


    /**=========================================================
     * Modificar clientes
     =========================================================*/

    vm.updateCustomer = function () {
        var updatedCustomer = {
            "id": $scope.currentCustomer.id,
            "name": $scope.currentCustomer.name,
            "firstLastName": $scope.currentCustomer.firstLastName,
            "secondLastName": $scope.currentCustomer.secondLastName,
            "identification": $scope.currentCustomer.identification,
            "addresses": formatAddreses(),
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

    $scope.pop = function (toasterdata) {
        toaster.pop({
            type: toasterdata.type,
            title: toasterdata.title,
            body: toasterdata.text
        });
    };

    $scope.callAtTimeout = function () {
        $state.reload();
    };
}