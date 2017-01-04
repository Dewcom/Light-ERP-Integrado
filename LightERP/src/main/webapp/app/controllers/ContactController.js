'use strict';

(function() {
    'use strict';

    angular
        .module('app.client')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$uibModal','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        'contactService','$state', 'toaster', 'ngDialog', '$timeout'];
    function ContactController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, contactService, $state, toaster, ngDialog, $timeout) {
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
        }

        init();

        ////////////////

        function init() {


            /**=========================================================
             * Datatables
             =========================================================*/

            // Ajax

            contactService.getAll().then(function(response) {
                vm.contactList = response;
                console.log(response);
            });

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withLanguage(language)
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3),
                DTColumnDefBuilder.newColumnDef(4)
            ];
        }


        /**=========================================================
         * Module: modals
         =========================================================*/

        vm.open = function (size,object, template) {
            var modalInstance = $uibModal.open({
                templateUrl: template,
                controller: ModalInstanceCtrl,
                resolve: {
                    contact: function () {
                        return object;
                    }
                },
                size: size,
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

        // Please note that $uibModalInstance represents a modal window (instance) dependency.
        // It is not the same as the $uibModal service used above.

        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'contact'];
        function ModalInstanceCtrl($scope, $uibModalInstance,contact) {
            $scope.currentContact = contact;
            $scope.contactToUpdate = new Contact(contact.name, contact.firstLastName, contact.secondLastName, contact.email, contact.phoneNumber1, contact.phoneNumber2, contact.jobTitle, contact.department, contact.mobile);
            console.log('new contact');
            console.log($scope.contactToUpdate);

            $scope.close = function () {
                $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            /**=========================================================
             * modificar contacto
             =========================================================*/
            $scope.updateContact = function () {

                var updatedContact = {
                    "id" : $scope.currentContact.id,
                    "name": $scope.contactToUpdate.name,
                    "firstLastName": $scope.contactToUpdate.firstLastName,
                    "secondLastName": $scope.contactToUpdate.secondLastName,
                    "email": $scope.contactToUpdate.email,
                    "phoneNumber1": $scope.contactToUpdate.phoneNumber1,
                    "phoneNumber2": $scope.contactToUpdate.phoneNumber2,
                    "jobTitle": $scope.contactToUpdate.jobTitle,
                    "department": $scope.contactToUpdate.department,
                    "mobile": $scope.contactToUpdate.mobile
                };
                console.log('CONTACTO A MODIFICAR');
                console.log(updatedContact);
                contactService.updateContact(updatedContact).then(function (response) {
                    var toasterdata;

                    if (response.code == "0") {
                        toasterdata = {
                            type: 'success',
                            title: 'Contacto',
                            text: response.message
                        };
                    } else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Contacto',
                            text: response.message
                        };

                    }

                    $timeout(function(){ pop(toasterdata); }, 1000);
                    $state.reload();

                    //activate contacts tab
                    $scope.infoTabActivated = false;
                    $scope.contactsTabActivated = true
                }, function (error) {
                    console.log(error);
                });
                $uibModalInstance.close('closed');
            };


        }

        /**=========================================================
         * Eliminar contacto
         =========================================================*/
        vm.disableContact = function (contactId) {
            ngDialog.openConfirm({
             template: 'disableContactModal',
             className: 'ngdialog-theme-default',
             closeByDocument: false,
             closeByEscape: false
             }).then(function (value) {
             contactService.disableContact(contactId).then(function (response) {
             var toasterdata;
             console.log(response);

             if(response.code == "0"){
             toasterdata = {
             type: 'success',
             title: 'Eliminar Contacto',
             text: response.message
             };
             }else{
             toasterdata = {
             type: 'warning',
             title: 'Contacto',
             text: response.message
             };

             }
                 $timeout(function(){ pop(toasterdata); }, 1000);
                 $state.reload();

             },function (error) {
             console.log(error);
             });
             }, function (reason) {
             console.log('Modal promise rejected. Reason: ', reason);
             });
        };

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

        //defaultContructor
       /* var Contact = function(){
            this.name = "";
            this.firstLastName = "";
            this.secondLastName = "";
            this.email = "";
            this.phoneNumber1 = "";
            this.phoneNumber2 = "";
            this.jobTitle = "";
            this.department = "";
            this.mobile = "";
        }*/

        //defaultContructor
        var Contact = function(name, firstLastName, secondLastName, email, phoneNumber1, phoneNumber2, jobTitle, department, mobile){
            this.name = name;
            this.firstLastName = firstLastName;
            this.secondLastName = secondLastName;
            this.email = email;
            this.phoneNumber1 = phoneNumber1;
            this.phoneNumber2 = phoneNumber2;
            this.jobTitle = jobTitle;
            this.department = department;
            this.mobile = mobile;
        }

    }
})();