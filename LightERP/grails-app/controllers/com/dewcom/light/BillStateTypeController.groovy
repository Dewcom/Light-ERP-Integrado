package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.ResponseREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class BillStateTypeController extends RestController {
    static allowedMethods = [getAll: "GET"]
    def messageSource
    def adminService


    @Secured(['ROLE_ANONYMOUS'])
    def getAll() {
        ResponseREST tmpResponse = new ResponseREST();
        try {
            def states = adminService.getAllStates();

            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = states

            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
