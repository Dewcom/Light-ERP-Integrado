/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('AddressController', AddressController);

    AddressController.$inject = ['$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$filter', '$scope'];
    function AddressController($resource, DTOptionsBuilder, DTColumnDefBuilder, $filter, $scope) {
        var vm = this;

        vm.addressesInParent = $scope.modalCtrl.addresses;

        activate();

        ////////////////

        function activate() {

            // Ajax

            // Changing data

            vm.tmpAddresses = [];

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('bFilter', false)
                .withOption('bInfo', false)
                .withOption('bPaginate', false);
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0).notSortable(),
                DTColumnDefBuilder.newColumnDef(1).notSortable(),
                DTColumnDefBuilder.newColumnDef(2).notSortable(),
                DTColumnDefBuilder.newColumnDef(3).notSortable(),
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ];
            vm.address2Add = _buildAddress2Add(1);
            vm.addAddress2Table = addAddress2Table;
            vm.removeTmpAddress = removeTmpAddress;

            function _buildAddress2Add(province, canton, district, address) {
                return {
                    province: province,
                    canton: canton,
                    district: district,
                    address: address
                };
            }

            function addAddress2Table() {
                vm.tmpAddresses.push(angular.copy(vm.address2Add));
                vm.addressesInParent.push(angular.copy(vm.address2Add));

                vm.address2Add = _buildAddress2Add(vm.address2Add.province, vm.address2Add.canton, vm.address2Add.district, vm.address2Add.address);

                vm.address2Add.province = null;
                vm.address2Add.canton = null;
                vm.address2Add.district = null;
                vm.address2Add.address = "";

                console.log($scope.modalCtrl.addresses);
            }

            function removeTmpAddress(index) {
                vm.tmpAddresses.splice(index, 1);

                vm.addressesInParent.splice(index, 1);
                vm.address2Add.province = null;
                vm.address2Add.canton = null;
                vm.address2Add.district = null;
                vm.address2Add.address = "";
            }


            //Distribución territorial
            vm.provinces= [];
            vm.cantons= [];
            vm.districts= [];

            $resource('server/location/provincias.json').query().$promise.then(function(data) {
                vm.provinces = data;
            });

            //Se carga la lista de cantones
            vm.loadCantons = function(pidProvince){

                $resource('server/location/cantones.json').query().$promise.then(function(data) {
                    vm.cantons = $filter('filter')(data, {idProvince: pidProvince });
                });
            };

            //Se carga la lista de distritos
            vm.loadDistricts = function(pidCanton){

                $resource('server/location/distritos.json').query().$promise.then(function(data) {

                    vm.districts = $filter('filter')(data, {idCanton: pidCanton});
                });
            }

        }
    }
})();