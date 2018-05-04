package com.dewcom.light.billing

import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.utils.LightUtils
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class ExchangeRateController extends RestController {
    static allowedMethods = [get: "GET", create: "POST"]
    def messageSource
    def adminService

    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get exchange rates request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                ExchangeRate exchangeRateFromDB = adminService.getExchangeRateById(tmpId);

                if(exchangeRateFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(exchangeRateFromDB)
                }else{
                    tmpResponse.message = messageSource.getMessage("exchange.rate.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def exchangeRatesFromDB = adminService.getAllExchangeRates();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(exchangeRatesFromDB)
            }
            log.info "====== Get exchange rate response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        ResponseREST tmpResponse = new ResponseREST();
        try {
            adminService.createExchangeRate(request.JSON);
            tmpResponse.message = messageSource.getMessage("generic.create.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de obtener el tipo de cambio
     * @author Leo chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def getExchangeRateByCode() {
        log.info "==========  get exchangeRate configuration  request =========="
        ResponseREST tmpResponse = new ResponseREST();
        def tmpCode = params.long('code')
        try {
            ExchangeRate tmpExchangeRate = adminService.getExchangeRateByCode(tmpCode)
            tmpResponse.message = messageSource.getMessage("get.exchangeRate.configuration.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = JSONMapper.from(tmpExchangeRate)
            log.info "====== get exchange rate configuration response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar el tipo de cambio
     * @author Leo chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def updateExchangeRate() {
        log.info "==========  Update exchangeRate configuration  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        def tmpCode = params.long('code')
        try {
            def newExchangeRate;
            //check validity in case of  request string value
                try{
                    newExchangeRate =  LightUtils.unMarshallDoubleSafe(request.JSON.exchangeRate)
                }
                catch(NumberFormatException ex ){
                    returnBadRequestResponse("El formato del valor  tipo de cambio es incorrecto.")
                }
            ExchangeRate tmpExchangeToModify = adminService.getExchangeRateByCode(tmpCode)
            tmpExchangeToModify.value = newExchangeRate
            adminService.updateExchangeRate(tmpExchangeToModify)
            tmpResponse.message = messageSource.getMessage("update.exchangeRate.configuration.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE

            log.info "====== Update exchange rate configuration response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
