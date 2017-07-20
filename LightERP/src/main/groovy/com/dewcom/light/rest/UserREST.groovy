package com.dewcom.light.rest

import com.dewcom.light.Constants
import com.dewcom.light.Customer
import com.dewcom.light.Supplier
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 28/01/17.
 */
class UserREST implements Validateable {

    String username
    String password
    String userCode
    String name
    String firstLastName
    String secondLastName
    String email
    String mobile
    String phoneNumber
    String extension
    Double commissionPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        password blank: false, password: true
        username blank: false, unique: true
        userCode blank: false, nullable: false, maxSize: 5
        name blank: false
        firstLastName blank: true, nullable: true
        secondLastName blank: true, nullable: true
        phoneNumber blank: false
        extension blank: true, nullable: true
        mobile nullable: true, blank: true
        email nullable: true, blank: true
        commissionPercentage nullable: true
    }
}
