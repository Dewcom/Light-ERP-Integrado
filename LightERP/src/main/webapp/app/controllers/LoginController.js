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

          vm.login = function() {
            vm.authMsg = '';
            if(vm.loginForm.$valid) {
                   console.log(vm.account_email);
            authenticationService.login(vm.account_email, vm.account_password );
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };
        }
    }