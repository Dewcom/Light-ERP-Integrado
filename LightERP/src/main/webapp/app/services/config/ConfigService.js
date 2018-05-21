'use strict';

angular
    .module('app.services')
    .factory("configService", function ($http, $state, APP_CONSTANTS) {

        var configService = {};

        configService.getExchangeRateByCode = function (code) {

            var exchangeRate = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'exchangeRate/'+code,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return exchangeRate;
        }

        configService.getBillNumberConfigByCode = function (code) {

            var billNumber = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'configuration/'+code,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                console.log(response.data.data)
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return billNumber;
        }

        configService.updateExchangeRateByCode = function (code, exchangeRate) {

            var updateExchangeRateResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'exchangeRate/'+code,
                data: {
                    exchangeRate: exchangeRate
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

            return updateExchangeRateResult;
        }

        configService.getAllTaxes = function () {

            var taxesList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'tax',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return taxesList;
        }


        configService.createCreditCondition = function (data) {
            var createdCreditConditionId = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'creditCondition',
                data: {
                    days: data.days,
                    description: data.description
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });

            return createdCreditConditionId;
        }


        configService.updateCreditCondition = function (data, creditConditionId) {
            var updateCreditConResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'creditCondition/'+creditConditionId,
                data: {
                    days: data.days,
                    description: data.description
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return updateCreditConResult;
        }

        configService.deleteCreditCondition = function (creditCondId) {
            var deleteCredConResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'creditCondition/'+creditCondId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return deleteCredConResult;
        }



        configService.getAllCreditConditions = function () {

            var creditConList = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'creditCondition',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return creditConList;
        }


        configService.createTax = function (data) {
            var createdTaxId = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'tax',
                data: {
                    percentage: data.percentage,
                    description: data.description
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });

            return createdTaxId;
        }


        configService.updateTax = function (data, taxId) {
            var updateTaxResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'tax/'+taxId,
                data: {
                    percentage: data.percentage,
                    description: data.description
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return updateTaxResult;
        }

        configService.deleteTax = function (taxId) {
            var deleteTaxResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'tax/'+taxId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });
            return deleteTaxResult;
        }


        configService.createMeasureUnit = function (data) {
            var createMeasureUnit = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'measureUnit',
                data: {
                    name: data.name,
                    symbol: data.symbol
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return createMeasureUnit;
        }


        configService.updateMeasureUnit = function (data, measureId) {
            var updateMeasureUnit = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'measureUnit/'+measureId,
                data: {
                    name: data.name,
                    symbol: data.symbol
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return updateMeasureUnit;
        }

        configService.deleteMeasureUnit = function (measureId) {
            var deleteMeasureUnit = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'measureUnit/'+measureId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return deleteMeasureUnit;
        }



        configService.getAllMeasureUnits = function () {

            var measureUnits = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'measureUnit',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return measureUnits;
        }


        configService.createPresentationType = function (data) {
            var createPresentationTypeResult = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'presentationType',
                data: {
                    name: data.name
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return createPresentationTypeResult;
        }


        configService.updatePresentationType = function (data, presentationId) {
            var updatePresentationTypeResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'presentationType/'+presentationId,
                data: {
                    name: data.name,
                    symbol: data.symbol
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return updatePresentationTypeResult;
        }

        configService.deletePresentationType = function (presentationId) {
            var deletePresentationTypeResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'presentationType/'+presentationId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return deletePresentationTypeResult;
        }



        configService.getAllPresentationTypes = function () {

            var presentationTypes = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'presentationType',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return presentationTypes;
        }


        configService.createProductType = function (data) {
            var createProductTypeResult = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'productType',
                data: {
                    name: data.name
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return createProductTypeResult;
        }


        configService.updateProductType = function (data, productId) {
            var updateProductTypeResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'productType/'+productId,
                data: {
                    name: data.name
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return updateProductTypeResult;
        }

        configService.deleteProductType = function (productTypeId) {
            var deleteProductTypesResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'productType/'+productTypeId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return deleteProductTypesResult;
        }



        configService.getAllProductTypes = function () {

            var productTypes = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'productType',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return productTypes;
        }

        configService.createCustomerType = function (data) {
            var createCustomerTypeResult = $http({
                method: 'POST',
                url: APP_CONSTANTS.appURL + 'customerType',
                data: {
                    name: data.name
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return createCustomerTypeResult;
        }


        configService.updateCustomerType = function (data, customerId) {
            var updateCustomerTypeResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'customerType/'+customerId,
                data: {
                    name: data.name
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return updateCustomerTypeResult;
        }

        configService.deleteCustomerType = function (customerTypeId) {
            var deleteCustomerTypeResult = $http({
                method: 'DELETE',
                url: APP_CONSTANTS.appURL + 'customerType/'+customerTypeId,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return deleteCustomerTypeResult;
        }



        configService.getAllCustomerTypes = function () {

            var customerTypes = $http({
                method: 'GET',
                url: APP_CONSTANTS.appURL + 'customerType',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data.data;
            }, function (error) {
                console.log(error);
                return error.status;
            });

            return customerTypes;
        }

        configService.updateBillNumber = function (value, configCode) {
            var updateBillNumberResult = $http({
                method: 'PUT',
                url: APP_CONSTANTS.appURL + 'configuration/'+configCode,
                data: {
                    value: value
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
                return error;
            });
            return updateBillNumberResult;
        }

        return configService;
    });





