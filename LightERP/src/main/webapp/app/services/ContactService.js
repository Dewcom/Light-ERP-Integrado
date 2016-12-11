'use strict';

angular
    .module('app.services')
    .factory("contactService", function ($http, $state) {

        var contactService = {};

        contactService.getAll = function() {

            var contactList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/contact/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return contactList;
        }

        contactService.updateContact = function(updatedContact) {
            console.log(updatedContact);
            var updateContactResult = $http({
                method: 'PUT',
                url: 'http://localhost:8080/api/contact/update',
                data: updatedContact,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response.data.message);
                return response.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return updateContactResult;
        }

        contactService.disableContact = function(contactId) {

            var disableContactResutl = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/contact/delete',
                data: {
                    id: contactId
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response);
                return response.data;
            },function (error) {
                console.log(error);
                return error.status;
            });

            return disableContactResutl;
        }

        return contactService;
    });





