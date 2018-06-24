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
     * Este método se encarga de crear un nuevo movimiento de orden de almacen
     * @author Mauricio Fernández Mora
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        ResponseREST tmpResponse = new ResponseREST();
        try {
            if(!request.JSON.description){
                returnBadRequestResponse("El atributo descripcion es requerido")
            }

            WarehouseOrderMovementType tmpMovement = new WarehouseOrderMovementType(description: request.JSON.description)
            tmpMovement.code= adminService.getMaxCode(WarehouseOrderMovementType.createCriteria()) + 1
            def createdMovement = adminService.createOrUpdateMovementType(tmpMovement)
            tmpResponse.message = messageSource.getMessage("generic.create.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = [id: createdMovement.id]
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un movimiento de orden de almacen
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        ResponseREST tmpResponse = new ResponseREST();
        def tmpId = params.long('id')
        try {
            WarehouseOrderMovementType tmpMovement = WarehouseOrderMovementType.findByIdAndEnabled(tmpId, Constants.ESTADO_ACTIVO )
            adminService.deleteWarehouseOrderMovementType(tmpMovement);
            tmpResponse.message = messageSource.getMessage("generic.delete.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }
        catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de modificar un movimiento de orden de almacen
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        ResponseREST tmpResponse = new ResponseREST();
        def tmpId = params.long('id')
        try {
            if(!request.JSON.description){
                returnBadRequestResponse("El atributo descripcion es requerido")
            }

            WarehouseOrderMovementType tmpMovement = WarehouseOrderMovementType.findByIdAndEnabled(tmpId, Constants.ESTADO_ACTIVO)
            tmpMovement.description = request.JSON.description
            adminService.createOrUpdateMovementType(tmpMovement)
            tmpResponse.message = messageSource.getMessage("generic.update.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
