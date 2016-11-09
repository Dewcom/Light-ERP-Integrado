package com.dewcom.light

import com.dewcom.light.rest.CustomerREST

class Customer {

    String name
    String firstLastName
    String secondLastName
    String identification
    int idDistrict //Con el id del distrito obtenemos el cantón y la provincia
    String address1
    String address2
    String phoneNumber1
    String phoneNumber2
    String mobile
    String website
    String email
    Byte enabled = Constants.ESTADO_ACTIVO
    Date regitrationDate = new Date()
    double discountPercentage
    double creditLimit
    IdentificationType identificationType
    CustomerType customerType

    static hasMany = [contacts: Contact, agents: Agent]
    static belongsTo = [Agent]

    static constraints = {
        name blank: false
        firstLastName blank: false
        secondLastName blank: false
        identification blank: false, nullable: false
        idDistrict nullabe: true
        address1 blank: false
        address2 nullable: true, blank: true
        phoneNumber1 blank: false
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        website nullable: true, blank: true
        email nullable: true, blank: true
        discountPercentage nullable: true
        creditLimit nullable: true
    }


    def static fromRestCustomer(CustomerREST argRestCostumer){
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
