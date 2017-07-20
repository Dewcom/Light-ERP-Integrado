package com.dewcom.light.rest.response

/**
 * Created by lchen on 5/20/17.
 */
class CustomerRespREST {
    Long id
    String name
    String firstLastName
    String secondLastName
    String identification
    String phoneNumber1
    String phoneNumber2
    String mobile
    String website
    String email
    Byte enabled
    Date registrationDate
    Double discountPercentage
    Double creditLimit
    List<ContactRespREST> contacts
    List<AddressRespREST> addresses
    IdentificationTypeRespREST identificationType
    CustomerTypeRespREST customerType
}
