(function () {
    'use strict';

    angular
        .module('app.client')
        .controller('CustomerController', CustomerController)
        .directive('formWizard', formWizard);

    CustomerController.$inject = ['$uibModal', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        'customerService', 'customerTypeService', 'identificationTypeService', 'toaster', '$state',
        '$filter', '$timeout', 'ngDialog', '$scope', 'userService', 'LOCATION', 'APP_CONSTANTS'];
    function CustomerController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, customerService,
                                customerTypeService, identificationTypeService, toaster, $state, $filter, $timeout,
                                ngDialog, $scope, userService, LOCATION, APP_CONSTANTS) {
        var vm = this;
        vm.globalConstants = APP_CONSTANTS
        vm.addresses = [];

        vm.addCustomerForm = {};

        var language = {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        };

        init();

        ////////////////

        function init() {

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


            /**=========================================================
             * Datatables
             =========================================================*/

            customerService.getAll().then(function (response) {
                console.log(response);
                vm.customerList = response;
            });


            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withLanguage(language);
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3),
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ];


            //Funcion para definir un max y length para campo identificacion
            //dependiendo del tipo de documento
            vm.maxMinLength = function(){
                switch(vm.selectedIdentificationType) {
                    case vm.globalConstants.CUSTOMER_IDENT_TYPE_PHYSICAL:
                        return 9;
                        break;
                    case vm.globalConstants.CUSTOMER_IDENT_TYPE_JURIDICAL:
                        return 10;
                        break;
                    case vm.globalConstants.CUSTOMER_IDENT_TYPE_PASSPORT:
                        return 19
                        break;
                    default:
                        return -1
                }
            }
        }

        /**=========================================================
         * Resetea los apellidos
         =========================================================*/

        vm.resetNames = function () {

            if(vm.selectedIdentificationType == APP_CONSTANTS.CUSTOMER_IDENT_TYPE_JURIDICAL){
                vm.firstLastName = null;
                vm.secondLastName = null;
            }

        };

        /**=========================================================
         * Eliminar clientes
         =========================================================*/
        vm.disableCustomer = function (customerId) {
            ngDialog.openConfirm({
                template: 'disableCustomerModal',
                className: 'ngdialog-theme-default',
                closeByDocument: false,
                closeByEscape: false
            }).then(function (value) {
                customerService.disableCustomer(customerId).then(function (response) {
                    var toasterdata;
                    console.log(response);

                    if (response.code == "0") {
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar cliente',
                            text: response.message
                        };
                    } else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Cliente',
                            text: response.message
                        };

                    }
                    pop(toasterdata);
                    init();
                }, function (error) {
                    console.log(error);
                });
            }, function (reason) {
                console.log('Modal promise rejected. Reason: ', reason);
            });
        };


        /**=========================================================
         * Agregar clientes
         =========================================================*/

        vm.addCustomer = function () {

            var newCustomer = {
                "name": vm.name,
                "firstLastName": vm.firstLastName != null ? vm.firstLastName : "" ,
                "secondLastName": vm.secondLastName != null ? vm.secondLastName : "" ,
                "identification": vm.identification,
                "addresses": formatAddreses(),
                "phoneNumber1": vm.phoneNumber1,
                "phoneNumber2": vm.phoneNumber2,
                "mobile": vm.mobile,
                "website": vm.website,
                "email": vm.email,
                "discountPercentage": vm.discountPercentage,
                "creditLimit": vm.creditLimit,
                "identificationType": vm.selectedIdentificationType,
                "customerType": vm.selectedCustomerType,
                "contacts": [
                    {
                        "name": vm.contactName1,
                        "firstLastName": vm.contactFirstLastName1,
                        "secondLastName": vm.contactSecondLastName1,
                        "jobTitle": vm.contactPosition1,
                        "department": vm.contactDepartment1,
                        "phoneNumber1": vm.contactPhoneNumber1,
                        "email": vm.contactEmail1,
                        "mobile": vm.contactMobile1
                    },
                    {
                        "name": vm.contactName2,
                        "firstLastName": vm.contactFirstLastName2,
                        "secondLastName": vm.contactSecondLastName2,
                        "jobTitle": vm.contactPosition2,
                        "department": vm.contactDepartment2,
                        "phoneNumber1": vm.contactPhoneNumber2,
                        "email": vm.contactEmail2,
                        "mobile": vm.contactMobile2
                    }
                ]
            };
            console.log(newCustomer);

            customerService.addCustomer(newCustomer).then(function (response) {
                var toasterdata;

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Agregar cliente',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Cliente',
                        text: response.message
                    };

                }
                pop(toasterdata);
                $timeout(function () {
                    callAtTimeout();
                }, 3000);
            }, function (error) {
                console.log(error);
            });

            //Se formatea la direccion para enviar al BE
            function formatAddreses() {
                var finalAddressList = [];

                angular.forEach(vm.addresses, function (value, key) {
                    console.log(value);
                    var finalAddressObj = {"idDistrict": value.district.idDistrict, "address": value.address};
                    finalAddressList.push(finalAddressObj);
                });

                return finalAddressList;

            }

            $scope.cancel();
        };

        /**=========================================================
         * Module: modals
         =========================================================*/

        vm.open = function (size) {

            var modalInstance = $uibModal.open({
                templateUrl: '/addClientModal.html',
                controller: ModalInstanceCtrl,
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

        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
        function ModalInstanceCtrl($scope, $uibModalInstance) {

            $scope.close = function () {
                $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }


        function pop(toasterdata) {
            toaster.pop({
                type: toasterdata.type,
                title: toasterdata.title,
                body: toasterdata.text
            });
        }

        function callAtTimeout() {
            $state.reload();
        }
    }

    /**=========================================================
     * Module: form-wizard.js
     * Handles form wizard plugin and validation
     =========================================================*/

    formWizard.$inject = ['$parse'];
    function formWizard($parse) {
        var directive = {
            link: link,
            controller: ctrl,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            var validate = $parse(attrs.validateSteps)(scope),
                wiz = new Wizard(attrs.steps, !!validate, element);
            scope.wizard = wiz.init();
        }

        ctrl.$inject = ['$scope'];
        function ctrl($scope) {
            $scope.wizardValidate = function (formName) {
                if (angular.isDefined($scope[formName])) {
                    // Set submitted to perform validation
                    $scope[formName].$setSubmitted(true);
                    // return valid status of the subform
                    return $scope[formName].$valid;
                }
            }
        }

        function Wizard(quantity, validate, element) {

            var self = this;
            self.quantity = parseInt(quantity, 10);
            self.validate = validate;
            self.element = element;

            self.init = function () {
                self.createsteps(self.quantity);
                self.go(1); // always start at fist step
                return self;
            };

            self.go = function (step) {

                if (angular.isDefined(self.steps[step])) {
                    if (self.validate && step !== 1) { // no need to validate when move to first state
                        var scope = self.element.scope();
                        if (typeof scope.wizardValidate === 'function') {
                            var form = $(self.element).children().children('div').eq(step - 2).children('[ng-form]');
                            if (!scope.wizardValidate(form.attr('ng-form')))
                                return false;
                        }
                    }

                    self.cleanall();
                    self.steps[step] = true;
                }
            };

            self.active = function (step) {
                return !!self.steps[step];
            };

            self.cleanall = function () {
                for (var i in self.steps) {
                    self.steps[i] = false;
                }
            };

            self.createsteps = function (q) {
                self.steps = [];
                for (var i = 1; i <= q; i++) self.steps[i] = false;
            };

        }
    }

})();
