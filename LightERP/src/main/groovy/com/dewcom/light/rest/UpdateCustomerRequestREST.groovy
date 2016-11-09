package com.dewcom.light.rest

import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdateCustomerRequestREST implements Validateable {
    Integer id
    String name
    String firstLastName
    String secondLastName
    String identification
    Integer idDistrict //Con el id del distrito obtenemos el cantón y la provincia
    String address1
    String address2
    String phoneNumber1
    String phoneNumber2
    String mobile
    String website
    String email
    Byte enabled = Constants.ESTADO_ACTIVO
    Date regitrationDate = new Date()
    Double discountPercentage
    Double creditLimit
    Integer identificationType
    Integer customerType

    static constraints = {
        id nullable: false
    }
}
