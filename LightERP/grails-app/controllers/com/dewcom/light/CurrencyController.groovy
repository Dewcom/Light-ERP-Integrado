package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateIdentificationTypeREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class CurrencyController extends RestController {
    static allowedMethods = [get: "GET"]
    def messageSource
    def adminService

    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        ResponseREST tmpResponse = new ResponseREST();
        try {
            def currencies = adminService.getAllCurrencies();

            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = currencies

            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
