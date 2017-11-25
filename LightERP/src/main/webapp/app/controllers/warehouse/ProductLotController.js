'use strict';

angular
    .module('app.productLot')
    .controller('ProductLotController', ProductLotController);

ProductLotController.$inject = ['$scope', '$stateParams', 'APP_CONSTANTS', '$state', '$uibModal', 'productLotService', 'toaster', '$timeout', '$filter'];
function ProductLotController($scope, $stateParams, APP_CONSTANTS, $state, $uibModal, productLotService, toaster, $timeout, $filter) {
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
        vm.storehouseId = $stateParams.storehouseId;
        vm.currentProduct = $stateParams.filteredProductLotList[0].product;
        vm.productLotList = $stateParams.filteredProductLotList;
    }

    //REGRESA AL LISTADO DE PRODUCTOS POR BODEGA
    vm.goBack = function () {
        var params = {storehouseId: vm.storehouseId};
        $state.go('app.storehouseDetail', params);
    };

    /**=========================================================
     * Validación de campos y patrones
     =========================================================*/
    vm.submitted = false;
    vm.validateInput = function (name, type) {
        var input = vm.modifyProductLotForm[name];
        return (input.$dirty || vm.submitted) && input.$error[type];
    };

    // Submit form
    vm.submitForm = function () {
        vm.submitted = true;
        if (vm.modifyProductLotForm.$valid) {
            updateProductLot();
        } else {
            console.log('Not valid!!');
            return false;
        }
    };

    //ABRE EL MODAL DE DETALLE DE LOTE DE PRODUCTO
    vm.openUpdateProductLotModal = function (productLotObj) {

        var modalInstance = $uibModal.open({
            templateUrl: '/updateProductLotModal.html',
            controller: UpdateModalInstanceCtrl,
            size: 'md',
            resolve: {
                productLot: function () {
                    return productLotObj;
                }
            },
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

    UpdateModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'productLot'];
    function UpdateModalInstanceCtrl($scope, $uibModalInstance, productLot) {
        var vm = this;
        $scope.currentProductLot = JSON.parse(JSON.stringify(productLot));
        $scope.currentProductLot.lotDate = new Date($scope.currentProductLot.lotDate);
        $scope.currentProductLot.expirationDate = new Date($scope.currentProductLot.expirationDate);

        $scope.close = function () {
            $uibModalInstance.close('closed');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

    /**=========================================================
     * Modificar lote de productos
     =========================================================*/

    function updateProductLot() {

        var updatedProductLot = {
            "id": $scope.currentProductLot.id,
            "lotNumber": $scope.currentProductLot.lotNumber,
            "expirationDate": $filter('date')($scope.currentProductLot.expirationDate, "dd-MM-yyyy"),
            "lotDate": $filter('date')($scope.currentProductLot.lotDate, "dd-MM-yyyy"),
            "productOrigin": $scope.currentProductLot.productOrigin,
            "quantity": parseFloat($scope.currentProductLot.quantity)
        };
        console.log(updatedProductLot);
        productLotService.updateProductLot(updatedProductLot).then(function (response) {
            console.log(response);
            var toasterdata;

            if (response.code == "0") {
                //Se hace un update manual ya que la lista de lotes que recibe la vista viene filtrada
                updateCurrentProductLot(updatedProductLot);
                toasterdata = {
                    type: 'success',
                    title: 'Modificar lote',
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

    function updateCurrentProductLot() {
        console.log(vm.productLotList);

        var currentId = $scope.currentProductLot.id;


        var fieldData = vm.productLotList,
            i = 0, ii = vm.productLotList.length;
        for(i; i < ii; i++) if(fieldData[i].Id === $scope.currentProductLot.id) break;

        console.log(i-1);
        vm.productLotList[i-1].lotNumber = $scope.currentProductLot.lotNumber;
        vm.productLotList[i-1].expirationDate = $scope.currentProductLot.expirationDate;
        vm.productLotList[i-1].lotDate = $scope.currentProductLot.lotDate;
        vm.productLotList[i-1].productOrigin = $scope.currentProductLot.productOrigin;
        vm.productLotList[i-1].quantity = $scope.currentProductLot.quantity;
        console.log(vm.productLotList);

    }


}