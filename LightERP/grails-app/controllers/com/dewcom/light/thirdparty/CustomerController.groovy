package com.dewcom.light.thirdparty

import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.thirdparty.CustomerRequest
import com.dewcom.light.rest.thirdparty.UpdateCustomerRequest
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class CustomerController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def customerService

    /**
     * Este método se encarga de obtener una lista de cliente o uno especifico por medio del ID
     * @author Leonardo Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get customer request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                Customer customerFromDB = customerService.getCustomer(tmpId);

                if(customerFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(customerFromDB)
                }else{
                    tmpResponse.message = messageSource.getMessage("customer.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def customersFromDB = customerService.getAllCustomers();
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(customersFromDB)
            }
            log.info "====== Get customer response ======"
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo cliente
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create customer request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        Customer tmpCustomer;
        CustomerRequest restCustomer = new CustomerRequest(request.JSON.customer);
        try {
            def tmpCustomerToCheck = Customer.findByIdentificationAndEnabled(restCustomer.identification, Constants.ESTADO_ACTIVO)
           if(tmpCustomerToCheck){
               tmpResponse.code = Constants.ERROR_UNDECLARED_EXCEPTION
               tmpResponse.message =  messageSource.getMessage("create.customer.id.nonUnique", null, Locale.default)
               render tmpResponse as JSON
               return
           }

            restCustomer.validate();
            if (restCustomer.hasErrors()) {
                this.handleDataErrorsREST(messageSource, restCustomer.errors);
            } else {
                tmpCustomer = Customer.fromRestCustomer(restCustomer, true);
                customerService.createCustomer(tmpCustomer);

                tmpResponse.message = messageSource.getMessage("create.customer.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create customer response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un cliente
     * @author Leonardo Chen
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete customer request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                Customer tmpCustomer = customerService.getCustomer(request.JSON.id);

                if(tmpCustomer) {
                    customerService.deleteCustomer(tmpCustomer);
                    tmpResponse.message = messageSource.getMessage("delete.customer.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("customer.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete customer response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un cliente
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update customer request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateCustomerRequest tmpCustomer = new UpdateCustomerRequest(request.JSON);
        try {
            tmpCustomer.validate();
            if (tmpCustomer.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpCustomer.errors);
            } else {
                    customerService.updateCustomer(tmpCustomer);
                    tmpResponse.message = messageSource.getMessage("update.customer.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update customer response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    @Secured(['ROLE_ANONYMOUS'])
    def getCustomerContacts() {
        log.info "========== Get customer contacts request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id
            def tmpContactsList = new ArrayList()
            if(tmpId){
                tmpContactsList = customerService.getCustomerContacts(tmpId);
            }
            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = JSONMapper.listFrom(tmpContactsList)

            log.info "====== Get contacts by client id response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    @Secured(['ROLE_ANONYMOUS'])
    def getCustomerAddresses() {
        log.info "========== Get customer addresses request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id
            def tmpAddressesList = new ArrayList()
            if(tmpId){
                tmpAddressesList = customerService.getCustomerAddresses(tmpId);
            }
            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = JSONMapper.listFrom(tmpAddressesList)

            log.info "====== Get addresses by client id response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }
}
