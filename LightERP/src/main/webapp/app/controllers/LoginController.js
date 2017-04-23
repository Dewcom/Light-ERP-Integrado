/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/
'use strict';

angular
    .module('app.pages')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$http', '$state', 'authenticationService'];
function LoginController($http, $state, authenticationService) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
        // bind here all data from the form
        vm.account = {};
        // place the message if something goes wrong
        vm.authMsg = '';

        vm.login = function () {
            if (vm.loginForm.$valid) {

                authenticationService.login(vm.account.email, vm.account.password)
                    .then(function (response) {
                            console.log(response.data);
                            $state.go('app.dashboard')
                        },
                        function (response) {
                            console.log(response);

                            if (response.status == 401) {

                                vm.authMsg = 'Credenciales incorrectas';
                            }
                            else {

                                vm.authMsg = 'Ha ocurrido un problema al autenticarse';
                            }

                        });
            }
            else {
                // set as dirty if the user click directly to login so we show the validation messages
                /*jshint -W106*/
                vm.loginForm.account_email.$dirty = true;
                vm.loginForm.account_password.$dirty = true;
            }
        };

        vm.logout = function () {
            authenticationService.logout();
            $state.go("page.login");
        };
    }
}

