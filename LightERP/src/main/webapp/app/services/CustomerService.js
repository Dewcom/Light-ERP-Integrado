'use strict';

angular
    .module('app.services')
    .factory("customerService", function ($http, $state, $resource, $filter, APP_CONSTANTS, LOCATION) {

        var customerService = {};
        var tmpAddressList = [];

        customerService.getAll = function () {

            return $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customer/get',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });
        };

        customerService.get = function (customerId) {

            return $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customer/get?id=' + customerId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });
        };

        customerService.addCustomer = function (newCustomer) {
            return $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'customer/create',
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
        };

        customerService.updateCustomer = function (updatedCustomer) {
            return $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'customer/update',
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
        };

        customerService.disableCustomer = function (customerId) {

            return $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'customer/delete',
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
        };

        customerService.getAllContacts = function (customerId) {

            return $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customer/contacts?id=' + customerId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });
        };

        customerService.getAllAddresses = function (customerId) {
            // Inicializa el array vacio
            tmpAddressList = [];

            return $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customer/addresses?id=' + customerId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                getAddressesFromCustomer(response.data.data);
                return tmpAddressList
            }, function (error) {
                console.log(error);
                return error.status;
            });

        };


        function getAddressesFromCustomer(addressesFromCustomer) {

            console.log(addressesFromCustomer);

            angular.forEach(addressesFromCustomer, function (value) {

                var tmpIdAddress = value.id;
                var tmpAddress = value.address;
                var tmpIdDistrict = parseInt(value.idDistrict);
                var tmpDistrict = null;
                var tmpProvince = null;
                var tmpCanton = null;

                var districtObjList = $filter('filter')(LOCATION.districts, {idDistrict: tmpIdDistrict});

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

                var provinceObjList = $filter('filter')(LOCATION.provinces, {idProvince: tmpIdProvince});

                    var provinceNotFound = true;
                    do {
                        angular.forEach(provinceObjList, function (value) {
                            if (parseInt(value.idProvince) === tmpIdProvince) {
                                tmpProvince = value;
                                provinceNotFound = false;
                            }
                        });

                    } while (provinceNotFound);


                var cantonObjList = $filter('filter')(LOCATION.cantons, {idProvince: tmpIdProvince});

                    var cantonNotFound = true;
                    do {
                        angular.forEach(cantonObjList, function (value) {
                            if (parseInt(value.idCanton) === tmpIdCanton) {
                                tmpCanton = value;
                                cantonNotFound = false;
                            }
                        });

                    }  while (provinceNotFound);

                console.log(tmpDistrict);
                console.log(tmpProvince);
                console.log(tmpCanton);

                tmpAddressList.push(_buildAddress2AddFromCustomer(tmpIdAddress, tmpProvince, tmpCanton, tmpDistrict, tmpAddress));

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