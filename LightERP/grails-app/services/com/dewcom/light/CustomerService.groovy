package com.dewcom.light

import com.dewcom.light.rest.UpdateCustomerRequestREST
import grails.converters.JSON
import grails.transaction.Transactional
 import com.dewcom.light.rest.CustomerREST
import net.minidev.json.JSONArray
import org.grails.web.json.JSONObject

@Transactional
class CustomerService {

    def messageSource

    Customer getCustomer(def customerId) {
        log.info "====== Getting customer from DB ======"
        log.info customerId
        try {
            Customer customerFromDB = Customer.findByIdAndEnabled(customerId, Constants.ESTADO_ACTIVO);
            return customerFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.customer.error", null, Locale.default));
        }
    }


    def getAllCustomers() {
        log.info "====== Getting all customers from DB ======"
        try {
            def customersFromDB = Customer.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return customersFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.customers.error", null, Locale.default));
        }
    }

    def createCustomer(Customer pcustomer) {
        log.info "====== Creating customer ======"
        try {
            pcustomer.save(flush: true, failOnError: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.customer.error", null, Locale.default));
        }
    }

    def deleteCustomer(Customer pcustomer) {
        log.info "====== Deleting customer ======"
        try {
            pcustomer.addresses.each {
                it.enabled = Constants.ESTADO_INACTIVO
            }
            pcustomer.enabled = Constants.ESTADO_INACTIVO;
            pcustomer.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.customer.error", null, Locale.default));
        }
    }

    def updateCustomer(UpdateCustomerRequestREST argRestCustomer) {
        log.info "====== Updating customer ======"
        try {
            Customer tmpCustomerToUpdate = Customer.findByIdAndEnabled(argRestCustomer.id, Constants.ESTADO_ACTIVO)
            if (tmpCustomerToUpdate) {

                tmpCustomerToUpdate.name = argRestCustomer.name;
                tmpCustomerToUpdate.firstLastName = argRestCustomer.firstLastName;
                tmpCustomerToUpdate.secondLastName = argRestCustomer.secondLastName;
                tmpCustomerToUpdate.phoneNumber1 = argRestCustomer.phoneNumber1;
                tmpCustomerToUpdate.phoneNumber2 = argRestCustomer.phoneNumber2;
                tmpCustomerToUpdate.mobile = argRestCustomer.mobile;
                tmpCustomerToUpdate.website = argRestCustomer.website;
                tmpCustomerToUpdate.email = argRestCustomer.email;
                tmpCustomerToUpdate.discountPercentage = argRestCustomer.discountPercentage;
                tmpCustomerToUpdate.creditLimit = argRestCustomer.creditLimit;
                tmpCustomerToUpdate.identification = argRestCustomer.identification;

                //Se desactivan las direcciones que fueron eliminadas en el FE
                tmpCustomerToUpdate.addresses.each {

                    def tmpIt = it;
                    tmpIt.enabled = Constants.ESTADO_INACTIVO;

                    argRestCustomer.addresses.each {
                        if(tmpIt.id == it.id){
                            tmpIt.enabled = Constants.ESTADO_ACTIVO;
                        }
                    }
                }

                //Se agregan las direcciones nuevas
                argRestCustomer.addresses.each {

                    if(it.id == null){
                        tmpCustomerToUpdate.addToAddresses(it);
                    }
                }

                tmpCustomerToUpdate.identificationType = IdentificationType.findByIdAndEnabled(argRestCustomer.identificationType, Constants.ESTADO_ACTIVO);
                tmpCustomerToUpdate.customerType = CustomerType.findByIdAndEnabled(argRestCustomer.customerType, Constants.ESTADO_ACTIVO);

                tmpCustomerToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.customer.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if (e instanceof LightRuntimeException) {
                throw e;
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.customer.error", null, Locale.default));
            }
        }
    }

    def getCustomerContacts(def customerId) {
        log.info "====== Getting all contacts from DB by customerId ======"
        def tmpCustomer = Customer.findById(customerId)
        try {
            def contactsFromDB = Contact.findAllByEnabledAndCustomer(Constants.ESTADO_ACTIVO, tmpCustomer);
            return contactsFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.contacts.error", null, Locale.default));
        }

    }

    def getCustomerAddresses(def customerId) {
        log.info "====== Getting all addresses from DB by customerId ======"
        def tmpCustomer = Customer.findById(customerId);
        try {
            def addressesFromDB = Address.findAllByEnabledAndCustomer(Constants.ESTADO_ACTIVO, tmpCustomer);
            log.info(addressesFromDB);
            return addressesFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.addresses.error", null, Locale.default));
        }

    }
}