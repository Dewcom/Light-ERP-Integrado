package com.dewcom.light


import grails.transaction.Transactional
 import com.dewcom.light.rest.CustomerREST

@Transactional
class CustomerService {

    Customer getCustomer(def customerId) {
        log.info "====== Getting customer from DB ======"
        log.info pid
        try {
            Customer customerFromDB = Customer.findByIdAndEnabled(customerId, Constants.ESTADO_ACTIVO);
            return customerFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException("get.customer.error");
        }
    }


    def getAllCustomers() {
        log.info "====== Getting all customer from DB ======"
        try {
            def customersFromDB = Customer.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return customersFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException("get.all.customers.error");
        }
    }

    def createCustomer(Customer pcustomer) {
        try {
            pcustomer.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException("create.customer.error");
        }
    }

    def deleteCustomer(Customer pcustomer) {
        try {
            pcustomer.enabled = Constants.ESTADO_INACTIVO;
            pcustomer.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException("delete.customer.error");
        }
    }

    def updateCustomer(CustomerREST argRestCustomer) {
        try {
            Customer tmpCustomerToUpdate = Customer.findByIdAndEnabled(argRestCustomer.id, Constants.ESTADO_ACTIVO)
            if (tmpCustomerToUpdate) {
                tmpCustomerToUpdate.name = argRestCustomer.name;
                tmpCustomerToUpdate.firstLastName = argRestCustomer.name;
                tmpCustomerToUpdate.secondLastName = argRestCustomer.name;
                tmpCustomerToUpdate.address1 = argRestCustomer.name;
                tmpCustomerToUpdate.address2 = argRestCustomer.name;
                tmpCustomerToUpdate.phoneNumber1 = argRestCustomer.name;
                tmpCustomerToUpdate.phoneNumber2 = argRestCustomer.name;
                tmpCustomerToUpdate.mobile = argRestCustomer.name;
                tmpCustomerToUpdate.website = argRestCustomer.name;
                tmpCustomerToUpdate.email = argRestCustomer.name;
                tmpCustomerToUpdate.website = argRestCustomer.name;
                tmpCustomerToUpdate.discountPercentage = argRestCustomer.discountPercentage;
                tmpCustomerToUpdate.creditLimit = argRestCustomer.creditLimit;
                tmpCustomerToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException("update.customer.notFound.error");
            }
        }

        catch (Exception e) {
            log.error(e);
            if(e instanceof LightRuntimeException ){
                throw e;
            }
            else{
              throw new LightRuntimeException("update.customer.error");
            }
        }
    }

    def restCustomerToCustomer(CustomerREST argRestCostumer){
        Customer tmpCustomer = new Customer();

        tmpCustomer.name = argRestCostumer.name;
        tmpCustomer.firstLastName = argRestCostumer.name;
        tmpCustomer.secondLastName = argRestCostumer.name;
        tmpCustomer.address1 = argRestCostumer.name;
        tmpCustomer.address2 = argRestCostumer.name;
        tmpCustomer.phoneNumber1 = argRestCostumer.name;
        tmpCustomer.phoneNumber2 = argRestCostumer.name;
        tmpCustomer.mobile = argRestCostumer.name;
        tmpCustomer.website = argRestCostumer.name;
        tmpCustomer.email = argRestCostumer.name;
        tmpCustomer.website = argRestCostumer.name;
        tmpCustomer.discountPercentage = argRestCostumer.discountPercentage;
        tmpCustomer.creditLimit = argRestCostumer.creditLimit;

        tmpCustomer.identificationType = IdentificationType.findByIdAndEnabled(argRestCostumer.identificationType, Constants.ESTADO_ACTIVO);
        tmpCustomer.customerType =  CustomerType.findByIdAndEnabled(argRestCostumer.customerType, Constants.ESTADO_ACTIVO);

        return tmpCustomer;
    }
}
