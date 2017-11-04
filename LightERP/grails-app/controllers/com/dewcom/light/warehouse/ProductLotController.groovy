package com.dewcom.light.warehouse

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.warehouse.ProductLotRequest
import com.dewcom.light.rest.warehouse.UpdateProductLotRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class ProductLotController extends RestController{
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def productLotService

    /**
     * Este método se encarga de obtener una lista de lotes o uno específico por medio del ID
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get productLot request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def tmpId = params.id

            if(tmpId){
                ProductLot productLotFromDB = productLotService.getproductLot(tmpId)

                if(productLotFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(productLotFromDB)
                }else{
                    tmpResponse.message = messageSource.getMessage("productLot.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def productLotsFromDB = productLotService.getAllProductLots()
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(productLotsFromDB)
            }
            log.info "====== Get productLot response ======"
            JSON.use('deep')
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo lote de producto
     * @author Mauricio Fernández
     *
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create productLot request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        ProductLotRequest tmpProductLot = new ProductLotRequest(request.JSON.productLot);
        try {
            tmpProductLot.validate();
            if (tmpProductLot.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpProductLot.errors);
            } else {
                productLotService.createProductLot(tmpProductLot)

                tmpResponse.message = messageSource.getMessage("create.productLot.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create productLot response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un lote de producto
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete productLot request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                ProductLot tmpProductLot = productLotService.getproductLot(request.JSON.id)

                if(tmpProductLot) {
                    productLotService.deleteProductLot(tmpProductLot)
                    tmpResponse.message = messageSource.getMessage("delete.productLot.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("productLot.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default)
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }

            log.info "====== Delete productLot response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de modificar un lote de producto
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update productLot request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        UpdateProductLotRequest tmpProductLot = new UpdateProductLotRequest(request.JSON)
        try {
            tmpProductLot.validate()
            if (tmpProductLot.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpProductLot.errors)
            } else {
                productLotService.updateProductLot(tmpProductLot)
                tmpResponse.message = messageSource.getMessage("update.productLot.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }

            log.info "====== Update productLot response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}