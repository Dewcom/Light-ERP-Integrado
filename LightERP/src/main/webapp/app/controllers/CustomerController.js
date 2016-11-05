'use strict';

(function() {
    'use strict';

    angular
        .module('app.client')
        .controller('CustomerController', CustomerController)
        .directive('formWizard', formWizard);

    CustomerController.$inject = ['$uibModal','$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'customerService'];
    function CustomerController($uibModal, $resource, DTOptionsBuilder, DTColumnDefBuilder, customerService) {
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

        activate();

        ////////////////

        function activate() {

            /**=========================================================
             * Datatables
             =========================================================*/

            // Ajax

            customerService.getAll().then(function(response) {
                vm.customerList = response;
            });

            vm.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withLanguage(language);
            vm.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3)
            ];


            /**=========================================================
             * Module: modals
             =========================================================*/

            vm.open = function (size) {

                var modalInstance = $uibModal.open({
                    templateUrl: '/addClientModal.html',
                    controller: ModalInstanceCtrl,
                    size: size
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

                $scope.ok = function () {
                    $uibModalInstance.close('closed');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
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