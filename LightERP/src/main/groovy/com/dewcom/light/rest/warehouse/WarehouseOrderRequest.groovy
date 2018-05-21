package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 17/02/18.
 */
class WarehouseOrderRequest implements Validateable {
    String username
    Byte enabled = Constants.ESTADO_ACTIVO
    Date warehouseOrderDate = new Date()
    Integer warehouseOrderStateType
    Integer warehouseOrderMovementType
    List<WarehouseOrderDetailRequest> warehouseOrderDetails

    static constraints = {
        warehouseOrderDate nullable: false
        warehouseOrderStateType nullable: false
    }
}
