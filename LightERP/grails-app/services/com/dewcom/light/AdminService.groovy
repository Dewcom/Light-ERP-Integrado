package com.dewcom.light

import com.dewcom.light.rest.UpdateAgentTypeREST
import com.dewcom.light.rest.UpdateCustomerTypeREST
import com.dewcom.light.rest.UpdateIdentificationTypeREST
import grails.transaction.Transactional

@Transactional
class AdminService {

    IdentificationType getIdType(def pid) {
        log.info "====== Getting identification type from DB ======"
        log.info pid
        try{
            IdentificationType idTypeFromDB = IdentificationType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO);
            return idTypeFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.identification.type.error");
        }
    }

    List<IdentificationType> getAllIdTypes() {
        log.info "====== Getting all identification types from DB ======"
        try{
            def idTypesFromDB = IdentificationType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return idTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.all.identification.types.error");
        }
    }

    def createIdType(IdentificationType pidentificationType) {
        try{
            pidentificationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("create.identification.type.error");
        }
    }

    def deleteIdType(IdentificationType pidentificationType) {
        try{
            pidentificationType.enabled = Constants.ESTADO_INACTIVO;
            pidentificationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("delete.identification.type.error");
        }
    }

    def updateIdType(IdentificationType pidentificationType, UpdateIdentificationTypeREST pupdateIdentificationTypeREST) {
        try{
            pidentificationType.name = pupdateIdentificationTypeREST.name;
            pidentificationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("update.identification.type.error");
        }
    }

    AgentType getAgentType(def pid) {
        log.info "====== Getting agent type from DB ======"
        log.info pid
        try{
            AgentType agentTypeFromDB = AgentType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO);
            return agentTypeFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.agent.type.error");
        }
    }

    def getAllAgentTypes() {
        log.info "====== Getting all agent types from DB ======"
        try{
            def agentTypesFromDB = AgentType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return agentTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.all.agent.types.error");
        }
    }

    def createAgentType(AgentType pagentType) {
        try{
            pagentType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("create.agent.type.error");
        }
    }

    def deleteAgentType(AgentType pagentType) {
        try{
            pagentType.enabled = Constants.ESTADO_INACTIVO;
            pagentType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("delete.agent.type.error");
        }
    }

    def updateAgentType(AgentType pagentType, UpdateAgentTypeREST pupdateAgentTypeREST) {
        try{
            pagentType.positionName = pupdateAgentTypeREST.positionName;
            pagentType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("update.agent.type.error");
        }
    }

    CustomerType getCustomerType(def pid) {
        log.info "====== Getting customer type from DB ======"
        log.info pid
        try{
            CustomerType customerTypeFromDB = CustomerType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO);
            return customerTypeFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.customer.type.error");
        }
    }

    def getAllCustomerTypes() {
        log.info "====== Getting all customer types from DB ======"
        try{
            def customerTypesFromDB = CustomerType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return customerTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.all.customer.types.error");
        }
    }

    def createCustomerType(CustomerType pcustomerType) {
        try{
            pcustomerType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("create.customer.type.error");
        }
    }

    def deleteCustomerType(CustomerType pcustomerType) {
        try{
            pcustomerType.enabled = Constants.ESTADO_INACTIVO;
            pcustomerType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("delete.customer.type.error");
        }
    }

    def updateCustomerType(CustomerType pcustomerType, UpdateCustomerTypeREST pupdateCustomerTypeREST) {
        try{
            pcustomerType.name = pupdateCustomerTypeREST.name;
            pcustomerType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("update.customer.type.error");
        }
    }
}
