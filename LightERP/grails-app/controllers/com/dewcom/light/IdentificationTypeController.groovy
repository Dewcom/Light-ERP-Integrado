package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateIdentificationTypeREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class IdentificationTypeController extends RestController {
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def adminService

    /**
     * Este método se encarga de obtener cada uno de los tipos de identificación o uno específico si el
     * id es suministrado como parámetro
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get identification types request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                IdentificationType idTypeFromDB = adminService.getIdentificationType(tmpId);

                if(idTypeFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(idTypeFromDB, true)
                }else{
                    tmpResponse.message = messageSource.getMessage("identification.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def idTypesFromDB = adminService.getAllIdentificationTypes();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(idTypesFromDB, true)
            }
            log.info "====== Get identification type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo tipo de identificación
     * @author Mauricio Fernández Mora
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create identification type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        IdentificationType tmpIdentificationType = new IdentificationType(request.JSON);
        try {
            tmpIdentificationType.validate();
            if (tmpIdentificationType.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpIdentificationType.errors);
            } else {
                adminService.createIdType(tmpIdentificationType);

                tmpResponse.message = messageSource.getMessage("create.identification.type.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create identification type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un tipo de identificacion
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete identification type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null) {
                IdentificationType tmpIdType = adminService.getIdentificationType(request.JSON.id);

                if(tmpIdType) {
                    adminService.deleteIdType(tmpIdType);
                    tmpResponse.message = messageSource.getMessage("delete.identification.type.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("identification.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete identification type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un tipo de identificacion
     * @author Mauricio Fernández Mora
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update identification type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateIdentificationTypeREST tmpUpdateIdentificationTypeREST = new UpdateIdentificationTypeREST(request.JSON);
        try {
            tmpUpdateIdentificationTypeREST.validate();
            if (tmpUpdateIdentificationTypeREST.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpUpdateIdentificationTypeREST.errors);
            } else {
                IdentificationType tmpIdentificationType = adminService.getIdentificationType(tmpUpdateIdentificationTypeREST.id);

                if(tmpIdentificationType) {

                    adminService.updateIdType(tmpIdentificationType, tmpUpdateIdentificationTypeREST);

                    tmpResponse.message = messageSource.getMessage("update.identification.type.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("identification.type.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }
            log.info "====== Update identification type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
