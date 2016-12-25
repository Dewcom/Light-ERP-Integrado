package com.dewcom.light

import com.dewcom.light.rest.CustomerREST
import com.dewcom.light.rest.ProductRest
import com.dewcom.light.rest.ResponseREST
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class ProductController extends RestController{
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def productService

    /**
     * Este método se encarga de crear un nuevo producto
     * @author Mauricio Fernández
     *
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create product request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        Product tmpProduct;
        ProductRest restProduct = new ProductRest(request.JSON.product);
        try {
            def tmpProductToCheck = Product.findByProductCodeAndEnabled(restProduct.productCode, Constants.ESTADO_ACTIVO)
            if(tmpProductToCheck){
                tmpResponse.code = Constants.ERROR_UNDECLARED_EXCEPTION
                tmpResponse.message =  messageSource.getMessage("create.product.id.nonUnique", null, Locale.default)
                render tmpResponse as JSON
                return
            }

            restProduct.validate();
            if (restProduct.hasErrors()) {
                this.handleDataErrorsREST(messageSource, restProduct.errors);
            } else {
                tmpProduct = Product.fromRestProduct(restProduct);
                productService.createProduct(tmpProduct);

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
}
