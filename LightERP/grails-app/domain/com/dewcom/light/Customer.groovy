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
        idDistrict nullabe: true
        address1 blank: false
        address2 nullable: true, blank: true
        phoneNumber1 blank: false
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        website nullable: true, blank: true
        email nullable: true, blank: true
        discountPercentage nullable: true
        creditLimit nullable: true
    }
}
