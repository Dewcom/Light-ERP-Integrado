'use strict';

(function() {
    'use strict';

    angular
        .module('app.bill')
        .controller('BillController', BillController);

    BillController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', 'billService', 'customerService', 'productService', '$scope'];
    function BillController(DTOptionsBuilder, DTColumnDefBuilder, billService, customerService, productService, $scope) {
        var vm = this;

        var language = {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
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

        init();

        ////////////////

        function init() {

            /**=========================================================
             * Facturas
             =========================================================*/

            billService.getAll().then(function(response) {
                console.log(response);
                vm.billList = response;
            });

            /**=========================================================
             * Clientes
             =========================================================*/

            customerService.getAll().then(function(response) {
                console.log(response);
                vm.customerList = response;
            });

            /**=========================================================
             * Productos
             =========================================================*/

            productService.getAll().then(function(response) {
                vm.productList = response;
            });


            /**=========================================================
             * Datatable clientes
             =========================================================*/

            vm.dtOptionsCustomers = DTOptionsBuilder.newOptions()
                .withOption('bFilter', true)
                .withOption('bInfo', false)
                .withOption('bPaginate', false)
                .withOption('bLengthChange', false)
                .withLanguage(language);
            vm.dtColumnDefsCustomers = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];


            /**=========================================================
             * Datatable productos
             =========================================================*/

            vm.dtOptionsProducts = DTOptionsBuilder.newOptions()
                .withOption('bFilter', true)
                .withOption('bInfo', false)
                .withOption('bPaginate', false)
                .withOption('bLengthChange', false)
                .withLanguage(language);
            vm.dtColumnDefsProducts = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2).notSortable()
            ];

            /**=========================================================
             * Escoger el cliente de la factura
             =========================================================*/

            vm.chooseCustomer = function (chosenCustomer) {
                console.log(chosenCustomer);
                $scope.chosenCustomer = JSON.parse(JSON.stringify(chosenCustomer));
            };

            /**=========================================================
             * Eliminar facturas
             =========================================================*/
            vm.disableBill = function (billId) {
                ngDialog.openConfirm({
                    template: 'disableBillModal',
                    className: 'ngdialog-theme-default',
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function (value) {
                    billService.disableBill(billId).then(function (response) {
                        var toasterdata;
                        console.log(response);

                        if(response.code == "0"){
                            toasterdata = {
                                type: 'success',
                                title: 'Eliminar factura',
                                text: response.message
                            };
                        }else{
                            toasterdata = {
                                type: 'warning',
                                title: 'Factura',
                                text: response.message
                            };

                        }
                        pop(toasterdata);
                        init();
                    },function (error) {
                        console.log(error);
                    });
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });
            };

            /**=========================================================
             * Module: modals
             =========================================================*/

            vm.openAddModal = function () {

                var modalInstance = $uibModal.open({
                    templateUrl: '/addBillModal.html',
                    controller: AddModalInstanceCtrl,
                    size: 'md',
                    backdrop: 'static', // No cierra clickeando fuera
                    keyboard: false // No cierra con escape
                });

                var state = $('#modal-state');
                modalInstance.result.then(function () {
                    state.text('Modal dismissed with OK status');
                }, function () {
                    state.text('Modal dismissed with Cancel status');
                });
            };

            vm.openUpdateModal = function (billObj) {

                var modalInstance = $uibModal.open({
                    templateUrl: '/updateBillModal.html',
                    controller: UpdateModalInstanceCtrl,
                    size: 'md',
                    resolve: {
                        user: function () {
                            return billObj;
                        }
                    },
                    backdrop: 'static', // No cierra clickeando fuera
                    keyboard: false // No cierra con escape
                });

                var state = $('#modal-state');
                modalInstance.result.then(function () {
                    state.text('Modal dismissed with OK status');
                }, function () {
                    state.text('Modal dismissed with Cancel status');
                });
            };


           /* /!**=========================================================
             * Validación de campos y patrones
             =========================================================*!/
            vm.submitted = false;
            vm.validateInput = function(action , name, type) {
                if(action == 'add'){
                    var input = vm.userForm[name];
                    return (input.$dirty || vm.submitted) && input.$error[type];

                }else if(action == 'modify'){
                    var input = vm.modifyUserForm[name];
                    return (input.$dirty || vm.submitted) && input.$error[type];
                }
            };

            // Submit form
            vm.submitForm = function(action) {
                vm.submitted = true;

                if(action == 'add'){
                    if (vm.userForm.$valid) {
                        addUser();
                    } else {
                        console.log('Not valid!!');
                        return false;
                    }

                }else if(action == 'modify'){
                    if (vm.modifyUserForm.$valid) {
                        updateUser();
                    } else {
                        console.log('Not valid!!');
                        return false;
                    }

                }
            };*/

            /**=========================================================
             * Agregar facturas
             =========================================================*/

            function addBill() {

                /*var newUser ={
                    "username":$scope.addUserForm.username,
                    "password":$scope.addUserForm.password,
                    "userCode":$scope.addUserForm.userCode,
                    "name":$scope.addUserForm.name ,
                    "firstLastName":$scope.addUserForm.firstLastName,
                    "secondLastName":$scope.addUserForm.secondLastName,
                    "phoneNumber":$scope.addUserForm.phoneNumber,
                    "extension":$scope.addUserForm.extension,
                    "mobile":$scope.addUserForm.mobile,
                    "email":$scope.addUserForm.email,
                    "commissionPercentage":parseFloat($scope.addUserForm.commissionPercentage)
                };
                console.log(newUser);
                billService.addUser(newUser).then(function (response) {
                    var toasterdata;

                    if(response.code == "0"){
                        toasterdata = {
                            type: 'success',
                            title: 'Agregar usuario',
                            text: response.message
                        };
                    }else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Usuario',
                            text: response.message
                        };

                    }
                    pop(toasterdata);
                    $timeout(function(){ callAtTimeout(); }, 3000);
                },function (error) {
                    console.log(error);
                });

                $scope.cancel();*/
            }

            /**=========================================================
             * Modificar facturas
             =========================================================*/

            function updateBill() {

               /* var updatedUser={
                    "id":$scope.currentUser.id,
                    "username":$scope.currentUser.username,
                    "password":$scope.currentUser.password,
                    "userCode":$scope.currentUser.userCode,
                    "name":$scope.currentUser.name ,
                    "firstLastName":$scope.currentUser.firstLastName,
                    "secondLastName":$scope.currentUser.secondLastName,
                    "phoneNumber":$scope.currentUser.phoneNumber,
                    "extension":$scope.currentUser.extension,
                    "mobile":$scope.currentUser.mobile,
                    "email":$scope.currentUser.email,
                    "commissionPercentage":$scope.currentUser.commissionPercentage
                };
                console.log(updatedUser);
                billService.updateUser(updatedUser).then(function (response) {
                    var toasterdata;

                    if(response.code == "0"){
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar usuario',
                            text: response.message
                        };
                    }else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Usuario',
                            text: response.message
                        };

                    }
                    pop(toasterdata);
                    $timeout(function(){ callAtTimeout(); }, 3000);
                },function (error) {
                    console.log(error);
                });

                $scope.cancel();*/
            }

            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
            function AddModalInstanceCtrl($scope, $uibModalInstance) {
                var vm = this;


                $scope.close = function () {
                    $uibModalInstance.close('closed');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }

            UpdateModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'user'];
            function UpdateModalInstanceCtrl($scope, $uibModalInstance, user) {
                var vm = this;

                $scope.currentUser = JSON.parse(JSON.stringify(user));

                $scope.close = function () {
                    $uibModalInstance.close('closed');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        }


        function pop(toasterdata){
            toaster.pop({
                type: toasterdata.type,
                title : toasterdata.title,
                body: toasterdata.text
            });
        }

        function callAtTimeout(){
            $state.reload();
        }
    }

})();