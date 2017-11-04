package com.dewcom.light.warehouse

import com.dewcom.light.rest.warehouse.StorehouseRequest
import com.dewcom.light.utils.Constants

class Storehouse {
    String name
    String address
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
    ProductLot productLot

    static hasMany = [productLots: ProductLot]

    static constraints = {
        name blank: false, nullable: false
    }

    def static fromRestStorehouse(StorehouseRequest storehouseRequest){

        Storehouse storehouse = new Storehouse()

        storehouse.name = storehouseRequest.name
        storehouse.address = storehouseRequest.address

        return storehouse
    }
}
