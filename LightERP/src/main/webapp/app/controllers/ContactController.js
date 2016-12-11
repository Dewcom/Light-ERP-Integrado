'use strict';

(function() {
    'use strict';

    angular
        .module('app.client')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$uibModal','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        'contactService','$state', 'toaster', 'ngDialog'];
    function ContactController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, contactService, $state, toaster, ngDialog) {
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

        vm.open = function (size,contact) {
            var modalInstance = $uibModal.open({
                templateUrl: '/editContactModal.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    contact: function () {
                        return contact;
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
            $scope.contactToUpdate = {};

            $scope.close = function () {
                $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            /**=========================================================
             * Agregar clientes
             =========================================================*/

            $scope.addCustomer = function() {


                var newCustomer ={
                    "name":$scope.addCustomerForm.name,
                    "firstLastName":$scope.addCustomerForm.firstLastName ,
                    "secondLastName":$scope.addCustomerForm.secondLastName,
                    "identification":$scope.addCustomerForm.identification,
                    "idDistrict":parseInt($scope.addCustomerForm.selectedDistrict1.idDistrict) , //Los id del Json de location estan en string
                    "address1":$scope.addCustomerForm.address1 ,
                    "address2":$scope.addCustomerForm.address2 ,
                    "phoneNumber1":$scope.addCustomerForm.phoneNumber1,
                    "phoneNumber2":$scope.addCustomerForm.phoneNumber2 ,
                    "mobile":$scope.addCustomerForm.mobile ,
                    "website":$scope.addCustomerForm.website ,
                    "email":$scope.addCustomerForm.email ,
                    "discountPercentage":$scope.addCustomerForm.discountPercentage,
                    "creditLimit":$scope.addCustomerForm.creditLimit,
                    "identificationType":$scope.addCustomerForm.selectedIdentificationType,
                    "customerType":$scope.addCustomerForm.selectedCustomerType,
                    "contacts": [
                        { "name": $scope.addCustomerForm.contactName1,
                            "firstLastName": $scope.addCustomerForm.contactFirstLastName1,
                            "secondLastName": $scope.addCustomerForm.contactSecondLastName1,
                            "jobTitle": $scope.addCustomerForm.contactPosition1,
                            "department": $scope.addCustomerForm.contactDepartment1,
                            "phoneNumber1": $scope.addCustomerForm.contactPhoneNumber1,
                            "email": $scope.addCustomerForm.contactEmail1,
                            "mobile": $scope.addCustomerForm.contactMobile1
                        },
                        {
                            "name": $scope.addCustomerForm.contactName2,
                            "firstLastName": $scope.addCustomerForm.contactFirstLastName2,
                            "secondLastName": $scope.addCustomerForm.contactSecondLastName2,
                            "jobTitle": $scope.addCustomerForm.contactPosition2,
                            "department": $scope.addCustomerForm.contactDepartment2,
                            "phoneNumber1": $scope.addCustomerForm.contactPhoneNumber2,
                            "email": $scope.addCustomerForm.contactEmail2,
                            "mobile": $scope.addCustomerForm.contactMobile2
                        }
                    ]
                };
                console.log(newCustomer);
                customerService.addCustomer(newCustomer).then(function (response) {
                    var toasterdata;

                    if(response.code == "0"){
                        toasterdata = {
                            type: 'success',
                            title: 'Agregar cliente',
                            text: response.message
                        };
                    }else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Cliente',
                            text: response.message
                        };

                    }
                    pop(toasterdata);
                    $timeout(function(){ callAtTimeout(); }, 3000);
                },function (error) {
                    console.log(error);
                });

                $uibModalInstance.close('closed');
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
                   // pop(toasterdata);
                    $state.reload();
                    //activate contacts tab
                    $scope.infoTabActivated = false;
                    $scope.contactsTabActivated = true
                }, function (error) {
                    console.log(error);
                });
                $uibModalInstance.close('closed');
            };

            /**=========================================================
             * Eliminar contacto
             =========================================================*/
            $scope.disableContact = function (contactId) {
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
                        $state.reload();
                        //activate contactsTab
                        $scope.infoTabActivated = false;
                        $scope.contactsTabActivated = true;
                        //pop(toasterdata);

                    },function (error) {
                        console.log(error);
                    });
                }, function (reason) {
                    console.log('Modal promise rejected. Reason: ', reason);
                });
                $uibModalInstance.close('closed');
            };
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