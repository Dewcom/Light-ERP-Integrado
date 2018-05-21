package com.dewcom.light.warehouse

import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.ResponseREST
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class WarehouseOrderMovementTypeController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def adminService

    /**
     * Este método se encarga de obtener cada uno de los tipos de movimientos de salida de bodega
     * id es suministrado como parámetro
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get warehouse order movement type request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def movementsTypeFromDB = adminService.getAllWarehouseMovementsTypes()

            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = JSONMapper.listFrom(movementsTypeFromDB)
            log.info "====== Get warehouse order movement type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON

        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo tipo de producto
     * @author Mauricio Fernández Mora
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        //TODO
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un tipo de producto
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        //TODO
    }

    /**
     * Este método se encarga de modificar un tipo de producto
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        //TODO
    }
}
