package com.dewcom.light.rest

import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdateContactRequestREST implements Validateable {
    int id
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

    }
}
