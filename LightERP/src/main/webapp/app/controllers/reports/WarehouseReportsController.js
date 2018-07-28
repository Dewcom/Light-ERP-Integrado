(function () {
    'use strict';

    angular
        .module('app.client')
        .controller('WarehouseReportsController', WarehouseReportsController);


    WarehouseReportsController.$inject = ['usSpinnerService', '$http', '$uibModal', '$resource', 'warehouseReportService', 'toaster', '$state', '$filter', 'productService'];
    function WarehouseReportsController(usSpinnerService, $http, $uibModal, $resource, warehouseReportService, toaster, $state, $filter, productService) {

        var vm = this;
        vm.legacyReport= {};
        vm.movementsReport= {};
        vm.legacyReport.showAmounts = true;
        vm.productLotHistoryreport= {};
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

            vm.openMovementsStartDate = function ($event) {
                vm.isMovementsStartDateOpened = true;
            };

            vm.openMovementsEndDate = function ($event) {
                vm.isMovementsEndDateOpened = true;
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
             * Productos
             =========================================================*/
            productService.getAll().then(function (response) {
                vm.productList = $filter('orderBy')(response, 'productCode');
            });

            vm.legacyReport.clearSelected = function() {
                vm.legacyReport.selectedProduct = undefined;
            };


            vm.productLotHistoryreport.showTable = false;
            vm.legacyReport.showTable = false;
            vm.movementsReport.showTable = false;
            // Submit form
            vm.submitForm = function() {
                vm.fillTable();
            };
            // Basic
            var columnDefs = [
                {headerName: 'Número de lote', field: 'modifiedItemCode', minWidth: 150},
                {headerName: 'Fecha de modificación', field: 'modificationDate', minWidth: 150},
                {headerName: 'Acción', field: 'action', minWidth: 150},
                {headerName: 'Detalles', field: 'details', minWidth: 200},
                {headerName: 'Modificado por', field: 'username', minWidth: 150}
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
                vm.productLotHistoryreport.showTable = true;
                usSpinnerService.spin('customersSpinner');

                var startDate = $filter('date')(vm.startDate, "yyyy-MM-dd");
                var endDate = $filter('date')(vm.endDate, "yyyy-MM-dd");
                var lotNumber = vm.lotNumber;

                warehouseReportService.getProductLotHistory(startDate, endDate, lotNumber)
                    .then(function(response) {
                        console.log(response);
                        vm.productLotHistoryreport.reportData =  response == null ? [] : response.data.size == 0 ? [] : response.data;
                        vm.productLotHistoryreport.reportSummary = response == null ? [] : response.data.size == 0 ? [] : response.data;
                        vm.gridOptions.api.setRowData(vm.reportData);

                        _autoSizeColumns(vm.gridOptions, columnDefs);

                        vm.productLotHistoryreport.dateRange = vm.productLotHistoryreport.startDate == undefined ? "" : $filter('date')(vm.productLotHistoryreport.startDate, "dd-MM-yyyy") +'/'+ vm.productLotHistoryreport.endDate == undefined ? "" : $filter('date')(vm.productLotHistoryreport.endDate, "dd-MM-yyyy");
                        usSpinnerService.stop('customersSpinner');
                    });
            };

            function _autoSizeColumns(gridOptions ,columnDefs){
                var allColumnIds = [];
                columnDefs.forEach( function(columnDef) {
                    allColumnIds.push(columnDef.field);
                });
                gridOptions.columnApi.autoSizeColumns(allColumnIds);
            }

            vm.exportToCsv = function() {
                console.log("text");
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
                    fileName: 'HistorialLote' + vm.dateRange + '.csv',
                    columnSeparator: ','
                };

                vm.gridOptions.api.exportDataAsCsv(params);
            };


            /***********PRODUCTS LEGACY REPORT***********/

            var legacyReportcolumnDefs = [
                {headerName: 'Código de producto', field: 'productCode', minWidth: 150},
                {headerName: 'Nombre', field: 'productName', minWidth: 150},
                {headerName: 'Unidad de medida', field: 'symbol', minWidth: 150, sortingOrder: [null]},
                {headerName: 'Tipo cambio', field: 'exchangeRate', minWidth: 200, cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell', sortingOrder: [null]},
                {headerName: 'Costo colones', comparator:amountComp, field: 'colonesCost', minWidth: 150, cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Costo dolares',comparator:amountComp, field: 'dollarsCost', minWidth: 150, cellFormatter: dollarsCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Existencias', field: 'stock', minWidth: 150},
                {headerName: 'Total costo colones', comparator:amountComp,  field: 'totalColonesCost', minWidth: 150, cellFormatter: colonCurrencyFormatter, cellClass: 'number-cell'},
                {headerName: 'Total costo dolares', comparator:amountComp,  field: 'totalDollarsCost', minWidth: 150, cellFormatter: dollarsCurrencyFormatter, cellClass: 'number-cell'}
            ];

            vm.gridOptionsLegacyReport = {
                columnDefs: legacyReportcolumnDefs,
                rowData: [],
                enableFilter: false,
                enableSorting: true,
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

            vm.fillProductLegacyTable = function () {
                vm.legacyReport.showTable = true;
                usSpinnerService.spin('customersSpinner');

                var selectedProductCode = vm.legacyReport.selectedProduct != undefined ? vm.legacyReport.selectedProduct.productCode : "" ;

                warehouseReportService.getProductsLegacy(selectedProductCode)
                    .then(function(response) {
                        console.log(response);
                        vm.legacyReport.reportData =  response == null ? [] : response.data.size == 0 ? [] : response.data.reportData;
                        vm.legacyReport.reportSummary = response == null ? [] : response.data.size == 0 ? [] : response.data.reportSummary;

                        var footerWrapper ={
                            productCode: 'TOTALES:',
                            productName: '',
                            symbol: '',
                            exchangeRate: undefined,
                            colonesCost: vm.legacyReport.reportSummary.totalColonesCost,
                            dollarsCost: vm.legacyReport.reportSummary.totalDollarsCost,
                            stock: vm.legacyReport.reportSummary.totalStock,
                            totalColonesCost: vm.legacyReport.reportSummary.totalColonesCostAmount,
                            totalDollarsCost: vm.legacyReport.reportSummary.totalDollarsCostAmount
                        };

                        vm.gridOptionsLegacyReport.api.setRowData(vm.legacyReport.reportData);
                        vm.gridOptionsLegacyReport.api.setFloatingBottomRowData(_createTableFooterData(footerWrapper));
                        if(vm.legacyReport.showAmounts){
                            vm.gridOptionsLegacyReport.api.sizeColumnsToFit();
                            _autoSizeColumns(vm.gridOptionsLegacyReport, legacyReportcolumnDefs);
                        }
                        else{
                            vm.gridOptionsLegacyReport.api.sizeColumnsToFit();
                        }

                        usSpinnerService.stop('customersSpinner');
                    });
            };


            /*********** WAREHOUSE MOVEMENTS REPORT ***********/

            var warehouseMovmentsReportcolumnDefs = [
                {headerName: 'Número de lote', field: 'lotCode', minWidth: 150},
                {headerName: 'Código de producto', field: 'productCode', minWidth: 150},
                {headerName: 'Producto', field: 'productName', minWidth: 150, sortingOrder: [null]},
                {headerName: 'Cantidad', field: 'quantity', minWidth: 150},
                {headerName: 'Movimiento', field: 'movementType', minWidth: 150},
                {headerName: 'Detalles', field: 'details', minWidth: 150},
                {headerName: 'Fecha', field: 'movementDate', minWidth: 150},
                {headerName: 'Usuario', field: 'username', minWidth: 150}
            ];

            vm.gridOptionsWarehouseMovementsReport = {
                columnDefs: warehouseMovmentsReportcolumnDefs,
                rowData: [],
                enableFilter: false,
                enableSorting: true,
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

            vm.fillWarehouseMovementsReportTable = function () {
                vm.movementsReport.showTable = true;
                usSpinnerService.spin('customersSpinner');

                var lotNumber = vm.movementsReport.lotNumber != undefined ? vm.movementsReport.lotNumber : "" ;
                var productCode = vm.movementsReport.productCode != undefined ? vm.movementsReport.productCode : "" ;
                var startDate = $filter('date')(vm.movementsReport.startDate, "yyyy-MM-dd");
                var endDate = $filter('date')(vm.movementsReport.endDate, "yyyy-MM-dd");

                warehouseReportService.getWarehouseMovementsReport(productCode, startDate, endDate, lotNumber)
                    .then(function(response) {
                        console.log(response);

                        usSpinnerService.stop('customersSpinner');
                        vm.movementsReport.reportData = response == null ? [] : response.data.size == 0 ? [] : response.data.reportData;

                       /* var footerWrapper = {
                            productCode: 'TOTALES:',
                            productName: '',
                            symbol: ''
                        };*/

                        vm.gridOptionsWarehouseMovementsReport.api.setRowData(vm.movementsReport.reportData);
                        //vm.gridOptionsWarehouseMovementsReport.api.setFloatingBottomRowData(_createTableFooterData(footerWrapper));
                        if(vm.movementsReport.showAmounts){
                            vm.gridOptionsWarehouseMovementsReport.api.sizeColumnsToFit();
                            _autoSizeColumns(vm.gridOptionsWarehouseMovementsReport, legacyReportcolumnDefs);
                        }
                        else{
                            vm.gridOptionsWarehouseMovementsReport.api.sizeColumnsToFit();
                        }

                        usSpinnerService.stop('customersSpinner');
                    });
            };


            function _createTableFooterData(footerDataWrapper) {
                var result = [];
                result.push(footerDataWrapper);

                return result;
            }

            vm.exportLegacyReportAsCvs = function () {
                var columns=  'TOTALES:,,,,'+vm.legacyReport.reportSummary.totalColonesCost+','+vm.legacyReport.reportSummary.totalDollarsCost+','+vm.legacyReport.reportSummary.totalStock+','+vm.legacyReport.reportSummary.totalColonesCostAmount+','+vm.legacyReport.reportSummary.totalDollarsCostAmount;
                exportToCsv('warehouseProductLegacyRpt.csv', columns, vm.gridOptionsLegacyReport  );
            };

            vm.legacyReport.showAmountsColumns = function () {
                var columns =['colonesCost','dollarsCost', 'totalColonesCost', 'totalDollarsCost', 'exchangeRate'];
               showHideColumns(columns, vm.gridOptionsLegacyReport, vm.legacyReport.showAmounts)
            };
        }

        function colonCurrencyFormatter(params) {
            return params.value == undefined ? '': $filter('currency')(params.value, '&#8353; ', 2);
        }

        function amountComp(val1, val2){
            return val1 - val2;
        }

        function dollarsCurrencyFormatter(params) {
            return params.value == undefined ? '': $filter('currency')(params.value, '&#036;', 2);
        }

        function exportToCsv(fileName, columns, grid) {
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
                fileName: fileName,
                columnSeparator: ','
            };

            params.customFooter = columns;
            grid.api.exportDataAsCsv(params);
        }

        function showHideColumns(columns, grid, action) {
            grid.columnApi.setColumnsVisible(columns, action);
            grid.api.sizeColumnsToFit();
            autoSizeColumns(grid, columns )
        }
    }
})();
