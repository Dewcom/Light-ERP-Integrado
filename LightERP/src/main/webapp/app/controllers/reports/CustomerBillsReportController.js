(function () {
    'use strict';

    angular
        .module('app.client')
        .controller('CustomerBillsReportController', CustomerBillsReportController);


    CustomerBillsReportController.$inject = ['usSpinnerService','$http','$uibModal', '$resource', 'customerReportService', 'toaster', '$state', '$filter',
        '$timeout', 'ngDialog', '$scope', 'userService', 'LOCATION', 'APP_CONSTANTS'];
    function CustomerBillsReportController(usSpinnerService, $http, $uibModal, $resource, customerReportService,
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
            vm.resultsLabel= "";
            vm.showTable = false;
            vm.dateRange = "";
            // Submit form
            vm.submitForm = function() {
                vm.fillTable();
            };
            // Basic
            var columnDefs = [
                {headerName: 'N.factura', field: 'billNumber', minWidth: 120},
                {headerName: 'Estado factura', field: 'billStateDesc', minWidth: 140},
                {headerName: 'Fecha', field: 'buyDate', minWidth: 110},
                {headerName: 'Nombre cliente', field: 'customerFullName', minWidth: 250},
                {headerName: 'Cédula cliente', field: 'customerId', minWidth: 120},
                {headerName: 'Subtotal', field: 'subTotal', filter: 'number', minWidth: 120},
                {headerName: 'Descuento', field: 'totalDiscount', filter: 'number', minWidth: 120},
                {headerName: 'Impuestos', field: 'totalTaxes', filter: 'number', minWidth: 120},
                {headerName: 'Total', field: 'totalAmount', filter: 'number', minWidth: 120},
                {headerName: 'Pagos', field: 'paymentsPerformed', filter: 'number', minWidth: 120},
                {headerName: 'Saldo', field: 'balance', filter: 'number', minWidth: 120}
            ];

            vm.gridOptions = {
                columnDefs: columnDefs,
                rowData: [],
                enableFilter: false,
                localeText:{
                    noRowsToShow:'No hay información para mostrar'
                },
                onGridReady: function(params){
                    params.api.setRowData([]);
                },
                getRowHeight: function(params) {
                if (params.node.floating) {
                    return 50;
                } else {
                    return 28;
                }
            },
                getRowStyle: function(params) {
                    if (params.node.floating) {
                        return {'font-weight': 'bold', 'background-color': '#EDF1F2','font-size': '20px',
                                'border-style': 'solid none none none', 'border-width': '2px', 'text-align': 'center'}
                    }else{
                        return {'text-align': 'center'}
                    }
                },
                // no rows to pin to start with
                pinnedBottomRowData: []
            };

            vm.fillTable = function () {
                vm.showTable = true;
                usSpinnerService.spin('customersSpinner');
                customerReportService.getBillsReport(vm.customerIdentification == undefined ? "" : vm.customerIdentification,
                    vm.isPendingPaymentReport == undefined ? false : vm.isPendingPaymentReport ,
                    vm.startDate == undefined ? "" : $filter('date')(vm.startDate, "dd-MM-yyyy"), vm.endDate == undefined ? "" : $filter('date')(vm.endDate, "dd-MM-yyyy"))
                .then(function(response) {
                    vm.resultsLabel = _buildResultsTitle();
                    vm.reportData =  response == null ? [] : response.reportData.size == 0 ? [] : response.reportData;
                    vm.reportSummary = response == null ? [] : response.reportData.size == 0 ? [] : response.reportSummary;
                    vm.gridOptions.api.setRowData(vm.reportData);

                    _autoSizeColumns(columnDefs);

                    vm.dateRange = vm.startDate == undefined ? "" : $filter('date')(vm.startDate, "dd-MM-yyyy") +'/'+ vm.endDate == undefined ? "" : $filter('date')(vm.endDate, "dd-MM-yyyy");
                    vm.gridOptions.api.setFloatingBottomRowData(_createTableFooterData());
                    usSpinnerService.stop('customersSpinner');
                });
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
                    fileName: 'ReporteFacturas_'+vm.dateRange+'.csv',
                    columnSeparator: ','
                };

                params.customFooter = 'TOTALES:,,,,,'+vm.reportSummary.totalSubtotal+','+vm.reportSummary.totalDiscount+','+vm.reportSummary.totalTaxes + ','+ vm.reportSummary.totalNetAmount+','+vm.reportSummary.totalPayments+','+vm.reportSummary.totalBalance;


                vm.gridOptions.api.exportDataAsCsv(params);
            }
        }
        function _autoSizeColumns(columnDefs){
            var allColumnIds = [];
            columnDefs.forEach( function(columnDef) {
                allColumnIds.push(columnDef.field);
            });
            vm.gridOptions.columnApi.autoSizeColumns(allColumnIds);
        }

        function _createTableFooterData() {
            var result = [];
                result.push({
                    billNumber: 'TOTALES:',
                    billStateDesc: '',
                    buyDate: '',
                    customerFullName: '',
                    customerId: '',
                    subTotal: vm.reportSummary.totalSubtotal,
                    totalDiscount: vm.reportSummary.totalDiscount,
                    totalTaxes: vm.reportSummary.totalTaxes,
                    totalAmount: vm.reportSummary.totalNetAmount,
                    paymentsPerformed: vm.reportSummary.totalPayments == null ? 0 : vm.reportSummary.totalPayments ,
                    balance: vm.reportSummary.totalBalance
                });

            return result;
        }

        function _buildResultsTitle() {
            var label = "";
            var datesRangeFiltering = vm.startDate && vm.endDate ? true : false;
            var customerFiltering = vm.customerIdentification ? true : false;
            var paymentPendingFiltering = vm.isPendingPaymentReport;

            if(datesRangeFiltering && !customerFiltering && !paymentPendingFiltering){
                label = "Resultados de consulta  por rango de fechas";
            }
            else if (!datesRangeFiltering && customerFiltering && !paymentPendingFiltering ){
                label = "Resultados de histórico de cliente";
            }
            else if (datesRangeFiltering && customerFiltering && !paymentPendingFiltering ){
                label = "Resultados de consulta de cliente por rango de fechas";
            }
            else if (datesRangeFiltering && customerFiltering && paymentPendingFiltering ){
                label = "Resultados de consulta de cuentas por cobrar de cliente por rango de fechas";
            }
            else if (!datesRangeFiltering && customerFiltering && paymentPendingFiltering ){
                label = "Resultados de histórico de cuentas por cobrar de cliente";
            }
            else if (!datesRangeFiltering && !customerFiltering && paymentPendingFiltering ){
                label = "Resultados de histórico de cuentas por cobrar";
            }
            else if (datesRangeFiltering && !customerFiltering && paymentPendingFiltering ){
                label = "Resultados de consulta de cuentas por cobrar por rango de fechas";
            }
            else if (!datesRangeFiltering && !customerFiltering && !paymentPendingFiltering ){
                label = "Resultados de histórico de facturas";
            }
            else{
                label = "Resultados"
            }
            return label;
        }
    }
})();
