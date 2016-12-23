package com.dewcom.light.rest

import com.dewcom.light.Address
import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdateCustomerRequestREST implements Validateable {
    Integer id
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
    List<Address> addresses


    static constraints = {
        id nullable: false
        creditLimit nullable: true
        discountPercentage nullable: true
        email nullable: true
        mobile nullable: true
        phoneNumber2 nullable: true
        website nullable: true
    }
}
