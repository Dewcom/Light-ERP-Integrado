(function () {
    'use strict';

    angular
        .module('app.client')
        .controller('WarehouseReportsController', WarehouseReportsController);


    WarehouseReportsController.$inject = ['usSpinnerService', '$http', '$uibModal', '$resource', 'warehouseReportService', 'toaster', '$state', '$filter'];
    function WarehouseReportsController(usSpinnerService, $http, $uibModal, $resource, warehouseReportService, toaster, $state, $filter) {

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
                vm.showTable = true;
                usSpinnerService.spin('customersSpinner');

                var startDate = $filter('date')(vm.startDate, "yyyy-MM-dd");
                var endDate = $filter('date')(vm.endDate, "yyyy-MM-dd");
                var lotNumber = vm.lotNumber;

                warehouseReportService.getProductLotHistory(startDate, endDate, lotNumber)
                    .then(function(response) {
                        console.log(response);
                        vm.reportData =  response == null ? [] : response.data.size == 0 ? [] : response.data;
                        vm.reportSummary = response == null ? [] : response.data.size == 0 ? [] : response.data;
                        vm.gridOptions.api.setRowData(vm.reportData);

                        _autoSizeColumns(columnDefs);

                        vm.dateRange = vm.startDate == undefined ? "" : $filter('date')(vm.startDate, "dd-MM-yyyy") +'/'+ vm.endDate == undefined ? "" : $filter('date')(vm.endDate, "dd-MM-yyyy");
                        usSpinnerService.stop('customersSpinner');
                    });
            };

            function _autoSizeColumns(columnDefs){
                var allColumnIds = [];
                columnDefs.forEach( function(columnDef) {
                    allColumnIds.push(columnDef.field);
                });
                vm.gridOptions.columnApi.autoSizeColumns(allColumnIds);
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
            }

        }

    }
})();
