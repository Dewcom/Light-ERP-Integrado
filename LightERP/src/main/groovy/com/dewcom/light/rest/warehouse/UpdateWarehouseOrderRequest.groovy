package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 17/02/18.
 */
class UpdateWarehouseOrderRequest implements Validateable {
    String username
    Integer billId
    Integer warehouseOrderId
    Integer warehouseOrderStateType
    Integer warehouseOrderMovementType
    List<WarehouseOrderDetailRequest> warehouseOrderDetails

    static constraints = {
    }
}
