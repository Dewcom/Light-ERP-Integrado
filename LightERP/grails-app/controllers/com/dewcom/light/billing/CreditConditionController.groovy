package com.dewcom.light.billing

import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.ResponseREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class CreditConditionController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", delete:"DELETE", update:"PUT"]
    def messageSource
    def adminService

    @Secured(['ROLE_ANONYMOUS'])
    def getAll() {
        ResponseREST tmpResponse = new ResponseREST();
        try {
            def creditConditions = adminService.getAllCreditConditions();

            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = JSONMapper.listFrom(creditConditions)

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
            if(!request.JSON.days){
                returnBadRequestResponse("El atributo dias es requerido")
            }
            else if(!request.JSON.description){
                returnBadRequestResponse("El atributo descripcion es requerido")
            }

            CreditCondition tmpCreditCon = new CreditCondition(description:request.JSON.description, days: request.JSON.days as Integer)
            tmpCreditCon.code= adminService.getMaxCreditConCode() + 1
            def createdCond = adminService.createOrUpdateCreditCon(tmpCreditCon);
            tmpResponse.message = messageSource.getMessage("generic.create.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = [id: createdCond.id]
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        ResponseREST tmpResponse = new ResponseREST();
        def tmpId = params.long('id')
        try {
            if(!request.JSON.days){
                returnBadRequestResponse("El atributo dias es requerido")
            }
            else if(!request.JSON.description){
                returnBadRequestResponse("El atributo descripcion es requerido")
            }

            CreditCondition tmpCreditConToModify = CreditCondition.findByIdAndEnabled(tmpId, Constants.ESTADO_ACTIVO)
            tmpCreditConToModify.days = request.JSON.days as Integer
            tmpCreditConToModify.description = request.JSON.description
            adminService.createOrUpdateCreditCon(tmpCreditConToModify);
            tmpResponse.message = messageSource.getMessage("generic.update.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        ResponseREST tmpResponse = new ResponseREST();
        def tmpId = params.long('id')
        try {
            CreditCondition tmpCreditCon = CreditCondition.findByIdAndEnabled(tmpId, Constants.ESTADO_ACTIVO)
            adminService.deleteCreditCondition(tmpCreditCon);
            tmpResponse.message = messageSource.getMessage("generic.delete.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }
        catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
