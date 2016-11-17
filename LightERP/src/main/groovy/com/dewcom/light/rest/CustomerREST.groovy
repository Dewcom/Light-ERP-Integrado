package com.dewcom.light.rest

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
    Integer idDistrict //Con el id del distrito obtenemos el cantón y la provincia
    String address1
    String address2
    String phoneNumber1
    String phoneNumber2
    String mobile
    String website
    String email
    Byte enabled = Constants.ESTADO_ACTIVO
    Date regitrationDate = new Date()
    Double discountPercentage
    Double creditLimit
    Integer identificationType
    Integer customerType
    List<Contact> contacts

    static constraints = {
        name blank: false
        firstLastName blank: false
        secondLastName blank: false
        identification blank: false, nullable: false
        idDistrict nullable: true
        address1 blank: false, nullable: false
        address2 nullable: true, blank: true
        phoneNumber1 blank: false, nullable: false
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        website nullable: true, blank: true
        email nullable: true, blank: true
        discountPercentage nullable: true
        creditLimit nullable: true
    }
}
