package com.dewcom.light

import com.dewcom.light.rest.UpdateCustomerRequestREST
import grails.transaction.Transactional
 import com.dewcom.light.rest.CustomerREST

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
        log.info "====== Getting all customer from DB ======"
        try {
            def customersFromDB = Customer.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return customersFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.customers.error", null, Locale.default));
        }
    }

    def createCustomer(Customer pcustomer) {
        try {
            pcustomer.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.customer.error", null, Locale.default));
        }
    }

    def deleteCustomer(Customer pcustomer) {
        try {
            pcustomer.enabled = Constants.ESTADO_INACTIVO;
            pcustomer.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.customer.error", null, Locale.default));
        }
    }

    def updateCustomer(UpdateCustomerRequestREST argRestCustomer) {
        try {
            Customer tmpCustomerToUpdate = Customer.findByIdAndEnabled(argRestCustomer.id, Constants.ESTADO_ACTIVO)
            if (tmpCustomerToUpdate) {
                tmpCustomerToUpdate.name = argRestCustomer.name;
                tmpCustomerToUpdate.firstLastName = argRestCustomer.firstLastName;
                tmpCustomerToUpdate.secondLastName = argRestCustomer.secondLastName;
                tmpCustomerToUpdate.address1 = argRestCustomer.address1;
                tmpCustomerToUpdate.address2 = argRestCustomer.address2;
                tmpCustomerToUpdate.phoneNumber1 = argRestCustomer.phoneNumber1;
                tmpCustomerToUpdate.phoneNumber2 = argRestCustomer.phoneNumber2;
                tmpCustomerToUpdate.mobile = argRestCustomer.mobile;
                tmpCustomerToUpdate.website = argRestCustomer.website;
                tmpCustomerToUpdate.email = argRestCustomer.email;
                tmpCustomerToUpdate.discountPercentage = argRestCustomer.discountPercentage;
                tmpCustomerToUpdate.creditLimit = argRestCustomer.creditLimit;
                tmpCustomerToUpdate.idDistrict = argRestCustomer.idDistrict;

                tmpCustomerToUpdate.identificationType = IdentificationType.findByIdAndEnabled(argRestCustomer.identificationType, Constants.ESTADO_ACTIVO);
                tmpCustomerToUpdate.customerType =  CustomerType.findByIdAndEnabled(argRestCustomer.customerType, Constants.ESTADO_ACTIVO);

                tmpCustomerToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.customer.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if(e instanceof LightRuntimeException ){
                throw e;
            }
            else{
              throw new LightRuntimeException(messageSource.getMessage("update.customer.error", null, Locale.default));
            }
        }
    }
}
