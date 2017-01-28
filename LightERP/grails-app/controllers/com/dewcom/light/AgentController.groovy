package com.dewcom.light

import com.dewcom.light.rest.AgentREST
import com.dewcom.light.rest.CustomerREST
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdateAgentRequestREST
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class AgentController extends RestController{
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def agentService

    /**
     * Este método se encarga de obtener una lista de agentes o uno específico por medio del ID
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get agent request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                Agent agentFromDB = agentService.getAgent(tmpId);

                if(agentFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = agentFromDB
                }else{
                    tmpResponse.message = messageSource.getMessage("agent.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def agentsFromDB = agentService.getAllAgents();
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = agentsFromDB
            }
            log.info "====== Get agent response ======"
            JSON.use('deep')
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo agente
     * @author Mauricio Fernández Mora
     * @param agent
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create agent request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        Agent tmpAgent;
        AgentREST restAgent = new AgentREST(request.JSON.agent);
        try {
            def tmpAgentToCheck = Agent.findByAgentCodeAndEnabled(restAgent.agentCode, Constants.ESTADO_ACTIVO)
            if(tmpAgentToCheck){
                tmpResponse.code = Constants.ERROR_UNDECLARED_EXCEPTION
                tmpResponse.message =  messageSource.getMessage("create.agent.id.nonUnique", null, Locale.default)
                render tmpResponse as JSON
                return
            }

            restAgent.validate();
            if (restAgent.hasErrors()) {
                this.handleDataErrorsREST(messageSource, restAgent.errors);
            } else {
                tmpAgent = Agent.fromRestAgent(restAgent);
                agentService.createAgent(tmpAgent);

                tmpResponse.message = messageSource.getMessage("create.agent.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create agent response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un agente
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete agent request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                Agent tmpAgent = agentService.getAgent(request.JSON.id);

                if(tmpAgent) {
                    agentService.deleteAgent(tmpAgent);
                    tmpResponse.message = messageSource.getMessage("delete.agent.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("agent.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete agent response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un agente
     * @author Mauricio Fernández Mora
     * @param request
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update agent request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateAgentRequestREST tmpAgent = new UpdateAgentRequestREST(request.JSON);
        try {
            tmpAgent.validate();
            if (tmpAgent.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpAgent.errors);
            } else {
                agentService.updateAgent(tmpAgent);
                tmpResponse.message = messageSource.getMessage("update.agent.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update agent response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
