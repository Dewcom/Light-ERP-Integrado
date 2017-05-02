'use strict';

angular
    .module('app.services')
    .factory("customerService", function ($http, $state, $resource, $filter) {

        var customerService = {};
        var tmpAddressList = [];

        customerService.getAll = function () {

            var customerList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/customer/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return customerList;
        };

        customerService.get = function (customerId) {

            var customer = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/customer/get?id=' + customerId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return customer;
        };

        customerService.addCustomer = function (newCustomer) {
            var addCustomerResult = $http({
                method: 'POST',
                url: 'http://localhost:8080/api/customer/create',
                data: {
                    customer: newCustomer
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

            return addCustomerResult;
        };

        customerService.updateCustomer = function (updatedCustomer) {
            var updateCustomerResult = $http({
                method: 'PUT',
                url: 'http://localhost:8080/api/customer/update',
                data: updatedCustomer,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return updateCustomerResult;
        };

        customerService.disableCustomer = function (customerId) {

            var disableCustomerResult = $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/customer/delete',
                data: {
                    id: customerId
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

            return disableCustomerResult;
        };

        customerService.getAllContacts = function (customerId) {

            var customerContactsList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/customer/contacts?id=' + customerId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return customerContactsList;
        };

        customerService.getAllAddresses = function (customerId) {
            // Inicializa el array vacio
            tmpAddressList = [];

            var customerAddressList = $http({
                method: 'GET',
                url: 'http://localhost:8080/api/customer/addresses?id=' + customerId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                getAddressesFromCustomer(response.data);
                return tmpAddressList
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return customerAddressList;
        };


        function getAddressesFromCustomer(addressesFromCustomer) {

            angular.forEach(addressesFromCustomer.data, function (value) {

                var tmpIdAddress = value.id;
                var tmpAddress = value.address;
                var tmpIdDistrict = parseInt(value.idDistrict);
                var tmpDistrict = null;
                var tmpProvince = null;
                var tmpCanton = null;

                $resource('server/location/distritos.json').query().$promise.then(function (data) {
                    var districtObjList = $filter('filter')(data, {idDistrict: tmpIdDistrict});

                    var districtNotFound = true;
                    do {
                        angular.forEach(districtObjList, function (value) {
                            if (parseInt(value.idDistrict) === tmpIdDistrict) {
                                tmpDistrict = value;
                                districtNotFound = false;
                            }
                        });

                    } while (districtNotFound);

                    var tmpIdProvince = parseInt(tmpDistrict.idProvince);

                    var tmpIdCanton = parseInt(tmpDistrict.idCanton);

                    $resource('server/location/provincias.json').query().$promise.then(function (data) {
                        var provinceObjList = $filter('filter')(data, {idProvince: tmpIdProvince});

                        var provinceNotFound = true;
                        do {
                            angular.forEach(provinceObjList, function (value) {
                                if (parseInt(value.idProvince) === tmpIdProvince) {
                                    tmpProvince = value;
                                    provinceNotFound = false;
                                }
                            });

                        } while (provinceNotFound);

                    });


                    $resource('server/location/cantones.json').query().$promise.then(function (data) {
                        var cantonObjList = $filter('filter')(data, {idCanton: tmpIdCanton});

                        var cantonNotFound = true;
                        do {
                            angular.forEach(cantonObjList, function (value) {
                                if (parseInt(value.idCanton) === tmpIdCanton) {

                                    tmpCanton = value;

                                    cantonNotFound = false;
                                }
                            });

                        } while (cantonNotFound);

                        tmpAddressList.push(_buildAddress2AddFromCustomer(tmpIdAddress, tmpProvince, tmpCanton, tmpDistrict, tmpAddress));
                    });

                });

            });
        }

        function _buildAddress2AddFromCustomer(idAddress, province, canton, district, address) {
            return {
                id: idAddress,
                province: province,
                canton: canton,
                district: district,
                address: address
            };
        }

        return customerService;
    });