package com.dewcom.light

class Supplier {

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
    Date registrationDate = new Date()
    IdentificationType identificationType
    SupplierType supplierType

    static hasMany = [contacts: Contact]

    static constraints = {
        name blank: false
        firstLastName blank: false
        secondLastName blank: false
        identification blank: false, unique: true
        idDistrict nullable: true, blank: true
        address1 blank: false
        address2 nullable: true, blank: true
        phoneNumber1 blank: false
        phoneNumber2 nullable: true, blank: true
        mobile nullable: true, blank: true
        website nullable: true, blank: true
        email nullable: true, blank: true
    }
}
