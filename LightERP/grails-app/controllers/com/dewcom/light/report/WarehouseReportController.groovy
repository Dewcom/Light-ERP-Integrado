package com.dewcom.light.report

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.report.warehouse.request.ProductLotHistoryRequest
import com.dewcom.light.rest.report.warehouse.request.WarehouseMovementsReportRequest
import com.dewcom.light.utils.Constants
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class WarehouseReportController extends RestController {
    static allowedMethods = ["GET"]
    def messageSource
    def warehouseReportService

    /**
     * Este método se encarga de obtener el historial acciones sobre un lote de producto
     * @author Mauricio Fernandez
     */
    @Secured(['ROLE_ANONYMOUS'])
    def getProductLotHistory() {
        log.info "========== Get product lot history  =========="
        log.info params
        try {
            ResponseREST tmpResponse = new ResponseREST()

            ProductLotHistoryRequest tmpRequest = new ProductLotHistoryRequest();
            tmpRequest.startDate = params.startDate
            tmpRequest.endDate = params.endDate
            tmpRequest.lotNumber = params.lotNumber

            tmpRequest.validate();
            if (tmpRequest.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpRequest.errors);
            } else {
                tmpResponse.data = warehouseReportService.getProductLotHistory(tmpRequest);
                tmpResponse.message = messageSource.getMessage("product.lot.history.report.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }
        catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de obtener los tipos de movimientos asociados a un producto o lote de producto en una bodega
     * @author Mauricio Fernandez
     */
    @Secured(['ROLE_ANONYMOUS'])
    def getWarehouseMovements() {
        log.info "========== Get warehouse movements history  =========="
        log.info params
        try {
            ResponseREST tmpResponse = new ResponseREST()

            WarehouseMovementsReportRequest tmpRequest = new WarehouseMovementsReportRequest()
            tmpRequest.startDate = params.startDate
            tmpRequest.endDate = params.endDate
            tmpRequest.lotNumber = params.lotNumber
            tmpRequest.movementType = params.movementType
            tmpRequest.productCode = params.productCode

            tmpRequest.validate()
            if (tmpRequest.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpRequest.errors)
            } else {
                tmpResponse.data = warehouseReportService.getWarehouseMovements(tmpRequest)
                tmpResponse.message = messageSource.getMessage("product.lot.history.report.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }
        catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
