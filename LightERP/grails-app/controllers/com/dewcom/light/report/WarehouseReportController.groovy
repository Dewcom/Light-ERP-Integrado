package com.dewcom.light.report

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.report.warehouse.request.ProductLotHistoryRequest
import com.dewcom.light.utils.Constants
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class WarehouseReportController extends RestController {
    static allowedMethods = ["GET"]
    def messageSource
    def warehouseReportService

    /**
     * Este método se encarga de obterner el historial acciones sobre un lote de producto
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

    /*
     * Este método se encarga de obterner el historial del patrimonio de inventario
     * @author lchen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def getProductsLegacyReport() {
        log.info "========== Get product lot history  =========="
        log.info params
        try {
            ResponseREST tmpResponse = new ResponseREST()
                tmpResponse.data = warehouseReportService.getProductLegacyReport(params.productCode);
                tmpResponse.message = messageSource.getMessage("product.legacy.report.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }
        catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
