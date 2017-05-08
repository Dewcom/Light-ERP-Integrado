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

        var language = {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "", //Se deja en blanco para que no muestre el label de datos vacios
            "sEmptyTable":     "", //Se deja en blanco para que no muestre el label de tabla vacia
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        };


        activate();

        ////////////////

        function activate() {

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('bFilter', false)
                .withOption('bInfo', false)
                .withOption('bPaginate', false)
                .withOption('bLengthChange', false)
                .withLanguage(language);
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0).notSortable().withOption('width', '20%').withOption('className', 'dt-body-center'),
                DTColumnDefBuilder.newColumnDef(1).notSortable().withOption('width', '20%').withOption('className', 'dt-body-center'),
                DTColumnDefBuilder.newColumnDef(2).notSortable().withOption('width', '20%').withOption('className', 'dt-body-center'),
                DTColumnDefBuilder.newColumnDef(3).notSortable().withOption('width', '30%').withOption('className', 'dt-body-center'),
                DTColumnDefBuilder.newColumnDef(4).notSortable().withOption('width', '10%').withOption('className', 'dt-body-center')
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
                vm.addressesInParent = $scope.parentController.addresses;
                vm.addressesInParent.push(angular.copy(vm.address2Add));
                vm.address2Add = _buildAddress2Add(vm.address2Add.province, vm.address2Add.canton, vm.address2Add.district, vm.address2Add.address);

                vm.address2Add.province = null;
                vm.address2Add.canton = null;
                vm.address2Add.district = null;
                vm.address2Add.address = "";

                console.log($scope.parentController.addresses);
            }

            function removeTmpAddress(index) {
                vm.addressesInParent = $scope.parentController.addresses;

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
                vm.cantons= [];

                $resource('server/location/cantones.json').query().$promise.then(function(data) {
                    var tmpList = $filter('filter')(data, {idProvince: pidProvince });

                    angular.forEach(tmpList, function (value) {
                        if (parseInt(value.idProvince) === pidProvince) {
                            vm.cantons.push(value);
                        }
                    });
                });
            };

            //Se carga la lista de distritos
            vm.loadDistricts = function(pidCanton){
            vm.districts= [];

                $resource('server/location/distritos.json').query().$promise.then(function(data) {

                    var tmpList = $filter('filter')(data, {idCanton: pidCanton});

                    angular.forEach(tmpList, function (value) {

                        console.log(value);
                        if (value.idCanton === pidCanton) {
                            vm.districts.push(value);

                            console.log(vm.districts);
                        }
                    });

                    console.log(vm.districts);
                });
            };
        }
    }
})();