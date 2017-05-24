'use strict';

angular
    .module('app.services')
    .factory("contactService", function ($http, $state, APP_CONSTANTS) {

        var contactService = {};

        contactService.getAll = function () {

            var contactList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'contact/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return contactList;
        };

        contactService.updateContact = function (updatedContact) {
            var updateContactResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'contact/update',
                data: updatedContact,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return updateContactResult;
        }

        contactService.disableContact = function (contactId) {

            var disableContactResutl = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'contact/delete',
                data: {
                    id: contactId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return disableContactResutl;
        };

        return contactService;
    });





