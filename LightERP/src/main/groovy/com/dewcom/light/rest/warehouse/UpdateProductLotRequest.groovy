package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 04/11/17.
 */
class UpdateProductLotRequest implements Validateable {
    Integer id
    String lotNumber
    String expirationDate
    String lotDate
    Integer productOrigin
    Double quantity
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        lotNumber blank: false, nullable: false
        expirationDate blank: false, nullable: false
        lotDate blank: false, nullable: false
        quantity nullable: false
    }
}
