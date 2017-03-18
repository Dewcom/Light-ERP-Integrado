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
    def messageSource
    IdentificationType getIdentificationType(def pid) {
        log.info "====== Getting identification type from DB ======"
        log.info pid
        try{
            IdentificationType idTypeFromDB = IdentificationType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO);
            return idTypeFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.identification.type.error", null, Locale.default));
        }
    }

    List<IdentificationType> getAllIdentificationTypes() {
        log.info "====== Getting all identification types from DB ======"
        try{
            def idTypesFromDB = IdentificationType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return idTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.identification.types.error", null, Locale.default));
        }
    }

    def createIdType(IdentificationType pidentificationType) {
        try{
            pidentificationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.identification.type.error", null, Locale.default));
        }
    }

    def deleteIdType(IdentificationType pidentificationType) {
        try{
            pidentificationType.enabled = Constants.ESTADO_INACTIVO;
            pidentificationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.identification.type.error", null, Locale.default));
        }
    }

    def updateIdType(IdentificationType pidentificationType, UpdateIdentificationTypeREST pupdateIdentificationTypeREST) {
        try{
            pidentificationType.name = pupdateIdentificationTypeREST.name;
            pidentificationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("update.identification.type.error", null, Locale.default));
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
            throw new LightRuntimeException(messageSource.getMessage("get.agent.type.error", null, Locale.default));
        }
    }

    def getAllAgentTypes() {
        log.info "====== Getting all agent types from DB ======"
        try{
            def agentTypesFromDB = AgentType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return agentTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.agent.types.error", null, Locale.default));
        }
    }

    def createAgentType(AgentType pagentType) {
        try{
            pagentType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.agent.type.error", null, Locale.default));
        }
    }

    def deleteAgentType(AgentType pagentType) {
        try{
            pagentType.enabled = Constants.ESTADO_INACTIVO;
            pagentType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.agent.type.error", null, Locale.default));
        }
    }

    def updateAgentType(AgentType pagentType, UpdateAgentTypeREST pupdateAgentTypeREST) {
        try{
            pagentType.positionName = pupdateAgentTypeREST.positionName;
            pagentType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("update.agent.type.error", null, Locale.default));
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
            throw new LightRuntimeException(messageSource.getMessage("get.customer.type.error", null, Locale.default));
        }
    }

    def getAllCustomerTypes() {
        log.info "====== Getting all customer types from DB ======"
        try{
            def customerTypesFromDB = CustomerType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return customerTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.customer.types.error", null, Locale.default));
        }
    }

    def createCustomerType(CustomerType pcustomerType) {
        try{
            pcustomerType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.customer.type.error", null, Locale.default));
        }
    }

    def deleteCustomerType(CustomerType pcustomerType) {
        try{
            pcustomerType.enabled = Constants.ESTADO_INACTIVO;
            pcustomerType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.customer.type.error", null, Locale.default));
        }
    }

    def updateCustomerType(CustomerType pcustomerType, UpdateCustomerTypeREST pupdateCustomerTypeREST) {
        try{
            pcustomerType.name = pupdateCustomerTypeREST.name;
            pcustomerType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("update.customer.type.error", null, Locale.default));
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
            throw new LightRuntimeException(messageSource.getMessage("get.product.type.error", null, Locale.default));
        }
    }

    def getAllProductTypes() {
        log.info "====== Getting all product types from DB ======"
        try{
            def productTypesFromDB = ProductType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return productTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.product.types.error", null, Locale.default));
        }
    }

    def createProductType(ProductType pproductType) {
        try{
            pproductType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.product.type.error", null, Locale.default));
        }
    }

    def deleteProductType(ProductType pproductType) {
        try{
            pproductType.enabled = Constants.ESTADO_INACTIVO;
            pproductType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.product.type.error", null, Locale.default));
        }
    }

    def updateProductType(ProductType pproductType, UpdateProductTypeREST pupdateProductTypeREST) {
        try{
            pproductType.name = pupdateProductTypeREST.name;
            pproductType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("update.product.type.error", null, Locale.default));
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
            throw new LightRuntimeException(messageSource.getMessage("get.presentation.type.error", null, Locale.default));
        }
    }

    def getAllPresentationTypes() {
        log.info "====== Getting all presentation types from DB ======"
        try{
            def presentationTypesFromDB = PresentationType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return presentationTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.presentation.types.error", null, Locale.default));
        }
    }

    def createPresentationType(PresentationType ppresentationType) {
        try{
            ppresentationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.presentation.type.error", null, Locale.default));
        }
    }

    def deletePresentationType(PresentationType ppresentationType) {
        try{
            ppresentationType.enabled = Constants.ESTADO_INACTIVO;
            ppresentationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.presentation.type.error", null, Locale.default));
        }
    }

    def updatePresentationType(PresentationType ppresentationType, UpdatePresentationTypeREST pudatePresentationTypeREST) {
        try{
            ppresentationType.name = pudatePresentationTypeREST.name;
            ppresentationType.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("update.presentation.type.error", null, Locale.default));
        }
    }

    //configurations

    def Configuration createConfiguration(Configuration argConfiguration) {
        def config
        try {
            config = argConfiguration.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.configuration.error", null, Locale.default));
        }
        return config
    }

    def deleteConfiguration(Configuration argConfiguration) {
        try {
            argConfiguration.enabled = Constants.ESTADO_INACTIVO;
            argConfiguration.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.configuration.error", null, Locale.default));
        }
    }


        def getConfiguration(def argConfigId) {
        log.info "====== Getting configuration from db ======"
        log.info argConfigId
        try{
            Configuration config = Configuration.findById(argConfigId);
            return config
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.configuration.error", null, Locale.default));
        }
    }

    def getAllConfigurations() {
        log.info "====== Getting all configurations  from DB ======"
        try{
            def customerTypesFromDB = Configuration.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return customerTypesFromDB
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.configuration.error", null, Locale.default));
        }
    }

    def updateConfiguration(Configuration argConfiguration) {
        try{
            argConfiguration.save(flush: true)
        }catch(Exception e){
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("update.configuration.error", null, Locale.default));
        }
    }
}
