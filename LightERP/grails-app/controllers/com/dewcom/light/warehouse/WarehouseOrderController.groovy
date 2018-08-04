package com.dewcom.light.warehouse

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.warehouse.RejectWarehouseOrderRequest
import com.dewcom.light.rest.warehouse.UpdateWarehouseOrderRequest
import com.dewcom.light.rest.warehouse.WarehouseOrderRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class WarehouseOrderController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def warehouseOrderService

    /**
     * Este método se encarga de obtener una lista de ordenes de bodega o una específica por medio del ID
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get warehouse order request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def tmpId = params.id

            if(tmpId){
                WarehouseOrder warehouseOrderFromDB = warehouseOrderService.getWarehouseOrder(tmpId)

                if(warehouseOrderFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(warehouseOrderFromDB)
                }else{
                    tmpResponse.message = messageSource.getMessage("warehouse.order.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def warehouseOrdersFromDB = warehouseOrderService.getAllWarehouseOrders()
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(warehouseOrdersFromDB)
            }
            log.info "====== Get warehouse order response ======"
            JSON.use('deep')
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear una nueva orden de bodega
     * @author Mauricio Fernández
     *
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create warehouse order request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        WarehouseOrderRequest restWarehouseOrder = new WarehouseOrderRequest(request.JSON.warehouseOrder)
        try {

            restWarehouseOrder.validate()
            if (restWarehouseOrder.hasErrors()) {
                this.handleDataErrorsREST(messageSource, restWarehouseOrder.errors)
            } else {
                def tmpWarehouseOrder = WarehouseOrder.fromRestWarehouseOrder(restWarehouseOrder)
                warehouseOrderService.createWarehouseOrder(tmpWarehouseOrder, restWarehouseOrder.username)

                tmpResponse.message = messageSource.getMessage("create.warehouse.order.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create warehouse order response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de modificar un orden de salida de bodega
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update warehouse order request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        UpdateWarehouseOrderRequest tmpUpdateWarehouseOrder = new UpdateWarehouseOrderRequest(request.JSON.updatedWarehouseOrder)
        try {
            tmpUpdateWarehouseOrder.validate()
            if (tmpUpdateWarehouseOrder.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpUpdateWarehouseOrder.errors)
            } else {
                warehouseOrderService.updateWarehouseOrder(tmpUpdateWarehouseOrder)
                tmpResponse.message = messageSource.getMessage("update.warehouse.order.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update warehouse order response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de aprovar un orden de salida de bodega
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def approveWarehouseOrder() {
        log.info "==========  Approve warehouse order request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()

        try {

            if (request.JSON && request.JSON != null && request.JSON.id != null ) {
                WarehouseOrder tmpWarehouseOrder = warehouseOrderService.getWarehouseOrder(request.JSON.id)

                if(tmpWarehouseOrder) {
                    warehouseOrderService.approveWarehouseOrder(tmpWarehouseOrder, request.JSON.username)
                    tmpResponse.message = messageSource.getMessage("approve.warehouse.order.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("warehouse.order.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }

            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default)
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }

            log.info "====== Approve warehouse order  response ======"
            log.info tmpResponse as JSON
                render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de rechazar una orden de salida de bodega
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def rejectWarehouseOrder() {
        log.info "==========  Reject warehouse order request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        RejectWarehouseOrderRequest rejectWarehouseOrderRequest = new RejectWarehouseOrderRequest(request.JSON)
        try {
            rejectWarehouseOrderRequest.validate()
            if (rejectWarehouseOrderRequest.hasErrors()) {
                this.handleDataErrorsREST(messageSource, rejectWarehouseOrderRequest.errors)
            } else {
                warehouseOrderService.rejectWarehouseOrder(rejectWarehouseOrderRequest)
                tmpResponse.message = messageSource.getMessage("reject.warehouse.order.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Reject warehouse order response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) una orden de bodega
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete warehouse order request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                WarehouseOrder tmpWarehouseOrder = warehouseOrderService.getWarehouseOrder(request.JSON.id)

                if(tmpWarehouseOrder) {
                    warehouseOrderService.deleteWarehouseOrder(tmpWarehouseOrder)
                    tmpResponse.message = messageSource.getMessage("delete.warehouse.order.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("warehouse.order.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default)
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete warehouse order response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
