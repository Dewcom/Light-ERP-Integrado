package com.dewcom.light

import com.dewcom.light.rest.UpdateAgentTypeREST
import com.dewcom.light.rest.UpdateCustomerTypeREST
import com.dewcom.light.rest.UpdateIdentificationTypeREST
import com.dewcom.light.rest.UpdatePresentationTypeREST
import com.dewcom.light.rest.UpdateProductTypeREST
import grails.transaction.Transactional

@Transactional
class AdminService {

    //Identification type

    IdentificationType getIdentificationType(def pid) {
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

    List<IdentificationType> getAllIdentificationTypes() {
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


    //Agent type

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

    //Customer type

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

    //Product type

    ProductType getProductType(def pid) {
        log.info "====== Getting product type from DB ======"
        log.info pid
        try{
            ProductType productTypeFromDB = ProductType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO);
            return productTypeFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.product.type.error");
        }
    }

    def getAllProductTypes() {
        log.info "====== Getting all product types from DB ======"
        try{
            def productTypesFromDB = ProductType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return productTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.all.product.types.error");
        }
    }

    def createProductType(ProductType pproductType) {
        try{
            pproductType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("create.product.type.error");
        }
    }

    def deleteProductType(ProductType pproductType) {
        try{
            pproductType.enabled = Constants.ESTADO_INACTIVO;
            pproductType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("delete.product.type.error");
        }
    }

    def updateProductType(ProductType pproductType, UpdateProductTypeREST pupdateProductTypeREST) {
        try{
            pproductType.name = pupdateProductTypeREST.name;
            pproductType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("update.product.type.error");
        }
    }


    //Presentation type

    PresentationType getPresentationType(def pid) {
        log.info "====== Getting presentation type from DB ======"
        log.info pid
        try{
            PresentationType presentationTypeFromDB = PresentationType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO);
            return presentationTypeFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.presentation.type.error");
        }
    }

    def getAllPresentationTypes() {
        log.info "====== Getting all presentation types from DB ======"
        try{
            def presentationTypesFromDB = PresentationType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return presentationTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("get.all.presentation.types.error");
        }
    }

    def createPresentationType(PresentationType ppresentationType) {
        try{
            ppresentationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("create.presentation.type.error");
        }
    }

    def deletePresentationType(PresentationType ppresentationType) {
        try{
            ppresentationType.enabled = Constants.ESTADO_INACTIVO;
            ppresentationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("delete.presentation.type.error");
        }
    }

    def updatePresentationType(PresentationType ppresentationType, UpdatePresentationTypeREST pudatePresentationTypeREST) {
        try{
            ppresentationType.name = pudatePresentationTypeREST.name;
            ppresentationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException("update.presentation.type.error");
        }
    }
}
