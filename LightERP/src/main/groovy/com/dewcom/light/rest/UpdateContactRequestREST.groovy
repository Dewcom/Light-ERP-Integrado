package com.dewcom.light.rest

import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdateContactRequestREST implements Validateable {
    Integer id
    String name
    String firstLastName
    String secondLastName
    String jobTitle
    String department
    String phoneNumber1
    String phoneNumber2
    String mobile
    String email
    Byte enabled = Constants.ESTADO_ACTIVO

    static constraints = {
        id  nullable: false
        name  blank: true, nullable: true
        firstLastName  blank: true, nullable: true
        secondLastName  blank: true, nullable: true
        jobTitle  blank: true, nullable: true
        department  blank: true, nullable: true
        phoneNumber1  blank: true, nullable: true
        phoneNumber2  blank: true, nullable: true
        mobile  blank: true, nullable: true
        email  blank: true, nullable: true

    }
}
