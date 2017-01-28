package com.dewcom.light

import com.dewcom.light.rest.UpdateAgentRequestREST
import grails.transaction.Transactional

@Transactional
class AgentService {

    def messageSource

    Agent getAgent(def agentId) {
        log.info "====== Getting agent from DB ======"
        log.info agentId
        try {
            Agent agentFromDB = Agent.findByIdAndEnabled(agentId, Constants.ESTADO_ACTIVO);
            return agentFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.agent.error", null, Locale.default));
        }
    }


    def getAllAgents() {
        log.info "====== Getting all agents from DB ======"
        try {
            def agentsFromDB = Agent.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return agentsFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.agents.error", null, Locale.default));
        }
    }

    def createAgent(Agent pagent) {
        log.info "====== Creating customer ======"
        log.info pagent
        try {
            pagent.save(flush: true, failOnError: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.agent.error", null, Locale.default));
        }
    }

    def deleteAgent(Agent pagent) {
        try {
            pagent.enabled = Constants.ESTADO_INACTIVO;
            pagent.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.agent.error", null, Locale.default));
        }
    }

    def updateAgent(UpdateAgentRequestREST prestAgent) {
        log.info "====== Updating agent ======"
        try {
            Agent tmpAgentToUpdate = Agent.findByIdAndEnabled(prestAgent.id, Constants.ESTADO_ACTIVO)
            if (tmpAgentToUpdate) {

                tmpAgentToUpdate.agentCode = prestAgent.agentCode;
                tmpAgentToUpdate.name = prestAgent.name;
                tmpAgentToUpdate.firstLastName = prestAgent.firstLastName;
                tmpAgentToUpdate.secondLastName = prestAgent.secondLastName;
                tmpAgentToUpdate.phoneNumber = prestAgent.phoneNumber;
                tmpAgentToUpdate.extension = prestAgent.extension;
                tmpAgentToUpdate.mobile = prestAgent.mobile;
                tmpAgentToUpdate.email = prestAgent.email;
                tmpAgentToUpdate.commissionPercentage = prestAgent.commissionPercentage;

                tmpAgentToUpdate.agentType = AgentType.findByIdAndEnabled(prestAgent.agentType, Constants.ESTADO_ACTIVO);

                tmpAgentToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.agent.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if (e instanceof LightRuntimeException) {
                throw e;
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.agent.error", null, Locale.default));
            }
        }
    }
}
