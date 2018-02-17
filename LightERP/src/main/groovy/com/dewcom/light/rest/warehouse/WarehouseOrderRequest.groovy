package com.dewcom.light.rest.warehouse

import com.dewcom.light.billing.Bill
import com.dewcom.light.utils.Constants
import com.dewcom.light.warehouse.WarehouseOrderDetail
import com.dewcom.light.warehouse.WarehouseOrderStateType

/**
 * Created by Mauricio Fernández Mora on 17/02/18.
 */
class WarehouseOrderRequest {
    Long warehouseOrderId
    Byte enabled = Constants.ESTADO_ACTIVO
    Long warehouseOrderNumber
    Date warehouseOrderDate = new Date()
    Bill bill
    WarehouseOrderStateType warehouseOrderStateType
    List<WarehouseOrderDetail> warehouseOrderDetails

    static constraints = {
        warehouseOrderId nullable: false
        warehouseOrderNumber nullable: false
        warehouseOrderDate nullable: false
        bill nullable: true
        warehouseOrderStateType nullable: false
    }
}
