package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateProductTypeREST
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class ProductTypeController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def adminService

    /**
     * Este método se encarga de obtener cada uno de los tipos de productos o uno específico si el
     * id es suministrado como parámetro
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get product types request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                ProductType idTypeFromDB = adminService.getProductType(tmpId);

                if(idTypeFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(idTypeFromDB, true)
                }else{
                    tmpResponse.message = messageSource.getMessage("product.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def idTypesFromDB = adminService.getAllProductTypes();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(idTypesFromDB)
            }
            log.info "====== Get product type response ======"
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
        log.info "==========  Create product type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        ProductType tmpProductType = new ProductType(request.JSON);

        try {
            tmpProductType.validate();
            if (tmpProductType.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpProductType.errors);
            } else {
                adminService.createProductType(tmpProductType);

                tmpResponse.message = messageSource.getMessage("create.product.type.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create product type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un tipo de producto
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete product type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null) {
                ProductType tmpProductType = adminService.getProductType(request.JSON.id);

                if(tmpProductType) {
                    adminService.deleteProductType(tmpProductType);
                    tmpResponse.message = messageSource.getMessage("delete.product.type.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("product.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete product type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un tipo de producto
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update product type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateProductTypeREST tmpUpdateProductTypeREST = new UpdateProductTypeREST(request.JSON);
        try {
            tmpUpdateProductTypeREST.validate();
            if (tmpUpdateProductTypeREST.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpUpdateProductTypeREST.errors);
            } else {
                ProductType tmpProductType = adminService.getProductType(tmpUpdateProductTypeREST.id);

                if(tmpProductType) {

                    adminService.updateProductType(tmpProductType, tmpUpdateProductTypeREST);

                    tmpResponse.message = messageSource.getMessage("update.product.type.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("product.type.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }
            log.info "====== Update product type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
