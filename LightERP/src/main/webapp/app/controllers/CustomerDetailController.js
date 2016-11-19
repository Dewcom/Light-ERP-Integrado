'use strict';

angular
    .module('app.adminConfig')
    .controller('CustomerDetailController', CustomerDetailController);

CustomerDetailController.$inject = ['$http', '$state', '$stateParams', '$scope', 'customerTypeService',
                                    'identificationTypeService', 'customerService', 'toaster', '$resource', '$filter'];
function CustomerDetailController($http, $state, $stateParams, $scope, customerTypeService,
                                  identificationTypeService, customerService, toaster, $resource, $filter) {
    var vm = this;

    ////////////////
    init();

    function init() {
        var customer = $stateParams.customer;

        $scope.currentCustomer = customer;

        console.log(customer);
        $scope.currentCustomer.selectedCustomerType = customer.customerType.id;
        $scope.currentCustomer.selectedIdentificationType = customer.identificationType.id;

        $resource('server/location/distritos.json').query().$promise.then(function(data) {
            var districtObjList = $filter('filter')(data, {idDistrict: customer.idDistrict });

            var notFound = true;
            do{
                angular.forEach(districtObjList, function (value, key) {
                    if(parseInt(value.idDistrict) === customer.idDistrict ){
                        $scope.currentCustomer.selectedProvince1 = parseInt(value.idProvince);

                        vm.loadCantons(parseInt(value.idProvince));
                        $scope.currentCustomer.selectedCanton1 = value.idCanton;

                        vm.loadDistricts(parseInt(value.idCanton));
                        $scope.currentCustomer.selectedDistrict1 = value.idDistrict;

                        notFound = false;
                    }
                });

            }while(notFound);

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
        vm.provinces= [];
        vm.cantons= [];
        vm.districts= [];

        $resource('server/location/provincias.json').query().$promise.then(function(data) {
            vm.provinces = data;
        });

        //Se carga la lista de cantones
        vm.loadCantons = function(pidProvince){
            vm.cantons = [];

            $resource('server/location/cantones.json').query().$promise.then(function(data) {
                var provinceObjList= $filter('filter')(data, {idProvince: pidProvince });

                angular.forEach(provinceObjList, function (value, key) {
                    if(parseInt(value.idProvince) === pidProvince ){
                        vm.cantons.push(value);
                    }
                });
            });
        };

        //Se carga la lista de distritos
        vm.loadDistricts = function(pidCanton){
            vm.districts = [];

            $resource('server/location/distritos.json').query().$promise.then(function(data) {
                var districtObjList= $filter('filter')(data, {idCanton: pidCanton });

                angular.forEach(districtObjList, function (value, key) {
                    if(value.idCanton == pidCanton ){
                        vm.districts.push(value);
                    }
                });
            });
        };
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
            "idDistrict": parseInt($scope.currentCustomer.selectedDistrict1),
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