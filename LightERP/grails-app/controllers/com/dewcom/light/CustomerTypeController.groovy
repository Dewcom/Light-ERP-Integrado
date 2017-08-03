package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateCustomerTypeREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class CustomerTypeController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def adminService

    /**
     * Este método se encarga de obtener cada uno de los tipos de cliente o uno específico si el
     * id es suministrado como parámetro
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get customer type request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                CustomerType customerTypeFromDB = adminService.getCustomerType(tmpId);

                if(customerTypeFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    def object = JSONMapper.from(customerTypeFromDB, true)
                    tmpResponse.data = object
                }else{
                    tmpResponse.message = messageSource.getMessage("customer.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def customerTypesFromDB = adminService.getAllCustomerTypes();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(customerTypesFromDB, true)
            }
            log.info "====== Get customer types response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo tipo de cliente
     * @author Mauricio Fernández Mora
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create customer type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        CustomerType tmpCustomerType = new CustomerType(request.JSON);
        try {
            tmpCustomerType.validate();
            if (tmpCustomerType.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpCustomerType.errors);
            } else {
                adminService.createCustomerType(tmpCustomerType);

                tmpResponse.message = messageSource.getMessage("create.customer.type.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create customer type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un tipo de cliente
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete customer type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null) {
                CustomerType tmpCustomerType = adminService.getCustomerType(request.JSON.id);

                if(tmpCustomerType) {
                    adminService.deleteCustomerType(tmpCustomerType);
                    tmpResponse.message = messageSource.getMessage("delete.customer.type.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("customer.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete customer type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un tipo de cliente
     * @author Mauricio Fernández Mora
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update customer type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateCustomerTypeREST tmpUpdateCustomerTypeREST = new UpdateCustomerTypeREST(request.JSON);
        try {
            tmpUpdateCustomerTypeREST.validate();
            if (tmpUpdateCustomerTypeREST.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpUpdateCustomerTypeREST.errors);
            } else {
                CustomerType tmpCustomerType = adminService.getCustomerType(tmpUpdateCustomerTypeREST.id);

                if(tmpCustomerType) {

                    adminService.updateCustomerType(tmpCustomerType, tmpUpdateCustomerTypeREST);

                    tmpResponse.message = messageSource.getMessage("update.customer.type.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("customer.type.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }
            log.info "====== Update customer type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
