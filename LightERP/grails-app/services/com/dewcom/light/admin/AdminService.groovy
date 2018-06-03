package com.dewcom.light.admin

import com.dewcom.light.billing.Taxes
import com.dewcom.light.rest.thirdparty.UpdateAgentTypeRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.billing.BillPaymentType
import com.dewcom.light.billing.BillStateType
import com.dewcom.light.billing.CreditCondition
import com.dewcom.light.billing.Currency
import com.dewcom.light.billing.ExchangeRate
import com.dewcom.light.configuration.Configuration

import com.dewcom.light.rest.thirdparty.UpdateCustomerTypeRequest
import com.dewcom.light.rest.thirdparty.UpdateIdentificationTypeRequest
import com.dewcom.light.rest.warehouse.UpdatePresentationTypeRequest
import com.dewcom.light.rest.warehouse.UpdateProductTypeRequest
import com.dewcom.light.thirdparty.AgentType
import com.dewcom.light.thirdparty.CustomerType
import com.dewcom.light.thirdparty.IdentificationType
import com.dewcom.light.warehouse.MeasureUnit
import com.dewcom.light.warehouse.PresentationType
import com.dewcom.light.warehouse.ProductType
import com.dewcom.light.warehouse.WarehouseOrderMovementType
import grails.transaction.Transactional

@Transactional
class AdminService {
    //Identification type
    def messageSource

    IdentificationType getIdentificationType(def pid) {
        log.info "====== Getting identification type from DB ======"
        log.info pid
        try{
            IdentificationType idTypeFromDB = IdentificationType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO)
            return idTypeFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.identification.type.error", null, Locale.default))
        }
    }

    List<IdentificationType> getAllIdentificationTypes() {
        log.info "====== Getting all identification types from DB ======"
        try{
            def idTypesFromDB = IdentificationType.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return idTypesFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.identification.types.error", null, Locale.default))
        }
    }

    def createIdType(IdentificationType pidentificationType) {
        try{
            pidentificationType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.identification.type.error", null, Locale.default))
        }
    }

    def deleteIdType(IdentificationType pidentificationType) {
        try{
            pidentificationType.enabled = Constants.ESTADO_INACTIVO
            pidentificationType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.identification.type.error", null, Locale.default))
        }
    }

    def updateIdType(IdentificationType pidentificationType, UpdateIdentificationTypeRequest pupdateIdentificationTypeREST) {
        try{
            pidentificationType.name = pupdateIdentificationTypeREST.name
            pidentificationType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.identification.type.error", null, Locale.default))
        }
    }


    //Agent type

    AgentType getAgentType(def pid) {
        log.info "====== Getting agent type from DB ======"
        log.info pid
        try{
            AgentType agentTypeFromDB = AgentType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO)
            return agentTypeFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.agent.type.error", null, Locale.default))
        }
    }

    def getAllAgentTypes() {
        log.info "====== Getting all agent types from DB ======"
        try{
            def agentTypesFromDB = AgentType.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return agentTypesFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.agent.types.error", null, Locale.default))
        }
    }

    def createAgentType(AgentType pagentType) {
        try{
            pagentType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.agent.type.error", null, Locale.default))
        }
    }

    def deleteAgentType(AgentType pagentType) {
        try{
            pagentType.enabled = Constants.ESTADO_INACTIVO
            pagentType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.agent.type.error", null, Locale.default))
        }
    }

    def updateAgentType(AgentType pagentType, UpdateAgentTypeRequest pupdateAgentTypeREST) {
        try{
            pagentType.positionName = pupdateAgentTypeREST.positionName
            pagentType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.agent.type.error", null, Locale.default))
        }
    }

    //Customer type

    CustomerType getCustomerType(def pid) {
        log.info "====== Getting customer type from DB ======"
        log.info pid
        try{
            CustomerType customerTypeFromDB = CustomerType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO)
            return customerTypeFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.customer.type.error", null, Locale.default))
        }
    }

    def getAllCustomerTypes() {
        log.info "====== Getting all customer types from DB ======"
        try{
            def customerTypesFromDB = CustomerType.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return customerTypesFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.customer.types.error", null, Locale.default))
        }
    }

    def createCustomerType(CustomerType pcustomerType) {
        try{
            return pcustomerType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.customer.type.error", null, Locale.default))
        }
    }

    def deleteCustomerType(CustomerType pcustomerType) {
        try{
            pcustomerType.enabled = Constants.ESTADO_INACTIVO
            pcustomerType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.customer.type.error", null, Locale.default))
        }
    }

    def updateCustomerType(CustomerType pcustomerType, UpdateCustomerTypeRequest pupdateCustomerTypeREST) {
        try{
            pcustomerType.name = pupdateCustomerTypeREST.name
            pcustomerType.save(failOnError: true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.customer.type.error", null, Locale.default))
        }
    }

    //Product type

    ProductType getProductType(def pid) {
        log.info "====== Getting product type from DB ======"
        log.info pid
        try{
            ProductType productTypeFromDB = ProductType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO)
            return productTypeFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.product.type.error", null, Locale.default))
        }
    }

    def getAllProductTypes() {
        log.info "====== Getting all product types from DB ======"
        try{
            def productTypesFromDB = ProductType.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return productTypesFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.product.types.error", null, Locale.default))
        }
    }

    def createProductType(ProductType pproductType) {
        try{
            return pproductType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.product.type.error", null, Locale.default))
        }
    }

    def deleteProductType(ProductType pproductType) {
        try{
            pproductType.enabled = Constants.ESTADO_INACTIVO
            pproductType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.product.type.error", null, Locale.default))
        }
    }

    def updateProductType(ProductType pproductType, UpdateProductTypeRequest pupdateProductTypeREST) {
        try{
            pproductType.name = pupdateProductTypeREST.name
            pproductType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.product.type.error", null, Locale.default))
        }
    }


    //Presentation type

    PresentationType getPresentationType(def pid) {
        log.info "====== Getting presentation type from DB ======"
        log.info pid
        try{
            PresentationType presentationTypeFromDB = PresentationType.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO)
            return presentationTypeFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.presentation.type.error", null, Locale.default))
        }
    }

    def getAllPresentationTypes() {
        log.info "====== Getting all presentation types from DB ======"
        try{
            def presentationTypesFromDB = PresentationType.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return presentationTypesFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.presentation.types.error", null, Locale.default))
        }
    }

    def createPresentationType(PresentationType ppresentationType) {
        try{
            return ppresentationType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.presentation.type.error", null, Locale.default))
        }
    }

    def deletePresentationType(PresentationType ppresentationType) {
        try{
            ppresentationType.enabled = Constants.ESTADO_INACTIVO
            ppresentationType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.presentation.type.error", null, Locale.default))
        }
    }

    def updatePresentationType(PresentationType ppresentationType, UpdatePresentationTypeRequest pudatePresentationTypeREST) {
        try{
            ppresentationType.name = pudatePresentationTypeREST.name
            ppresentationType.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.presentation.type.error", null, Locale.default))
        }
    }

    //configurations

    def Configuration createConfiguration(Configuration argConfiguration) {
        def config
        try {
            config = argConfiguration.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.configuration.error", null, Locale.default))
        }
        return config
    }

    def deleteConfiguration(Configuration argConfiguration) {
        try {
            argConfiguration.enabled = Constants.ESTADO_INACTIVO
            argConfiguration.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.configuration.error", null, Locale.default))
        }
    }


        def getConfiguration(def argCode) {
        log.info "====== Getting configuration from db ======"
        log.info argCode
        try{
            Configuration config = Configuration.findByCode(argCode)
            return config
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.configuration.error", null, Locale.default))
        }
    }

    def getAllConfigurations() {
        log.info "====== Getting all configurations  from DB ======"
        try{
            def customerTypesFromDB = Configuration.findAll()
            return customerTypesFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.configurations.error", null, Locale.default))
        }
    }

    def updateConfiguration(Configuration argConfiguration) {
        try{
            argConfiguration.save(flush: true, failOnError:true)
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.configuration.error", null, Locale.default))
        }
    }


    //mantenimientos varios generales de catalogo

    def getAllPaymentTypes() {
        try{
            def paymentTypes = BillPaymentType.findAll()
            return paymentTypes
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.payment.types.error", null, Locale.default))
        }
    }


    def getAllStates() {
        try{
            def states = BillStateType.findAll()
            return states
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.bill.states.error", null, Locale.default))
        }
    }


    def getAllCreditConditions() {
        try{
            def creditConditions = CreditCondition.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return creditConditions
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.credit.conditions.error", null, Locale.default))
        }
    }

    def getAllCurrencies() {
        try{
            def currencies = Currency.findAll()
            return currencies
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.currencies.error", null, Locale.default))
        }
    }

    def getAllExchangeRates() {
        log.info "====== Getting all exchange rates from DB ======"
        try{
            def exchanges = ExchangeRate.findAll()
            return exchanges
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.exchange.rates.error", null, Locale.default))
        }
    }

    def getAllTaxes() {
        log.info "====== Getting all taxes  from DB ======"
        try{
            def taxes = Taxes.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return taxes
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.taxes.error", null, Locale.default))
        }
    }

    def getAllMeasureUnits() {
        log.info "====== Getting all measureUnits  from DB ======"
        try{
            def measureUnits = MeasureUnit.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return measureUnits
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("generic.get.error", null, Locale.default))
        }
    }

    def createOrUpdateMeasureUnit(def pMeasure) {
        log.info "====== create/update measure unit  ======"
        try{
            return pMeasure.save()
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("generic.create.error", null, Locale.default))
        }
    }

    def createOrUpdateTax(def pTax) {
        log.info "====== create/update tax  ======"
        try{
            def tmpTax = pTax.save()
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("createUpdate.tax.error", null, Locale.default))
        }
    }

    def deleteTax(def pTax) {
        log.info "====== delete tax  ======"
        try{
            pTax.enabled = Constants.ESTADO_INACTIVO
            pTax.save()
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("tax.delete.error", null, Locale.default))
        }
    }

    def deleteMeasureUnit(def pMeasure) {
        log.info "====== delete measureUnit  ======"
        try{
            pMeasure.enabled = Constants.ESTADO_INACTIVO
            pMeasure.save()
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("generic.delete.error", null, Locale.default))
        }
    }

    def getTaxById(def pid) {
        log.info "====== Getting tax by id from DB ======"
        log.info pid
        try{
            Taxes taxFromDB = Taxes.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO)
            return taxFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.tax.error", null, Locale.default))
        }
    }

    ExchangeRate getExchangeRateById(def pid) {
        log.info "====== Getting exchange rate from DB ======"
        log.info pid
        try{
            ExchangeRate exchangeRateFromDB = ExchangeRate.findByIdAndEnabled(pid, Constants.ESTADO_ACTIVO)
            return exchangeRateFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.exchange.rate.error", null, Locale.default))
        }
    }

    def getExchangeRateByCode(def pcode) {
        log.info "====== Getting exchange rate from DB ======"
        try{
            ExchangeRate exchangeRateFromDB = ExchangeRate.findByCode(pcode)
            return exchangeRateFromDB
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.exchange.rate.error", null, Locale.default))
        }
    }

    def updateExchangeRate(def pExchangeRate) {
        log.info "====== updating exchange rate from DB ======"
        log.info pExchangeRate.id
        try{
            pExchangeRate.save()
        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.exchange.rate.error", null, Locale.default))
        }
    }

    //static reference values
    def  createBillStateType(def pJSON) {
        try {
            def tmpBillState = new BillStateType(pJSON)
            tmpBillState.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.constantReference.error", null, Locale.default))
        }
    }

    def  createPaymentType(def pJSON) {
        try {
            def paymentType = new BillPaymentType(pJSON)
            paymentType.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.constantReference.error", null, Locale.default))
        }
    }


    def  createCurrency(def pJSON) {
        try {
            def tmpCurrency = new Currency(pJSON)
           tmpCurrency.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.constantReference.error", null, Locale.default))
        }
    }



    def  createOrUpdateCreditCon(def pCreditCon) {
        try {
             def tmpCrd= pCreditCon.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.constantReference.error", null, Locale.default))
        }
    }


    def  deleteCreditCondition(def pCreditCondition) {
        try {
            pCreditCondition.enabled = Constants.ESTADO_INACTIVO
            pCreditCondition.save()
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.constantReference.error", null, Locale.default))
        }
    }


    def  createExchangeRate(def pJSON) {
        try {
            def tmpExRate = new ExchangeRate()
            def currency = Currency.get(pJSON.currencyId)

            if(!currency){
                throw new LightRuntimeException(messageSource.getMessage("currency.dontExists.error", null, Locale.default))
            }
            tmpExRate.code = pJSON.code
            tmpExRate.description = pJSON.description
            tmpExRate.value = pJSON.value
            tmpExRate.currency = currency
            tmpExRate.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.constantReference.error", null, Locale.default))
        }
    }

    def getMaxCreditConCode(){
        def lastCode = 0
        try{
             lastCode = CreditCondition.createCriteria().get {
                projections {
                    max "code"
                }
              } as int
        }
        catch(Exception e){
            log.error(e)
        }
        lastCode
    }

    def getMaxMeasureUnitCode(){
        def lastCode = 0
        try{
            lastCode = MeasureUnit.createCriteria().get {
                projections {
                    max "code"
                }
            } as int
        }
        catch(Exception e){
            log.error(e)
        }
        lastCode
    }

    def getMaxPresentationTypeCode(){
        def lastCode = 0
        try{
            lastCode = PresentationType.createCriteria().get {
                projections {
                    max "code"
                }
            } as int
        }
        catch(Exception e){
            log.error(e)
        }
        lastCode
    }

    def getMaxProductCode(){
        def lastCode = 0
        try{
            lastCode = ProductType.createCriteria().get {
                projections {
                    max "code"
                }
            } as int
        }
        catch(Exception e){
            log.error(e)
        }
        lastCode
    }

    //Tipos de movimientos de ordenes de salida de bodega
    def getAllWarehouseMovementsTypes() {
        try {
            def movementsTypes = WarehouseOrderMovementType.findAll()
            return movementsTypes
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.warehouse.orders.movement.types.error", null, Locale.default))
        }
    }
}
