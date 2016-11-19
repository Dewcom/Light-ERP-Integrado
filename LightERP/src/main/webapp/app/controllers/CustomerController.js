'use strict';

(function() {
    'use strict';

    angular
        .module('app.client')
        .controller('CustomerController', CustomerController)
        .directive('formWizard', formWizard);

    CustomerController.$inject = ['$uibModal','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
        'customerService', 'customerTypeService', 'identificationTypeService','toaster', '$state', '$http', '$filter'];
    function CustomerController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, customerService,
                                customerTypeService, identificationTypeService, toaster, $state, $http, $filter) {
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
             * Tipos de cliente
             =========================================================*/

            customerTypeService.getAll().then(function(response) {
                vm.customerTypeList = response;
            });

            /**=========================================================
             * Tipos de identificacion
             =========================================================*/

            identificationTypeService.getAll().then(function(response) {
                vm.identificationTypeList = response;
            });

            /**=========================================================
             * Datatables
             =========================================================*/

            // Ajax

            customerService.getAll().then(function(response) {
                vm.customerList = response;
            });

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

            //Distribución territorial
            vm.provinces= [];
            vm.cantons= [];
            vm.districts= [];

            $resource('server/location/provincias.json').query().$promise.then(function(data) {
                vm.provinces = data;
            });

            //Se carga la lista de cantones
            vm.loadCantons = function(province){

                $resource('server/location/cantones.json').query().$promise.then(function(data) {
                    vm.cantons = $filter('filter')(data, {idProvince: province.idProvince });
                });
            }

            //Se carga la lista de distritos
            vm.loadDistricts = function(canton){

                $resource('server/location/distritos.json').query().$promise.then(function(data) {

                    vm.districts = $filter('filter')(data, {idCanton: canton.idCanton});
                });
            }
        }

    /**=========================================================
     * Eliminar clientes
     =========================================================*/
        vm.disableCustomer = function(customerId){
            customerService.disableCustomer(customerId).then(function(response) {
                init();
            });
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
            $scope.addCustomerForm = {};

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

                var contacts

                var newCustomer ={
                    "name":$scope.addCustomerForm.name,
                    "firstLastName":$scope.addCustomerForm.firstLastName ,
                    "secondLastName":$scope.addCustomerForm.secondLastName,
                    "identification":$scope.addCustomerForm.identification,
                    "idDistrict":$scope.addCustomerForm.selectedDistrict1.idDistrict ,
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
                            "email": $scope.addCustomerForm.contactEmail1,
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
                            title: 'Cliente',
                            text: response.message
                        };
                    }else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Cliente',
                            text: response.message
                        };

                    }
                    $scope.pop(toasterdata);
                },function (error) {
                    console.log(error);
                });

                $uibModalInstance.close('closed');
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