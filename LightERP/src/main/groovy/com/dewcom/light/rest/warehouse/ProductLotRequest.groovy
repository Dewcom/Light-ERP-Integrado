package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import com.dewcom.light.warehouse.Storehouse
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 04/11/17.
 */
class ProductLotRequest implements Validateable{
    String username
    String lotNumber
    String expirationDate
    String lotDate
    Double quantity
    Long productId
    Long storehouseId
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static hasMany = [storehouses: Storehouse]

    static belongsTo = [Storehouse]

    static constraints = {
        username blank: false, nullable: false
        lotNumber blank: false, nullable: false
        quantity nullable: false
        productId nullable: false
        storehouseId nullable: false
    }
}
