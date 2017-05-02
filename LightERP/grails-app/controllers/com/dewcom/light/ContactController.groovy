package com.dewcom.light

import com.dewcom.light.rest.CustomerREST
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateContactRequestREST
import com.dewcom.light.rest.UpdateCustomerRequestREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class ContactController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def contactService

    /**
     * Este método se encarga de obtener una lista de contactos o uno especifico por medio del ID
     * @author Leonardo Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get contact  request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                Contact contactFromDB = contactService.getContact(tmpId);

                if(contactFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = contactFromDB
                }else{
                    tmpResponse.message = messageSource.getMessage("contact.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def customersFromDB = contactService.getAllContacts();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = customersFromDB
            }
            log.info "====== Get contact response ======"
            JSON.use('deep');
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }


    def getContactsByCustomerId() {
        log.info "========== Get contact by client id  request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id
            def tmpContactsList = new ArrayList()
            if(tmpId){
                tmpContactsList = contactService.getContactsByCustomerId(tmpId);
               }
            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = tmpContactsList

            log.info "====== Get contacts by client id response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un contacto
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create contact  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        Contact  tmpContact = new Contact(request.JSON);
        try {


            tmpContact.validate();
            if (tmpContact.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpContact.errors);
            } else {
                contactService.createContact(tmpContact);

                tmpResponse.message = messageSource.getMessage("create.contact.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create contact response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un contacto
     * @author Leonardo Chen
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete contact  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                Contact tmpContact = contactService.getContact(request.JSON.id);

                if(tmpContact) {
                    contactService.deleteContact(tmpContact);
                    tmpResponse.message = messageSource.getMessage("delete.contact.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("contact.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete contact response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un contacto
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update contact request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateContactRequestREST tmpContactRest = new UpdateContactRequestREST(request.JSON);
        log.info request.JSON
        try {
            tmpContactRest.validate();
            if (tmpContactRest.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpContactRest.errors);
            } else {
                    contactService.updateContact(tmpContactRest);
                    tmpResponse.message = messageSource.getMessage("update.contact.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update contact response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
