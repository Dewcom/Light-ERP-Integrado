package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateAgentTypeREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class AgentTypeController extends RestController{
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def adminService

    /**
     * Este método se encarga de obtener cada uno de los tipos de agente o uno específico si el
     * id es suministrado como parámetro
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get user type request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                AgentType agentTypeFromDB = adminService.getAgentType(tmpId);

                if(agentTypeFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = agentTypeFromDB
                }else{
                    tmpResponse.message = messageSource.getMessage("agent.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def agentTypesFromDB = adminService.getAllAgentTypes();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = agentTypesFromDB
            }
            log.info "====== Get user types response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo tipo de agente
     * @author Mauricio Fernández Mora
     * @param positionName
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create user type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        AgentType tmpAgentType = new AgentType(request.JSON);
        try {
            tmpAgentType.validate();
            if (tmpAgentType.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpAgentType.errors);
            } else {
                adminService.createAgentType(tmpAgentType);

                tmpResponse.message = messageSource.getMessage("create.agent.type.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create user type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un tipo de agente
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete user type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null) {
                AgentType tmpAgentType = adminService.getAgentType(request.JSON.id);

                if(tmpAgentType) {
                    adminService.deleteAgentType(tmpAgentType);
                    tmpResponse.message = messageSource.getMessage("delete.agent.type.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("agent.type.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete user type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un tipo de agente
     * @author Mauricio Fernández Mora
     * @param positionName
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update user type request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateAgentTypeREST tmpUpdateAgentTypeREST = new UpdateAgentTypeREST(request.JSON);
        try {
            tmpUpdateAgentTypeREST.validate();
            if (tmpUpdateAgentTypeREST.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpUpdateAgentTypeREST.errors);
            } else {
                AgentType tmpAgentType = adminService.getAgentType(tmpUpdateAgentTypeREST.id);

                if(tmpAgentType) {

                    adminService.updateAgentType(tmpAgentType, tmpUpdateAgentTypeREST);

                    tmpResponse.message = messageSource.getMessage("update.agent.type.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("agent.type.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }
            log.info "====== Update user type response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
