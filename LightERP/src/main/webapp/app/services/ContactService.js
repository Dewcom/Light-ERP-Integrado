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

        return contactService;
    });





