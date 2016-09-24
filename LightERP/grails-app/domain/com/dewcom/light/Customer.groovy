package com.dewcom.light

class Customer {

    String name
    String firstLastName
    String secondLastName
    String identification
    int idDistrict //Con el id del distrito obtenemos el cantón y la provincia
    String address1
    String address2
    String phoneNumber1
    String phoneNumber2
    String mobile
    String website
    String email
    Byte enabled = Constants.ESTADO_ACTIVO
    Date regitrationDate = new Date()
    double discountPercentage
    double creditLimit
    IdentificationType identificationType
    CustomerType customerType

    static hasMany = [contacts: Contact, agents: Agent]
    static belongsTo = [Agent]

    static constraints = {
        name blank: false
        firstLastName blank: false
        secondLastName blank: false
        identification blank: false, unique: true
        idDistrict nullabe: true, blank: true
        address1 blank: false
        address2 nullabe: true, blank: true
        phoneNumber1 blank: false
        phoneNumber2 nullabe: true, blank: true
        mobile nullabe: true, blank: true
        website nullabe: true, blank: true
        email nullabe: true, blank: true
        discountPercentage nullabe: true, blank: true
        creditLimit nullabe: true, blank: true
    }
}
