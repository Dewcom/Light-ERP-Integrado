package com.dewcom.light


import grails.transaction.Transactional
 import com.dewcom.light.rest.CustomerREST

@Transactional
class CustomerService {

    Customer getCustomer(def customerId) {
        log.info "====== Getting customer from DB ======"
        log.info customerId
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
        tmpCustomer.identification = argRestCostumer.identification;
        tmpCustomer.firstLastName = argRestCostumer.firstLastName;
        tmpCustomer.secondLastName = argRestCostumer.secondLastName;
        tmpCustomer.address1 = argRestCostumer.address1;
        tmpCustomer.address2 = argRestCostumer.address2;
        tmpCustomer.phoneNumber1 = argRestCostumer.phoneNumber1;
        tmpCustomer.phoneNumber2 = argRestCostumer.phoneNumber2;
        tmpCustomer.mobile = argRestCostumer.mobile;
        tmpCustomer.website = argRestCostumer.website;
        tmpCustomer.email = argRestCostumer.email;
        tmpCustomer.website = argRestCostumer.website;
        tmpCustomer.discountPercentage = argRestCostumer.discountPercentage;
        tmpCustomer.creditLimit = argRestCostumer.creditLimit;
        tmpCustomer.idDistrict = argRestCostumer.idDistrict;

        tmpCustomer.identificationType = IdentificationType.findByIdAndEnabled(argRestCostumer.identificationType, Constants.ESTADO_ACTIVO);
        tmpCustomer.customerType =  CustomerType.findByIdAndEnabled(argRestCostumer.customerType, Constants.ESTADO_ACTIVO);

        return tmpCustomer;
    }
}
