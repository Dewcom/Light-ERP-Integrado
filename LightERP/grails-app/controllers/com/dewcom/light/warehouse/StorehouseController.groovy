package com.dewcom.light.warehouse

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.warehouse.StorehouseRequest
import com.dewcom.light.rest.warehouse.UpdateStorehouseRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class StorehouseController extends RestController{
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def storehouseService

    /**
     * Este método se encarga de obtener una lista de bodegas o una específica por medio del ID
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get storehouse request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def tmpId = params.id

            if(tmpId){
                Storehouse storehouseFromDB = storehouseService.getStorehouse(tmpId)

                if(storehouseFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(storehouseFromDB)
                }else{
                    tmpResponse.message = messageSource.getMessage("storehouse.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def storehousesFromDB = storehouseService.getAllStorehouses()
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(storehousesFromDB)
            }
            log.info "====== Get storehouse response ======"
            JSON.use('deep')
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear una nueva bodega
     * @author Mauricio Fernández
     *
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create storehouse request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        StorehouseRequest tmpStorehouse = new StorehouseRequest(request.JSON.storehouse);
        try {
            tmpStorehouse.validate();
            if (tmpStorehouse.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpStorehouse.errors);
            } else {
                storehouseService.createStorehouse(tmpStorehouse)

                tmpResponse.message = messageSource.getMessage("create.storehouse.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create storehouse response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) una bodega
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete storehouse request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                Storehouse tmpStorehouse = storehouseService.getStorehouse(request.JSON.id)

                if(tmpStorehouse) {
                    storehouseService.deleteStorehouse(tmpStorehouse)
                    tmpResponse.message = messageSource.getMessage("delete.storehouse.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("storehouse.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default)
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete storehouse response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de modificar una bodega
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update storehouse request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        UpdateStorehouseRequest tmpStorehouse = new UpdateStorehouseRequest(request.JSON)
        try {
            tmpStorehouse.validate()
            if (tmpStorehouse.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpStorehouse.errors)
            } else {
                storehouseService.updateStorehouse(tmpStorehouse)
                tmpResponse.message = messageSource.getMessage("update.storehouse.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }

            log.info "====== Update storehouse response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
