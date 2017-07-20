package com.dewcom.light.rest

import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdateContactRequestREST implements Validateable {
    Integer id
    String name = ""
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
        name blank: false
        firstLastName nullable: true, blank: true
        secondLastName nullable: true, blank: true
        jobTitle nullable: true, blank: true
        department nullable: true, blank: true
        phoneNumber1 blank: false
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        email nullable: true, blank: true
    }
}
