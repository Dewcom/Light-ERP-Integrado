package com.dewcom.light

import com.dewcom.light.rest.ProductRest
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateProductRequestREST
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class ProductController extends RestController{
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def productService

    /**
     * Este método se encarga de obtener una lista de productos o uno específico por medio del ID
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get product request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def tmpId = params.id

            if(tmpId){
                Product productFromDB = productService.getProduct(tmpId)

                if(productFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(productFromDB, true)
                }else{
                    tmpResponse.message = messageSource.getMessage("product.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def productsFromDB = productService.getAllProducts()
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(productsFromDB, true)
            }
            log.info "====== Get product response ======"
            JSON.use('deep')
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo producto
     * @author Mauricio Fernández
     *
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create product request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        Product tmpProduct
        ProductRest restProduct = new ProductRest(request.JSON.product)
        try {
            def tmpProductToCheck = Product.findByProductCodeAndEnabled(restProduct.productCode, Constants.ESTADO_ACTIVO)
            if(tmpProductToCheck){
                tmpResponse.code = Constants.ERROR_UNDECLARED_EXCEPTION
                tmpResponse.message =  messageSource.getMessage("create.product.id.nonUnique", null, Locale.default)
                render tmpResponse as JSON
                return
            }

            restProduct.validate()
            if (restProduct.hasErrors()) {
                this.handleDataErrorsREST(messageSource, restProduct.errors)
            } else {
                tmpProduct = Product.fromRestProduct(restProduct)
                productService.createProduct(tmpProduct)

                tmpResponse.message = messageSource.getMessage("create.product.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create product response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un producto
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete product request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                Product tmpProduct = productService.getProduct(request.JSON.id)

                if(tmpProduct) {
                    productService.deleteProduct(tmpProduct)
                    tmpResponse.message = messageSource.getMessage("delete.product.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("product.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default)
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete product response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de modificar un producto
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update product request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        UpdateProductRequestREST tmpProduct = new UpdateProductRequestREST(request.JSON)
        try {
            tmpProduct.validate()
            if (tmpProduct.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpProduct.errors)
            } else {
                productService.updateProduct(tmpProduct)
                tmpResponse.message = messageSource.getMessage("update.product.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update product response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de obtener una lista de unidades de medida
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def getMeasureUnits() {
        log.info "========== Get measure units request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def tmpId = params.id

            if(tmpId){
                MeasureUnit measureUnitFromDB = productService.getMeasureUnit(tmpId)

                if(measureUnitFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(measureUnitFromDB, true)
                }else{
                    tmpResponse.message = messageSource.getMessage("measure.type.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def measureTypeFromDB = productService.getAllMeasureUnits()
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(measureTypeFromDB, true)
            }
            log.info "====== Get measure types response ======"
            JSON.use('deep')
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
