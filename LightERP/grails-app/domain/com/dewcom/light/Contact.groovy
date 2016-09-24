package com.dewcom.light

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
    Date regitrationDate = new Date()

    static constraints = {
        name blank: false
        firstLastName blank: false
        secondLastName blank: false
        jobTitle nullabe: true, blank: true
        department nullabe: true, blank: true
        phoneNumber1 blank: false
        phoneNumber2 nullabe: true, blank: true
        mobile nullabe: true, blank: true
        email nullabe: true, blank: true
    }
}
