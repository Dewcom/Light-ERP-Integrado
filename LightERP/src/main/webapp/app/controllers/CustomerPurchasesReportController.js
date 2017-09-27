(function () {
    'use strict';

    angular
        .module('app.client')
        .controller('CustomerPurchasesReportController', CustomerPurchasesReportController);


    CustomerPurchasesReportController.$inject = [ '$http','$uibModal', '$resource', 'customerReportService', 'toaster', '$state', '$filter',
        '$timeout', 'ngDialog', '$scope', 'userService', 'LOCATION', 'APP_CONSTANTS'];
    function CustomerPurchasesReportController($http, $uibModal, $resource, customerReportService,
                                toaster, $state, $filter, $timeout, ngDialog, $scope, userService, LOCATION, APP_CONSTANTS) {

        var vm = this;
        vm.reportData = [];
        vm.reportSummary= [];
        activateCalendars();
        activate();

        /**=========================================================
         * Inicializa los calendarios
         =========================================================*/

        function activateCalendars() {
            vm.today = function () {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function (date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function () {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.openStartDate = function ($event) {
                vm.isStartDateOpened = true;
            };

            vm.openEndDate = function ($event) {
                vm.isEndDateOpened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.format = 'dd-MM-yyyy';
        }


        function activate() {
            vm.showBillCustomerInfo = true;
            vm.submitted = false;
            vm.dateRange = "";
            vm.validateInput = function(name, type) {
                var input = vm.purchasesSearchForm[name];
                return (input.$dirty || vm.submitted) && input.$error[type];
            };
            // Submit form
            vm.submitForm = function() {
                vm.submitted = true;
                if (vm.purchasesSearchForm.$valid) {
                    vm.fillTable();
                } else {
                    return false;
                }
            };
            // Basic
            var columnDefs = [
                {headerName: 'N.factura', field: 'billNumber', minWidth: 90},
                {headerName: 'Estado factura', field: 'billState', minWidth: 140},
                {headerName: 'Cédula cliente', field: 'customerId', minWidth: 120},
                {headerName: 'Nombre cliente', field: 'customerFullName', minWidth: 250},
                {headerName: 'Código producto', field: 'productCode', minWidth: 150},
                {headerName: 'Nombre producto', field: 'productName', minWidth: 200},
                {headerName: 'Cantidad', field: 'quantity', filter: 'number', minWidth: 90},
                {headerName: 'Fecha', field: 'buyDate', minWidth: 110},
                {headerName: 'Precio bruto', field: 'buyPrice', filter: 'number', minWidth: 120},
                {headerName: 'Precio neto', field: 'totalAmount', filter: 'number', minWidth: 120},
            ];

            vm.gridOptions1 = {
                columnDefs: columnDefs,
                rowData: [],
                enableFilter: false,
                localeText:{
                    noRowsToShow:'No hay información para mostrar'
                },
                onGridReady: function(params){
                    params.api.setRowData([]);
                },
                getRowStyle: function(params) {
                    if (params.node.floating) {
                        return {'font-weight': 'bold', 'background-color': '#EDF1F2'}
                    }
                },
                // no rows to pin to start with
                pinnedBottomRowData: []
            };

            vm.fillTable = function () {
                customerReportService.getPurchasesReport(vm.customerIdentification == undefined ? "" : vm.customerIdentification,
                    vm.productCode == undefined ? "" : vm.productCode ,
                    $filter('date')(vm.startDate, "dd-MM-yyyy"), $filter('date')(vm.endDate, "dd-MM-yyyy"))
                .then(function(response) {
                    vm.reportData =  response == null ? [] : response.reportData.size == 0 ? [] : response.reportData;
                    vm.reportSummary = response == null ? [] : response.reportData.size == 0 ? [] : response.reportSummary;
                    vm.gridOptions1.api.setRowData(vm.reportData);
                    vm.gridOptions1.api.sizeColumnsToFit();
                    _autoSizeColumns(columnDefs);
                    vm.dateRange = $filter('date')(vm.startDate, "dd-MM-yyyy") +'/'+$filter('date')(vm.endDate, "dd-MM-yyyy");
                    vm.gridOptions1.api.setFloatingBottomRowData(_createTableFooterData());
                });
            };

          vm.showBillCustomerColumns = function () {
                vm.gridOptions1.columnApi.setColumnsVisible(['billNumber','billState', 'customerFullName', 'customerId'], vm.showBillCustomerInfo);
                if(vm.showBillCustomerInfo == false) {
                    vm.gridOptions1.api.sizeColumnsToFit();
                }
            };


            vm.exportToCsv = function() {
                var params = {
                    skipHeader: false,
                    columnGroups: false,
                    skipFooters: true,
                    skipGroups: true,
                    skipPinnedTop: true,
                    skipPinnedBottom: true,
                    allColumns: true,
                    onlySelected: false,
                    suppressQuotes: true,
                    fileName: 'ReporteCompras_'+vm.dateRange+'.csv',
                    columnSeparator: ','
                };

                params.customFooter = 'TOTALES:,,,,,,'+vm.reportSummary.totalQuantity+',,'+vm.reportSummary.totalGrossPrice+','+vm.reportSummary.totalNetPrice;


                vm.gridOptions1.api.exportDataAsCsv(params);
            }
        }
        function _autoSizeColumns(columnDefs){
            var allColumnIds = [];
            columnDefs.forEach( function(columnDef) {
                allColumnIds.push(columnDef.field);
            });
            vm.gridOptions1.columnApi.autoSizeColumns(allColumnIds);
        }

        function _createTableFooterData() {
            var result = [];
                result.push({
                    billNumber: '',
                    billState: '',
                    customerId: '',
                    customerFullName: '',
                    productCode: '',
                    productName: '',
                    quantity: vm.reportSummary.totalQuantity,
                    buyDate: '',
                    buyPrice: vm.reportSummary.totalGrossPrice,
                    totalAmount: vm.reportSummary.totalNetPrice,
                });

            return result;
        }
    }
})();
