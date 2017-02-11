package com.dewcom.light

import com.dewcom.light.rest.CustomerREST

class Customer {

    String name
    String firstLastName
    String secondLastName
    String identification
    String phoneNumber1
    String phoneNumber2
    String mobile
    String website
    String email
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
    Double discountPercentage
    Double creditLimit
    IdentificationType identificationType
    CustomerType customerType

    static hasMany = [contacts: Contact, agents: User, addresses: Address, bills:Bill]

    static belongsTo = [User]

    static constraints = {
        name blank: false
        firstLastName blank: true, nullable: true
        secondLastName blank: true, nullable: true
        identification blank: false, nullable: false, maxSize: 20
        phoneNumber1 blank: false
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        website nullable: true, blank: true
        email nullable: true, blank: true
        discountPercentage nullable: true
        creditLimit nullable: true
    }

    def static fromRestCustomer(CustomerREST argRestCustomer){

        Customer tmpCustomer = new Customer();

        tmpCustomer.name = argRestCustomer.name;
        tmpCustomer.identification = argRestCustomer.identification;
        tmpCustomer.firstLastName = argRestCustomer.firstLastName;
        tmpCustomer.secondLastName = argRestCustomer.secondLastName;
        tmpCustomer.phoneNumber1 = argRestCustomer.phoneNumber1;
        tmpCustomer.phoneNumber2 = argRestCustomer.phoneNumber2;
        tmpCustomer.mobile = argRestCustomer.mobile;
        tmpCustomer.website = argRestCustomer.website;
        tmpCustomer.email = argRestCustomer.email;
        tmpCustomer.website = argRestCustomer.website;
        tmpCustomer.discountPercentage = argRestCustomer.discountPercentage;
        tmpCustomer.creditLimit = argRestCustomer.creditLimit;

        argRestCustomer.contacts.each {
            if(!it.toString().equals("{}")){
                println(it);
                tmpCustomer.addToContacts(it);
            }
        }

        argRestCustomer.addresses.each {
            if(!it.toString().equals("{}")){
                println(it);
                tmpCustomer.addToAddresses(it);
            }
        }

        tmpCustomer.identificationType = IdentificationType.findByIdAndEnabled(argRestCustomer.identificationType, Constants.ESTADO_ACTIVO);
        tmpCustomer.customerType =  CustomerType.findByIdAndEnabled(argRestCustomer.customerType, Constants.ESTADO_ACTIVO);

        return tmpCustomer;
    }
}