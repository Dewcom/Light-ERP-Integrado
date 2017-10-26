package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/10/17.
 */
class StorehouseRequest implements Validateable{

    String name
    String address
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        name blank: false, nullable: false
    }
}
