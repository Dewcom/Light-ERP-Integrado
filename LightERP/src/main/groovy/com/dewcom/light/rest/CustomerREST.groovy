package com.dewcom.light.rest

import com.dewcom.light.Address
import com.dewcom.light.Contact
import grails.validation.Validateable
import com.dewcom.light.Constants
/**
 * Created by Leo chen on 11/09/16.
 */
class CustomerREST implements Validateable {

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
    Integer identificationType
    Integer customerType
    List<Contact> contacts
    List<Address> addresses

    static constraints = {
        name blank: false
        firstLastName blank: true, nullable: true
        secondLastName blank: true, nullable: true
        identification blank: false, nullable: false
        phoneNumber1 blank: true, nullable: true
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        website nullable: true, blank: true
        email nullable: true, blank: true
        discountPercentage nullable: true
        creditLimit nullable: true
    }
}
