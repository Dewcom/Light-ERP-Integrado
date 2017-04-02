package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateIdentificationTypeREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class ExchangeRateController extends RestController {
    static allowedMethods = [get: "GET"]
    def messageSource
    def adminService

    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get exchange rates request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                ExchangeRate exchangeRateFromDB = adminService.getExchangeRate(tmpId);

                if(exchangeRateFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = exchangeRateFromDB
                }else{
                    tmpResponse.message = messageSource.getMessage("exchange.rate.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def exchangeRatesFromDB = adminService.getAllExchangeRates();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = exchangeRatesFromDB
            }
            log.info "====== Get exchange rate response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
