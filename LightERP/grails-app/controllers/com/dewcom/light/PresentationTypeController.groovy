package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdatePresentationTypeREST
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class PresentationTypeController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def adminService

    /**
     * Este método se encarga de obtener cada uno de los tipos de presentación de un producto o uno específico si el
     * id es suministrado como parámetro
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get presentation types request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                PresentationType presentationTypeFromDB = adminService.getPresentationType(tmpId);

                if(presentationTypeFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(presentationTypeFromDB)
                }else{
                    tmpResponse.message = messageSource.getMessage("presentation.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def presentationTypesFromDB = adminService.getAllPresentationTypes();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(presentationTypesFromDB)
            }

            log.info "====== Get presentation type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo tipo de presentación de un producto
     * @author Mauricio Fernández Mora
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create presentation type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        PresentationType tmpPresentationType = new PresentationType(request.JSON);

        try {
            tmpPresentationType.validate();
            if (tmpPresentationType.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpPresentationType.errors);
            } else {
                adminService.createPresentationType(tmpPresentationType);

                tmpResponse.message = messageSource.getMessage("create.presentation.type.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create presentation type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un tipo de presentación de un producto
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete presentation type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null) {
                PresentationType tmpPresentationType = adminService.getPresentationType(request.JSON.id);

                if(tmpPresentationType) {
                    adminService.deletePresentationType(tmpPresentationType);
                    tmpResponse.message = messageSource.getMessage("delete.presentation.type.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("presentation.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete presentation type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un tipo de presentación de un producto
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update presentation type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdatePresentationTypeREST tmpUpdatePresentationTypeREST = new UpdatePresentationTypeREST(request.JSON);
        try {
            tmpUpdatePresentationTypeREST.validate();
            if (tmpUpdatePresentationTypeREST.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpUpdatePresentationTypeREST.errors);
            } else {
                PresentationType tmpPresentationType = adminService.getPresentationType(tmpUpdatePresentationTypeREST.id);

                if(tmpPresentationType) {

                    adminService.updatePresentationType(tmpPresentationType, tmpUpdatePresentationTypeREST);

                    tmpResponse.message = messageSource.getMessage("update.presentation.type.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("presentation.type.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }
            log.info "====== Update presentation type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
