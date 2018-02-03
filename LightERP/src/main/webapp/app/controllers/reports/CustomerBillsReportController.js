(function () {
    'use strict';

    angular
        .module('app.client')
        .controller('CustomerBillsReportController', CustomerBillsReportController);


    CustomerBillsReportController.$inject = ['usSpinnerService', 'customerService', 'customerReportService', '$filter',
        '$scope'];
    function CustomerBillsReportController(usSpinnerService, customerService, customerReportService,
                                $filter, $scope) {

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

            /**=========================================================
             * Clientes
             =========================================================*/

            customerService.getAll().then(function (response) {
                vm.customerList = response;
            });

            vm.resultsLabel= "";
            vm.showTable = false;
            vm.dateRange = "";
            // Submit form
            vm.submitForm = function() {
                vm.fillTable();
            };


            vm.clearSelected = function() {
                vm.chosenCustomer = undefined;
            };


            // Basic
            var columnDefs = [
                {headerName: 'N.factura', field: 'billNumber', minWidth: 120},
                {headerName: 'Estado factura', field: 'billStateDesc', minWidth: 140},
                {headerName: 'Fecha', field: 'buyDate', minWidth: 110},
                {headerName: 'Nombre cliente', field: 'customerFullName', minWidth: 255},
                {headerName: 'Cédula cliente', field: 'customerId', minWidth: 120},
                {headerName: 'Moneda', field: 'currency', minWidth: 90},
                {headerName: 'Tipo cambio', field: 'exchange', minWidth: 120, cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Condición crédito', field: 'creditCondition', filter: 'number', minWidth: 150, cellFormatter: creditConditionFormatter, cellClass: 'number-cell'},
                {headerName: 'Fecha pago', field: 'paymentMaxDate', filter: 'number', minWidth: 120, cellClass: 'number-cell'},
                {headerName: 'Días de vencida', field: 'expirationDays', filter: 'number', minWidth: 150, cellFormatter: expirationDaysFormatter, cellClass: 'number-cell'},
                {headerName: 'Subtotal', filter: 'number', field: 'subTotal', cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell', minWidth: 150},
                {headerName: 'Descuento', field: 'totalDiscount', filter: 'number', minWidth: 120 , cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Impuestos', field: 'totalTaxes', filter: 'number', minWidth: 120 , cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Total', field: 'totalAmount', filter: 'number', minWidth: 150, cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Pagos', field: 'paymentsPerformed', filter: 'number', minWidth: 120},
                {headerName: 'Saldo', field: 'balance', filter: 'number', minWidth: 150, cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'}
            ];

            function colonCurrencyFormatter(params) {
                return params.value == undefined ? '': $filter('currency')(params.value, '&#8353; ', 2);
            }

            function expirationDaysFormatter(params) {
                return params.value == undefined ? '': params.value +' d&iacute;as ';
            }

            function creditConditionFormatter(params) {
                var result;
                if(params.value == 0){
                    result = '**CONTADO**'
                }
                else{
                    result =  params.value == undefined ? '': params.value +' d&iacute;as '
                }
                return result ;
            }


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
                        return {'font-weight': 'bold', 'background-color': '#EDF1F2','font-size': '16px',
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
                customerReportService.getBillsReport(vm.chosenCustomer == undefined ? "" : vm.chosenCustomer.identification,
                    vm.isPendingPaymentReport == undefined ? false : vm.isPendingPaymentReport ,
                    vm.startDate == undefined ? "" : $filter('date')(vm.startDate, "dd-MM-yyyy"), vm.endDate == undefined ? "" : $filter('date')(vm.endDate, "dd-MM-yyyy"))
                .then(function(response) {
                    vm.resultsLabel = _buildResultsTitle();
                    vm.reportData =  response == null ? [] : response.reportData.size == 0 ? [] : response.reportData;
                    vm.reportSummary = response == null ? [] : response.reportData.size == 0 ? [] : response.reportSummary;
                    vm.gridOptions.api.setRowData(vm.reportData);

                    _autoSizeColumns(vm.gridOptions.columnDefs);

                    vm.gridOptions.columnApi.setColumnsVisible(['creditCondition','paymentMaxDate', 'expirationDays'], vm.isPendingPaymentReport);

                    vm.dateRange = vm.startDate == undefined ? "" : $filter('date')(vm.startDate, "dd-MM-yyyy") +'/'+ (vm.endDate == undefined ? "" : $filter('date')(vm.endDate, "dd-MM-yyyy"));
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

                params.customFooter = 'TOTALES:,,,,,,,,,,'+vm.reportSummary.totalSubtotal+','+vm.reportSummary.totalDiscount+','+vm.reportSummary.totalTaxes + ','+ vm.reportSummary.totalNetAmount+','+vm.reportSummary.totalPayments+','+vm.reportSummary.totalBalance;

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
                    currency: '',
                    exchange: undefined,
                    creditCondition: undefined,
                    paymentMaxDate: '',
                    expirationDays: undefined,
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
