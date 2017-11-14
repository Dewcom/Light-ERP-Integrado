package com.dewcom.light.report

import com.dewcom.light.rest.report.customer.request.CustomerBillsReportReq
import com.dewcom.light.utils.Constants
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.report.customer.request.CustomerPurchasesReportReq
import com.dewcom.light.utils.ParamsMapperUtil
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured


/*
Esta clase contiene todos los endpoints de reportes referentes a cualquier interaccion relacionada a un cliente con la aplicacion
ya sean compras de productos, facturas realizadas, etc.
 */
class CustomerReportController extends RestController {
    static allowedMethods = ["GET"]
    def messageSource
    def customerReportService

    /**
     * Este método se encarga de obtener una lista de productos comprados por un cliente a partir de ciertos
     * criterios de filtrado
     * @author Leonardo Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def getCustomerProductPurchases() {
        log.info "========== Get customer product purchases  =========="
        try{
            ResponseREST tmpResponse = new ResponseREST()
            CustomerPurchasesReportReq tmpReportReq =  ParamsMapperUtil.buildReportDtoFromParams(new CustomerPurchasesReportReq(), params)
            tmpReportReq.validate();
            if (tmpReportReq.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpReportReq.errors);
            } else {

                tmpResponse.message = messageSource.getMessage("purchases.report.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = customerReportService.getCustomerProductPurchases(tmpReportReq);
            }
            render tmpResponse as JSON
        }
        catch(Exception e){
            this.handleRESTExceptions(messageSource, e)
        }
    }


    /**
     * Este método se encarga de obtener una lista de facturas realizadas por un cliente a partir de ciertos
     * criterios de filtrado especificos para diferentes enfoques.
     * @author Leonardo Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def getCustomerBills() {
        log.info "========== Get customer bills report   =========="
        try{
            ResponseREST tmpResponse = new ResponseREST()
            CustomerBillsReportReq tmpReportReq =  ParamsMapperUtil.buildReportDtoFromParams(new CustomerBillsReportReq(), params)
            tmpReportReq.validate();
            if (tmpReportReq.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpReportReq.errors);
            } else {

                tmpResponse.message = messageSource.getMessage("bills.report.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = customerReportService.getCustomerBills(tmpReportReq);
            }
            render tmpResponse as JSON
        }
        catch(Exception e){
            this.handleRESTExceptions(messageSource, e)
        }
    }


}
