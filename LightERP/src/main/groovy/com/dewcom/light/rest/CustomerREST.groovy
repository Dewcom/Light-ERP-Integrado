package com.dewcom.light.rest

import grails.validation.Validateable
import com.dewcom.light.Constants
/**
 * Created by Leo chen on 11/09/16.
 */
class CustomerREST implements Validateable {
    int id
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
    int identificationType
    int customerType

    static constraints = {
        id nullabe: true
    }
}
