'use strict';

angular
    .module('app.adminConfig')
    .controller('AdminConfigController', AdminConfigController);

AdminConfigController.$inject = ['$http', '$state', 'customerTypeService', 'configService', 'APP_CONSTANTS', 'toaster', '$scope', '$timeout'];
function AdminConfigController($http, $state, customerTypeService, configService, APP_CONSTANTS, toaster, $scope, $timeout) {
    var vm = this;

    init();

    function init() {
        fetchAllCustomerTypes();
        fetchAllTaxes();
        fetchAllProductTypes();
        fetchAllPresentationTypes();
        fetchAllCreditConditions();
        fetchAllMeasureUnits();
        getAllCustomerTypes();
        getExchangeRateByCode(APP_CONSTANTS.TIPO_CAMBIO_DOLAR);
        getBillNumber(APP_CONSTANTS.BILL_NUMBER_CONFIG_CODE);


        vm.submitted = false;
        vm.validateInput = function(name, type) {
            var input = vm.exchangeConfigForm[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
        };

        vm.validateInputBillNumberForm = function(name, type) {
            var input = vm.billNumberConfigForm[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
        };

        // Submit form
        vm.submitForm = function () {
            vm.submitted = true;
                if (vm.exchangeConfigForm.$valid) {
                    updateExchangeRate(APP_CONSTANTS.TIPO_CAMBIO_DOLAR, vm.exchangeRateValue);
                } else {
                    return false;
                }
        };

        vm.checkRequiredText = function(data) {
            if(!data){
                return "<span class='text-danger'>Este campo es requerido</span>";
            }
        };

        vm.checkTaxAmount = function(data) {
            if(!data || data == 0){
                return "<span class='text-danger'>Este campo es requerido</span>";
            }
            return validateDecimalAmount(data);
        };

       //********************TAXES START*************************


        vm.createTax = function(data, taxId, index) {
            if(!taxId){
                saveTax(data).then(function (response) {
                    var toasterdata;

                     if(response.status != undefined && response.status != 200){
                         vm.taxesList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear impuesto',
                            text: 'Ha ocurrido un error creando el impuesto'
                        };
                    }
                    else if(response.code == 0){
                        angular.extend(data, {id: response.data.id});
                        setTaxId(index, response.data.id )
                        toasterdata = {
                            type: 'success',
                            title: 'Crear impuesto',
                            text: response.message
                        };
                    }
                    else{
                         vm.taxesList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear impuesto',
                            text: response.message
                        };
                    }
                     pop(toasterdata);
                });
            }
            else{
                updateTax(data, taxId).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar impuesto',
                            text: 'Ha ocurrido un error modificando el impuesto'
                        };
                    }
                    else if(response.code == 0){
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar impuesto',
                            text: response.message
                        };
                    }
                    else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar impuesto',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
        };

        // remove user
        vm.removeTax = function(taxId, index) {
            if(taxId){
                deleteTax(taxId).then(function (response) {
                    var toasterdata;
                    if (response.status != undefined && response.status != 200) {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar impuesto',
                            text: 'Ha ocurrido un error eliminando el impuesto'
                        };
                    }
                    else if (response.code == 0) {

                        vm.taxesList.splice(index, 1);
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar impuesto',
                            text: response.message
                        };
                    }
                    else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar impuesto',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                vm.taxesList.splice(index, 1);
            }
        };

        vm.addTaxToTable = function() {
            vm.insertedTax = {
                id: null,
                percentage: 0,
                description: ""
            };
            vm.taxesList.push(vm.insertedTax);
        };
        //********************TAXES END*************************

        //********************CREDIT CONDITION START*************************

        vm.addcreditConToTable = function() {
            vm.insertedCondition = {
                id: null,
                days: 0,
                description: ""
            };
            vm.creditConditionList.push(vm.insertedCondition);
        };

        vm.removeCreditCondition = function(creditConId, index) {
            if(creditConId){
                deleteCreditCondition(creditConId).then(function (response) {
                    var toasterdata;
                    if (response.status != undefined && response.status != 200) {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar condición',
                            text: response.data.message == undefined ? 'Ha ocurrido un error eliminando la condición' : response.data.message
                        };
                    }
                    else if (response.code == 0) {

                        vm.creditConditionList.splice(index, 1);
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar condición',
                            text: response.message
                        };
                    }
                    else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar condición',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                vm.creditConditionList.splice(index, 1);
            }
        };


        vm.createCreditCondition = function(data, creditConId, index) {
            if(!creditConId){
                saveCreditCondition(data).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){

                        vm.creditConditionList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear condición',
                            text: response.message == undefined ? 'Ha ocurrido un error creando la condición' : response.message
                        };
                    }
                    else if(response.code == 0){
                        angular.extend(data, {id: response.data.id});
                        setCreditConditionId(index, response.data.id )
                        toasterdata = {
                            type: 'success',
                            title: 'Crear condición',
                            text: response.message
                        };
                    }
                    else{
                        vm.creditConditionList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear condición',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                updateCreditCondition(data, creditConId).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar condición',
                            text: 'Ha ocurrido un error modificando la condición'
                        };
                    }
                    else if(response.code == 0){
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar condición',
                            text: response.message
                        };
                    }
                    else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar condición',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
        };

        vm.checkDaysNumberInput = function(data){
            if(!data || data == 0){
                return "<span class='text-danger'>Este campo es requerido</span>";
            }
            var isNumberValid = validateNumber(data);
            if(!isNumberValid){
               return "<span class='text-danger'>Cantidad inválida</span>";
            }
        }
        //********************CREDIT CONDITION END*************************


        //********************MEASURE UNIT START*************************

        vm.addMeasureUnitToTable = function() {
            vm.insertedMeasureUnit = {
                id: null,
                name: "",
                symbol: ""
            };
            vm.measureUnitsList.push(vm.insertedMeasureUnit);
        };

        vm.removeMeasureUnit = function(measureId, index) {
            if(measureId){
                deleteMeasureUnit(measureId).then(function (response) {
                    var toasterdata;
                    if (response.status != undefined && response.status != 200) {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar unidad',
                            text: response.data.message == undefined ? 'Ha ocurrido un error eliminando la unidad' : response.data.message
                        };
                    }
                    else if (response.code == 0) {

                        vm.measureUnitsList.splice(index, 1);
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar unidad',
                            text: response.message
                        };
                    }
                    else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar unidad',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                vm.measureUnitsList.splice(index, 1);
            }
        };


        vm.createMeasureUnit = function(data, measureId, index) {
            if(!measureId){
                saveMeasureUnit(data).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){

                        vm.measureUnitsList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear unidad',
                            text: response.message == undefined ? 'Ha ocurrido un error creando la unidad de medida' : response.message
                        };
                    }
                    else if(response.code == 0){
                        angular.extend(data, {id: response.data.id});
                        setMeasureUnitId(index, response.data.id )
                        toasterdata = {
                            type: 'success',
                            title: 'Crear unidad',
                            text: response.message
                        };
                    }
                    else{
                        vm.measureUnitsList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear unidad',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                updateMeasureUnit(data, measureId).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar unidad',
                            text: 'Ha ocurrido un error modificando la unidad de medida'
                        };
                    }
                    else if(response.code == 0){
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar unidad',
                            text: response.message
                        };
                    }
                    else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar unidad',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
        };

        //********************MEASURE UNIT  END*************************

        //********************PRESENTATION TYPE  START*************************

        vm.addPresentationTypeToTable = function() {
            vm.insertedPresentation = {
                id: null,
                name: ""
            };
            vm.presentationTypesList.push(vm.insertedPresentation);
        };

        vm.removePresentationType = function(presentationId, index) {
            if(presentationId){
                deletePresentationType(presentationId).then(function (response) {
                    var toasterdata;
                    if (response.status != undefined && response.status != 200) {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar presentación',
                            text: response.data.message == undefined ? 'Ha ocurrido un error eliminando la presentación' : response.data.message
                        };
                    }
                    else if (response.code == 0) {

                        vm.presentationTypesList.splice(index, 1);
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar presentación',
                            text: response.message
                        };
                    }
                    else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar presentación',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                vm.presentationTypesList.splice(index, 1);
            }
        };


        vm.createPresentationType = function(data, presentationId, index) {
            if(!presentationId){
                savePresentationType(data).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){

                        vm.presentationTypesList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear presentación',
                            text: response.message == undefined ? 'Ha ocurrido un error creando la presentación' : response.message
                        };
                    }
                    else if(response.code == 0){
                        angular.extend(data, {id: response.data.id});
                        setPresentationTypeId(index, response.data.id )
                        toasterdata = {
                            type: 'success',
                            title: 'Crear presentación',
                            text: response.message
                        };
                    }
                    else{
                        vm.presentationTypesList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear presentación',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                updatePresentationType(data, presentationId).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar presentación',
                            text: 'Ha ocurrido un error modificando la presentación'
                        };
                    }
                    else if(response.code == 0){
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar presentación',
                            text: response.message
                        };
                    }
                    else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar unidad',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
        };

        //********************PRESENTATION TYPE  END*************************

        //********************PRODUCT TYPE   START*************************

        vm.addProductTypeToTable = function() {
            vm.insertedProductType = {
                id: null,
                name: ""
            };
            vm.productTypesList.push(vm.insertedProductType);
        };

        vm.removeProductType = function(productId, index) {
            if(productId){
                deleteProductType(productId).then(function (response) {
                    var toasterdata;
                    if (response.status != undefined && response.status != 200) {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar tipo de producto',
                            text: response.data.message == undefined ? 'Ha ocurrido un error eliminando  el tipo de producto' : response.data.message
                        };
                    }
                    else if (response.code == 0) {

                        vm.productTypesList.splice(index, 1);
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar tipo de producto',
                            text: response.message
                        };
                    }
                    else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar tipo de producto',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                vm.productTypesList.splice(index, 1);
            }
        };


        vm.createProductType = function(data, productId, index) {
            if(!productId){
                saveProductType(data).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){

                        vm.productTypesList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear tipo de producto',
                            text: response.message == undefined ? 'Ha ocurrido un error creando tipo de producto' : response.message
                        };
                    }
                    else if(response.code == 0){
                        angular.extend(data, {id: response.data.id});
                        setProductTypeId(index, response.data.id )
                        toasterdata = {
                            type: 'success',
                            title: 'Crear tipo de producto',
                            text: response.message
                        };
                    }
                    else{
                        vm.presentationTypesList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear tipo de producto',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                updateProductType(data, productId).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar tipo de producto',
                            text: 'Ha ocurrido un error modificando tipo de producto'
                        };
                    }
                    else if(response.code == 0){
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar tipo de producto',
                            text: response.message
                        };
                    }
                    else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar tipo de producto',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
        };

        //********************PRODUCT TYPE  END*************************

        //********************CUSTOMER TYPE   START*************************

        vm.addCustomerTypeToTable = function() {
            vm.insertedCustomerType = {
                id: null,
                name: ""
            };
            vm.customerTypeList.push(vm.insertedCustomerType);
        };

        vm.removeCustomerType = function(customerTypeId, index) {
            if(customerTypeId){
                deleteCustomerType(customerTypeId).then(function (response) {
                    var toasterdata;
                    if (response.status != undefined && response.status != 200) {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar tipo de cliente',
                            text: response.data.message == undefined ? 'Ha ocurrido un error eliminando  el tipo de cliente' : response.data.message
                        };
                    }
                    else if (response.code == 0) {

                        vm.customerTypeList.splice(index, 1);
                        toasterdata = {
                            type: 'success',
                            title: 'Eliminar tipo de cliente',
                            text: response.message
                        };
                    }
                    else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Eliminar tipo de cliente',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                vm.customerTypeList.splice(index, 1);
            }
        };


        vm.createCustomerType = function(data, customerTypeId, index) {
            if(!customerTypeId){
                saveCustomerType(data).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){

                        vm.customerTypeList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear tipo de cliente',
                            text: response.message == undefined ? 'Ha ocurrido un error creando tipo de cliente' : response.message
                        };
                    }
                    else if(response.code == 0){
                        angular.extend(data, {id: response.data.id});
                        setCustomerTypeId(index, response.data.id )
                        toasterdata = {
                            type: 'success',
                            title: 'Crear tipo de cliente',
                            text: response.message
                        };
                    }
                    else{
                        vm.customerTypeList.splice(index, 1);
                        toasterdata = {
                            type: 'warning',
                            title: 'Crear tipo de cliente',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
            else{
                updateCustomerType(data, customerTypeId).then(function (response) {
                    var toasterdata;
                    if(response.status != undefined && response.status != 200){
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar tipo de cliente',
                            text: 'Ha ocurrido un error modificando tipo de cliente'
                        };
                    }
                    else if(response.code == 0){
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar tipo de cliente',
                            text: response.message
                        };
                    }
                    else{
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar tipo de cliente',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            }
        };

        //********************CUSTOMER TYPE  END*************************

        //********************BILL NUMBER   START*************************
        vm.updateBillNumber = function() {
            vm.submitted = true;
            if (vm.billNumberConfigForm.$valid) {
                updateBillNumber(vm.billNumberValue, APP_CONSTANTS.BILL_NUMBER_CONFIG_CODE).then(function (response) {
                    var toasterdata;
                    if (response.status != undefined && response.status != 200) {
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar consecutivo factura',
                            text: response.data.message == undefined ? 'Ha ocurrido un error modificando  el consecutivo de factura' : response.data.message
                        };
                    }
                    else if (response.code == 0) {
                        toasterdata = {
                            type: 'success',
                            title: 'Modificar consecutivo factura',
                            text: response.message
                        };
                    }
                    else {
                        toasterdata = {
                            type: 'warning',
                            title: 'Modificar consecutivo factura',
                            text: response.message
                        };
                    }
                    pop(toasterdata);
                });
            } else {
                return false;
            }
        };
        //********************BILL NUMBER   END*************************
    }




//********************TAXES START*************************

    function getMaxCurrentId(){
        var ids = [];
        vm.taxesList.forEach(function(element) {
           ids.push(element.id)
         });

        var max = ids.reduce(function(a, b) {
            return Math.max(a, b);
        });
        return max+1;
    }

    function saveTax(data) {
        return configService.createTax(data);
    }

    //set tax id to the new added object in the taxes list by index
    function setTaxId(index, taxId) {
        angular.extend(vm.taxesList[index], {id:taxId})
    }

    //overrides an object
    function overwriteTaxObject(data, index) {
        angular.extend(vm.taxesList[index], {id:data.id, percentage:data.percentage, description:data.description})
    }

    //get a tax object by index
    function getTaxObjectByIndex(index) {
       return vm.taxesList[index]
    }

    function updateTax(data,taxId) {
        return configService.updateTax(data, taxId);
    }

   function deleteTax(taxId) {
        return configService.deleteTax(taxId);
    };


    function fetchAllTaxes(){
        configService.getAllTaxes().then(function(response) {
            vm.taxesList = response;
        });
    }


    //********************TAXES END*************************


    //********************EXCHANGE RATE START*************************

    function getExchangeRateByCode(code){
        configService.getExchangeRateByCode(code).then(function(response) {
            vm.exchangeRateValue = response.value;
        });
    }

    function updateExchangeRate(code, value) {
        configService.updateExchangeRateByCode(code, value).then(function (response) {
            var toasterdata;
            if (response.code == "0") {
                toasterdata = {
                    type: 'success',
                    title: 'Modificar tipo cambio',
                    text: response.message
                };
            } else {
                toasterdata = {
                    type: 'warning',
                    title: 'Modificar tipo cambio',
                    text: response.message
                };
            }
            pop(toasterdata);
            $timeout(function () {
                callAtTimeout();
            }, 3000);
        }, function (error) {
            console.log(error);
        });
    };

    //********************EXCHANGE RATE END*************************


    //********************CUSTOMER TYPE   START*************************

    function getAllCustomerTypes(){
        customerTypeService.getAll().then(function(response) {
            vm.customerTypes = response;
        });

    }

    vm.disableCustomerType = function(customerTypeId){
        customerTypeService.disableCustomerType(customerTypeId).then(function(response) {
            getAllCustomerTypes();
        });
    }

    //********************CUSTOMER TYPE END*************************


    //********************CREDIT CONDITION START*************************

    function fetchAllCreditConditions(){
        configService.getAllCreditConditions().then(function(response) {
            vm.creditConditionList = response;
        });
    }

    function deleteCreditCondition(creditConId) {
        return configService.deleteCreditCondition(creditConId);
    }

    function updateCreditCondition(data, creditConId) {
        return configService.updateCreditCondition(data, creditConId);
    }

    function saveCreditCondition(data) {
        return configService.createCreditCondition(data);
    }

    //set CC id to the new added object in the credit condition list by index
    function setCreditConditionId(index, creditConId) {
        angular.extend(vm.creditConditionList[index], {id:creditConId})
    }


    //********************CREDIT CONDITION END*************************


    //********************MEASURE UNIT  START*************************

    function fetchAllMeasureUnits(){
        configService.getAllMeasureUnits().then(function(response) {
            vm.measureUnitsList = response;
        });
    }

    function deleteMeasureUnit(measureId) {
        return configService.deleteMeasureUnit(measureId);
    }

    function updateMeasureUnit(data, measureId) {
        return configService.updateMeasureUnit(data, measureId);
    }

    function saveMeasureUnit(data) {
        return configService.createMeasureUnit(data);
    }

    //set mU id to the new added object in the credit condition list by index
    function setMeasureUnitId(index, measureId) {
        angular.extend(vm.measureUnitsList[index], {id:measureId})
    }


    //********************MEASURE UNIT END*************************

    //********************PRESENTATION TYPE   START*************************

    function fetchAllPresentationTypes(){
        configService.getAllPresentationTypes().then(function(response) {
            vm.presentationTypesList = response;
        });
    }

    function deletePresentationType(presentationId) {
        return configService.deletePresentationType(presentationId);
    }

    function updatePresentationType(data, presentationId) {
        return configService.updatePresentationType(data, presentationId);
    }

    function savePresentationType(data) {
        return configService.createPresentationType(data);
    }

    //set pt id to the new added object in the  list by index
    function setPresentationTypeId(index, presentationId) {
        angular.extend(vm.presentationTypesList[index], {id:presentationId})
    }


    //********************PRESENTATION TYPE  END*************************

    //********************PRODUCT TYPE   START*************************

    function fetchAllProductTypes(){
        configService.getAllProductTypes().then(function(response) {
            vm.productTypesList = response;
        });
    }

    function deleteProductType(productId) {
        return configService.deleteProductType(productId);
    }

    function updateProductType(data, productId) {
        return configService.updateProductType(data, productId);
    }

    function saveProductType(data) {
        return configService.createProductType(data);
    }

    //set product type id to the new added object in the  list by index
    function setProductTypeId(index, productId) {
        angular.extend(vm.productTypesList[index], {id:productId})
    }


    //********************PRODUCT TYPE  END*************************

    //********************CUSTOMER TYPE   START*************************

    function fetchAllCustomerTypes(){
        configService.getAllCustomerTypes().then(function(response) {
            vm.customerTypeList = response;
        });
    }

    function deleteCustomerType(customerTypeId) {
        return configService.deleteCustomerType(customerTypeId);
    }

    function updateCustomerType(data, customerTypeId) {
        return configService.updateCustomerType(data, customerTypeId);
    }

    function saveCustomerType(data) {
        return configService.createCustomerType(data);
    }

    //set customer type id to the new added object in the  list by index
    function setCustomerTypeId(index, customerTypeId) {
        angular.extend(vm.customerTypeList[index], {id:customerTypeId})
    }


    //********************UPDATE BILL NUMBER  START*************************
    function updateBillNumber(value, configCode) {
        return configService.updateBillNumber(value, configCode);
    }

    function getBillNumber(code){
        configService.getBillNumberConfigByCode(code).then(function(response) {
            vm.billNumberValue = parseInt(response.value);
        });
    }

    //********************UPDATE BILL NUMBER  END*************************


    //********************CUSTOMER TYPE  END*************************
    function callAtTimeout() {
        $state.reload();
    }

    function validateDecimalAmount(text){
        if(!text.toString().match('^[0-9]{1,2}([,.][0-9]{1,2})?$')){
            return  "<span class='text-danger'>El monto es inválido </span>";
        }
    }

    function validateNumber(text){
        if(!text.toString().match('^[0-9]*$')){
            return  false;
        }
        else {
            return true
        }
    }

    function pop(toasterdata) {
        toaster.pop({
            type: toasterdata.type,
            title: toasterdata.title,
            body: toasterdata.text
        });
    }
}