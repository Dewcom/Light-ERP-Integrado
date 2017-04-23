'use strict';

angular
    .module('app.client')
    .controller('CustomerDetailController', CustomerDetailController);

CustomerDetailController.$inject = ['$http', '$state', '$stateParams', '$scope', 'customerTypeService',
                                    'identificationTypeService', 'customerService', 'toaster', '$resource',
                                    '$timeout', '$filter'];
function CustomerDetailController($http, $state, $stateParams, $scope, customerTypeService,
                                  identificationTypeService, customerService, toaster, $resource, $timeout, $filter) {
    var vm = this;

    vm.addresses = [];


    ////////////////
    init();

    function init() {
        var customer; customerService.get($stateParams.customerId).then(function (response) {
            console.log(response);

            if (response.code == '0') {

                customer = response.data;

                $scope.currentCustomer = customer;

                $scope.currentCustomer.selectedCustomerType = customer.customerType.id;
                $scope.currentCustomer.selectedIdentificationType = customer.identificationType.id;

                customerService.getAllAddresses($stateParams.customerId).then(function (response) {
                    vm.addresses = response;
                });


     }
        });

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


        //Distribución territorial
        vm.provinces = [];
        vm.cantons = [];
        vm.districts = [];

        $resource('server/location/provincias.json').query().$promise.then(function (data) {
            vm.provinces = data;
        });

        //Se carga la lista de cantones
        vm.loadCantons = function (pidProvince) {
            vm.cantons = [];

            $resource('server/location/cantones.json').query().$promise.then(function (data) {
                var provinceObjList = $filter('filter')(data, {idProvince: pidProvince});

                angular.forEach(provinceObjList, function (value, key) {
                    if (parseInt(value.idProvince) === pidProvince) {
                        vm.cantons.push(value);
                    }
                });
            });
        };

        //Se carga la lista de distritos
        vm.loadDistricts = function (pidCanton) {
            vm.districts = [];

            $resource('server/location/distritos.json').query().$promise.then(function (data) {
                var districtObjList = $filter('filter')(data, {idCanton: pidCanton});

                angular.forEach(districtObjList, function (value, key) {
                    if (value.idCanton == pidCanton) {
                        vm.districts.push(value);
                    }
                });
            });
        };

        /**=========================================================
         * ContactosDelCliente
         =========================================================*/

        customerService.getAllContacts($stateParams.customerId).then(function (response) {
            console.log(response);
            vm.customerContacts = response;
        });

    }

    //REGRESA A LA PANTALLA DE LISTA DE CLIENTES
    vm.goBack = function () {
        $state.go('app.thirdPartyMain');
    };

    //CANCELA LOS CAMBIOS EN PANTALLA
    vm.cancel = function () {
        var toasterdata;

        toasterdata = {
            type: 'info',
            title: 'Cliente',
            text: "Cambios cancelados"
        };

        $scope.pop(toasterdata);
        $timeout(function(){ $scope.callAtTimeout(); }, 3000);
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

    $scope.pop = function(toasterdata){
        toaster.pop({
            type: toasterdata.type,
            title : toasterdata.title,
            body: toasterdata.text
        });
    };

    $scope.callAtTimeout = function(){
        $state.reload();
    };



    //Se formatea la direccion para enviar al BE
    function formatAddreses() {
        var finalAddressList = [];

        angular.forEach(vm.addresses, function (value, key) {
            console.log(value);
            var finalAddressObj = { "id" : value.id, "idDistrict": value.district.idDistrict, "address":value.address};
            finalAddressList.push(finalAddressObj);
        });

        return finalAddressList;

    }
}