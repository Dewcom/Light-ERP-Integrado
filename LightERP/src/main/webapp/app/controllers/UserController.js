'use strict';

(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['$uibModal','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder','userService'
        ,'toaster', '$state', '$filter', '$timeout', 'ngDialog', '$scope'];
    function UserController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, userService,
                            toaster, $state, $filter, $timeout, ngDialog, $scope) {
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
             * Usuarios
             =========================================================*/

            userService.getAll().then(function(response) {
                console.log(response);
                vm.userList = response;
            });

            /**=========================================================
             * Datatables
             =========================================================*/

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withLanguage(language)
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3),
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ];


            /**=========================================================
             * Eliminar usuarios
             =========================================================*/
            vm.disableUser = function (userId) {
                ngDialog.openConfirm({
                    template: 'disableUserModal',
                    className: 'ngdialog-theme-default',
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function (value) {
                    userService.disableUser(userId).then(function (response) {
                        var toasterdata;
                        console.log(response);

                        if(response.code == "0"){
                            toasterdata = {
                                type: 'success',
                                title: 'Eliminar usuario',
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
                    templateUrl: '/addUserModal.html',
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

            vm.openUpdateModal = function (userObj) {

                var modalInstance = $uibModal.open({
                    templateUrl: '/updateUserModal.html',
                    controller: UpdateModalInstanceCtrl,
                    size: 'md',
                    resolve: {
                        user: function () {
                            userObj.passwordConfirm = userObj.password
                            return userObj;
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


            /**=========================================================
             * Validación de campos y patrones
             =========================================================*/
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
            };

            /**=========================================================
             * Agregar usuarios
             =========================================================*/

            function addUser() {

                var newUser ={
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
                userService.addUser(newUser).then(function (response) {
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

                $scope.cancel();
            };

            /**=========================================================
             * Modificar usuarios
             =========================================================*/

            function updateUser() {

                var updatedUser={
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
                userService.updateUser(updatedUser).then(function (response) {
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

                $scope.cancel();
            };

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