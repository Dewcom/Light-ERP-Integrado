package com.dewcom.light.thirdparty

import com.dewcom.light.utils.Constants

class Contact {
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
    Date registrationDate = new Date()
    Customer customer
    static belongsTo = [Customer]

    static constraints = {
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
