package com.dewcom.light.warehouse

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class MeasureUnitController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", delete:"DELETE", update:"PUT"]
    def messageSource
    def adminService

    @Secured(['ROLE_ANONYMOUS'])
    def getAll() {
        ResponseREST tmpResponse = new ResponseREST();
        try {
            def measureUnits = adminService.getAllMeasureUnits();

            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = JSONMapper.listFrom(measureUnits)

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
            if(!request.JSON.name){
                returnBadRequestResponse("El atributo nombre es requerido")
            }

            MeasureUnit tmpMeasure = new MeasureUnit(name: request.JSON.name, symbol: request.JSON.symbol)
            tmpMeasure.code= adminService.getMaxMeasureUnitCode() + 1
            def createdMeasure = adminService.createOrUpdateMeasureUnit(tmpMeasure)
            tmpResponse.message = messageSource.getMessage("generic.create.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = [id: createdMeasure.id]
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
            if(!request.JSON.name){
                returnBadRequestResponse("El atributo name es requerido")
            }

            MeasureUnit tmpMeasureUnit = MeasureUnit.findByIdAndEnabled(tmpId, Constants.ESTADO_ACTIVO)
            tmpMeasureUnit.name = request.JSON.name
            tmpMeasureUnit.symbol = request.JSON.symbol
            adminService.createOrUpdateMeasureUnit(tmpMeasureUnit);
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
            MeasureUnit tmpMeasureUnit = MeasureUnit.findByIdAndEnabled(tmpId, Constants.ESTADO_ACTIVO)
            adminService.deleteMeasureUnit(tmpMeasureUnit);
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
