(function () {
    'use strict';

    angular
        .module('app.storehouse')
        .controller('StorehouseDetailController', StorehouseDetailController);

    StorehouseDetailController.$inject = ['$uibModal', '$http', '$state', '$stateParams', '$scope', 'storehouseService', 'APP_CONSTANTS', 'usSpinnerService', '$filter', 'productLotService', 'productService', 'toaster', '$timeout', 'productTypeService', '$window'];
    function StorehouseDetailController($uibModal, $http, $state, $stateParams, $scope, storehouseService, APP_CONSTANTS, usSpinnerService, $filter, productLotService, productService, toaster, $timeout, productTypeService, $window) {
        var vm = this;
        $scope.globalConstants = APP_CONSTANTS;
        activateProductLotDateCalendar();
        activateExpirationDateCalendar();

        var storehouseProdList;

        /**=========================================================
         * Inicializa el calendarios
         =========================================================*/

        function activateProductLotDateCalendar() {
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

            vm.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.opened = true;
                vm.openedExpDate = false;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.format = 'dd-MM-yyyy';
        }

        function activateExpirationDateCalendar() {
            vm.todayExpDate = function () {
                vm.dtExpDate = new Date();
            };
            vm.todayExpDate();

            vm.clear = function () {
                vm.dtExpDate = null;
            };

            // Disable weekend selection
            vm.disabledExpDate = function (date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMinExpDate = function () {
                vm.minDateExpDate = vm.minDateExpDate ? null : new Date();
            };
            vm.toggleMinExpDate();

            vm.openExpDate = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.openedExpDate = true;
                vm.opened = false;
            };

            vm.dateOptionsExpDate = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDateExpDate = new Date('2019-10-20');
            vm.formatExpDate = 'dd-MM-yyyy';
        }

        init();

        function init() {
            console.log($stateParams);

            if($stateParams.tabIndex == 0){
                $scope.tab1 = true;
            }else{
                $scope.tab2 = true;
            }

            var storehouse;
            storehouseService.get($stateParams.storehouseId).then(function (response) {

                if (response.code == '0') {
                    vm.currentStorehouse = response.data;
                    formatStorehouseProductList(response.data.productLots);
                }
                usSpinnerService.stop('productLotsSpinner');
            });

            /**=========================================================
             * Productos
             =========================================================*/

            productService.getAll().then(function (response) {
                vm.productList = $filter('orderBy')(response, 'productCode');
            });

            /**=========================================================
             * Tipos de producto
             =========================================================*/

            productTypeService.getAll().then(function (response) {
                vm.productTypeList = response;
            });

        }

        //REGRESA AL DASHBOARD DE BODEGAS
        vm.goBack = function () {
            var params = {tabIndex: 1};
            $state.go('app.warehouseMain', params);
        };

        vm.loadMoreProducts = function() {
            vm.storehouseProdListInf = vm.storehouseProdList.slice(0, vm.storehouseProdListInf.length + 10);
        };

        vm.goToProductLotDetail = function(productObj) {
            // Filtra la lista de lotes por producto
            var filteredProductLotList = vm.currentStorehouse.productLots.filter(function (productLot) {
                return (productLot.product.productCode == productObj.productCode);
            });
            $state.go('app.productLotDetail', {filteredProductLotList : filteredProductLotList, storehouseId : vm.currentStorehouse.id});
        };

        vm.filterProducts = function(){
            vm.storehouseProdListInf = vm.storehouseProdList

            if(vm.search == undefined || vm.search == ''){
                vm.storehouseProdListInf = vm.storehouseProdList.slice(0,10);
                vm.disableInfScroll = false;
            }else{
                var listByCode = $filter('filter')(vm.storehouseProdList, {productCode: vm.search });
                var listByName = $filter('filter')(vm.storehouseProdList, {name: vm.search });
                vm.storehouseProdListInf = listByName.concat(listByCode);
                vm.disableInfScroll = true;
            }
        };


        /**=========================================================
         * Validación de campos y patrones
         =========================================================*/
        vm.submitted = false;
        vm.validateInput = function (name, type) {
            var input = vm.productLotForm[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
        };

        // Submit form
        vm.submitForm = function () {
            vm.submitted = true;
            if (vm.productLotForm.$valid) {
                addProductLot();
            } else {
                console.log('Not valid!!');
                return false;
            }
        };

        function formatStorehouseProductList(productLotList){

            var formatProductLotList = [];

            angular.forEach(productLotList, function (productLotListValue, productLotListKey) {
                var itemFound = false;

                var item = {"productCode": productLotListValue.product.productCode,
                    "name": productLotListValue.product.name,
                    "measureUnit": productLotListValue.product.measureUnit.symbol,
                    "productType": productLotListValue.product.productType.name,
                    "lotTotal": 1,
                    "productTotal": productLotListValue.quantity,
                    "productObj": productLotListValue.product};

                if(formatProductLotList.length > 0){
                    angular.forEach(formatProductLotList, function (value, key) {
                        if(value.productCode === item.productCode){
                            value.lotTotal ++;
                            value.productTotal += productLotListValue.quantity;

                            itemFound = true;
                        }
                    });

                    if(!itemFound){
                        formatProductLotList.push(item);
                    }

                }else{
                    formatProductLotList.push(item);
                }
            });

            formatProductLotList.sort(function(a, b){
                if(a.productCode < b.productCode) return -1;
                if(a.productCode > b.productCode) return 1;
                return 0;
            });

            vm.storehouseProdList = formatProductLotList;
            vm.storehouseProdListInf = vm.storehouseProdList.slice(0,10);
        }

        //ABRE EL MODAL DE AGREGAR UN LOTE DE PRODUCTO
        vm.openAddProductLotModal = function () {

            var modalInstance = $uibModal.open({
                templateUrl: '/addProductLotModal.html',
                controller: AddModalInstanceCtrl,
                size: 'lg',
                backdrop: 'static', // No cierra clickeando fuera
                keyboard: false // No cierra con escape
            });

            var state = $('#modal-state');
            modalInstance.result.then(function () {
                state.text('Modal dismissed with OK status');
            }, function () {
                state.text('Modal dismissed with Cancel status');
            });
        };

        AddModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
        function AddModalInstanceCtrl($scope, $uibModalInstance) {
            var vm = this;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.chooseProduct = function(product){
                vm.selectecProduct = product;
            };
        }

        /**=========================================================
         * Agregar lote de productos
         =========================================================*/

        function addProductLot() {

            /*console.log($window.sessionStorage["userInfo"].userName);

            var userinfo = JSON.parse($window.sessionStorage["userInfo"]);

            console.log(userinfo.userName);

            console.log(userinfo.role);*/

            var newProductLot = {
                "username" : JSON.parse($window.sessionStorage["userInfo"]).userName,
                "lotNumber": $scope.addProductLotForm.lotNumber,
                "expirationDate": $filter('date')($scope.addProductLotForm.expirationDate, "dd-MM-yyyy"),
                "lotDate": $filter('date')($scope.addProductLotForm.lotDate, "dd-MM-yyyy"),
                "quantity": parseInt($scope.addProductLotForm.quantity),
                "productId": vm.selectedProduct.id,
                "storehouseId":  vm.currentStorehouse.id
            };
            console.log(newProductLot);
            productLotService.addProductLot(newProductLot).then(function (response) {
                console.log(response);
                var toasterdata;

                if (response.code == "0") {
                    toasterdata = {
                        type: 'success',
                        title: 'Agregar lote',
                        text: response.message
                    };
                } else {
                    toasterdata = {
                        type: 'warning',
                        title: 'Lote',
                        text: response.message
                    };

                }
                pop(toasterdata);
                $timeout(function () {
                    $state.reload();
                }, 3000);
            }, function (error) {
                console.log(error);
            });
            $scope.cancel();
        }

        function pop(toasterdata) {
            toaster.pop({
                type: toasterdata.type,
                title: toasterdata.title,
                body: toasterdata.text
            });
        }
    }

    /**
     * AngularJS default filter with the following expression:
     * "person in people | filter: {name: $select.search, age: $select.search}"
     * performs a AND between 'name: $select.search' and 'age: $select.search'.
     * We want to perform a OR.
     */

    (function () {
        'use strict';

        angular
            .module('app.forms')
            .filter('propsFilter', propsFilter);

        function propsFilter() {
            return filterFilter;

            ////////////////
            function filterFilter(items, props) {
                var out = [];

                if (angular.isArray(items)) {
                    items.forEach(function (item) {
                        var itemMatches = false;

                        var keys = Object.keys(props);
                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            }
        }

    })();

})();
