(function () {
    'use strict';

    angular
        .module('app.client')
        .controller('CustomerPurchasesReportController', CustomerPurchasesReportController);


    CustomerPurchasesReportController.$inject = ['usSpinnerService','customerService', 'productService','customerReportService','$filter',
          '$scope'];
    function CustomerPurchasesReportController(usSpinnerService, customerService, productService,customerReportService,
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

            /**=========================================================
             * Productos
             =========================================================*/

            productService.getAll().then(function (response) {
                vm.productList = $filter('orderBy')(response, 'productCode');
            });

            vm.clearSelected = function() {
                vm.chosenCustomer = undefined;
            };
            vm.clearSelectedProduct = function() {
                vm.selectedProduct = undefined;
            };


            vm.showTable = false;
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
                {headerName: 'Código producto', field: 'productCode', minWidth: 150},
                {headerName: 'Nombre producto', field: 'productName', minWidth: 200},
                {headerName: 'Fecha', field: 'buyDate', minWidth: 110},
                {headerName: 'N.factura', field: 'billNumber', minWidth: 90},
                {headerName: 'Estado factura', field: 'billState', minWidth: 140},
                {headerName: 'Cédula cliente', field: 'customerId', minWidth: 120},
                {headerName: 'Nombre cliente', field: 'customerFullName', minWidth: 250},
                {headerName: 'Moneda', field: 'currency', minWidth: 90},
                {headerName: 'Porcentaje utilidad real', field: 'utilityPercentage', filter: 'number', minWidth: 170,  cellFormatter: percentageFormatter, cellClass: 'number-cell'},
                {headerName: 'Tipo cambio', field: 'exchange', minWidth: 120, cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Cantidad', field: 'quantity', filter: 'number', minWidth: 90},
                {headerName: 'Utilidad real', field: 'utilityAmount', filter: 'number', minWidth: 150,  cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Precio venta', field: 'buyPrice', filter: 'number', minWidth: 150,  cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Costo total', field: 'cost', filter: 'number', minWidth: 150,  cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Impuestos de venta', field: 'totalTaxAmount', filter: 'number', minWidth: 150,  cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
            ];

            function colonCurrencyFormatter(params) {
                return params.value == undefined ? '': $filter('currency')(params.value, '&#8353; ', 2);
            }
            function percentageFormatter(params) {
                return params.value == undefined ? '':  params.value + ' &#37;';
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
                customerReportService.getPurchasesReport(vm.chosenCustomer == undefined ? "" : vm.chosenCustomer.identification,
                    vm.selectedProduct == undefined ? "" : vm.selectedProduct.productCode ,
                    $filter('date')(vm.startDate, "dd-MM-yyyy"), $filter('date')(vm.endDate, "dd-MM-yyyy"))
                .then(function(response) {
                    vm.reportData =  response == null ? [] : response.reportData.size == 0 ? [] : response.reportData;
                    vm.reportSummary = response == null ? [] : response.reportData.size == 0 ? [] : response.reportSummary;
                    vm.gridOptions.api.setRowData(vm.reportData);
                    if(vm.showBillCustomerInfo){
                        vm.gridOptions.api.sizeColumnsToFit();
                        _autoSizeColumns(columnDefs);
                    }
                    else{
                        vm.gridOptions.api.sizeColumnsToFit();
                    }
                    vm.dateRange = $filter('date')(vm.startDate, "dd-MM-yyyy") +'/'+$filter('date')(vm.endDate, "dd-MM-yyyy");
                    vm.gridOptions.api.setFloatingBottomRowData(_createTableFooterData());
                    usSpinnerService.stop('customersSpinner');
                });
            };

          vm.showBillCustomerColumns = function () {
                vm.gridOptions.columnApi.setColumnsVisible(['billNumber','billState', 'customerFullName', 'customerId'], vm.showBillCustomerInfo);
                if(vm.showBillCustomerInfo == false) {
                    vm.gridOptions.api.sizeColumnsToFit();
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

                params.customFooter = 'TOTALES:,,,,,,,,,,'+vm.reportSummary.totalQuantity+','+vm.reportSummary.totalUtilityAmount+','+vm.reportSummary.totalGrossPrice+','+vm.reportSummary.totalCost+','+vm.reportSummary.totalTaxAmount;


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
                    productCode: 'TOTALES:',
                    productName: '',
                    buyDate: '',
                    billNumber: '',
                    billState: '',
                    customerId: '',
                    customerFullName: '',
                    currency: '',
                    utilityPercentage: undefined,
                    exchange: undefined,
                    quantity: vm.reportSummary.totalQuantity,
                    utilityAmount: vm.reportSummary.totalUtilityAmount,
                    buyPrice: vm.reportSummary.totalGrossPrice,
                    cost: vm.reportSummary.totalCost,
                    totalTaxAmount: vm.reportSummary.totalTaxAmount
                });

            return result;
        }
    }
})();
