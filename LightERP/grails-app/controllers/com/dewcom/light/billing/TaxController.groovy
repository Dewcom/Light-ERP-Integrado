package com.dewcom.light.billing

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import com.dewcom.light.utils.LightUtils
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class TaxController extends RestController {
    static allowedMethods = [get: "GET", delete: "DELETE", create: "POST", update: "PUT"]
    def messageSource
    def adminService

    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get taxes  request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                Taxes taxFromDb = adminService.getTaxById(tmpId);

                if(taxFromDb){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(taxFromDb)
                }else{
                    tmpResponse.message = messageSource.getMessage("tax.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def taxesFromDb = adminService.getAllTaxes();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(taxesFromDb)
            }
            log.info "====== Get taxes rate response ======"
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
            if(!request.JSON.percentage){
                returnBadRequestResponse("El atributo porcentaje es requerido")
            }
            else if(!request.JSON.description){
                returnBadRequestResponse("El atributo descripcion es requerido")
            }
            def percentageValue;
            //check validity in case of  request string value
            try{
                percentageValue =  LightUtils.unMarshallDoubleSafe(request.JSON.percentage)
            }
            catch(NumberFormatException ex ){
                returnBadRequestResponse("El formato del valor  tipo de cambio es incorrecto.")
            }
            Taxes tmpTax = new Taxes(description:request.JSON.description, percentage: percentageValue )
            def tmpCreatedTax = adminService.createOrUpdateTax(tmpTax);
            tmpResponse.message = messageSource.getMessage("generic.create.success", null, Locale.default);
            tmpResponse.data = [id:tmpCreatedTax.id]
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de modificar el impuesto
     * @author Leo chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update tax  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        def tmpId = params.long('id')
        try {
            def percentageValue;
            def description = request.JSON.description

            if(!request.JSON.percentage){
                returnBadRequestResponse("El atributo porcentaje es requerido")
            }
            else if(!description){
                returnBadRequestResponse("El atributo descripcion es requerido")
            }
            //check validity in case of  request string value
            try{
                percentageValue =  LightUtils.unMarshallDoubleSafe(request.JSON.percentage)
            }
            catch(NumberFormatException ex ){
                returnBadRequestResponse("El formato del valor  tipo de cambio es incorrecto.")
            }

            Taxes taxToModify = adminService.getTaxById(tmpId)
            taxToModify.percentage = percentageValue
            taxToModify.description = description
            adminService.createOrUpdateTax(taxToModify)
            tmpResponse.message = messageSource.getMessage("tax.update.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE

            log.info "====== Update tax   response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de deliminar el impuesto
     * @author Leo chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  delete tax  request =========="
        ResponseREST tmpResponse = new ResponseREST();
        def tmpId = params.long('id')
        try {
            Taxes taxToDelete = adminService.getTaxById(tmpId)
            adminService.deleteTax(taxToDelete)
            tmpResponse.message = messageSource.getMessage("tax.delete.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE

            log.info "====== delete tax   response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
