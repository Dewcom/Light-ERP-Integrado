package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by lchen on 6/27/17.
 */
class ContactREST implements Validateable {
    Long customerId
    String name
    String firstLastName
    String secondLastName
    String jobTitle
    String department
    String phoneNumber1
    String phoneNumber2
    String mobile
    String email
    static constraints = {
        name blank: false
        firstLastName blank: false
        secondLastName blank: false
        jobTitle nullable: true, blank: true
        department nullable: true, blank: true
        phoneNumber1 blank: false
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        email nullable: true, blank: true
    }
}
