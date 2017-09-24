package com.dewcom.light.rest.thirdparty

import com.dewcom.light.thirdparty.Address
import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdateCustomerRequest implements Validateable {
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
        firstLastName blank: true, nullable: true
        secondLastName blank: true, nullable: true
        creditLimit nullable: true
        discountPercentage nullable: true
        email nullable: true
        mobile nullable: true
        phoneNumber2 nullable: true
        phoneNumber1 nullable: true, blank:true
        website nullable: true
    }
}
