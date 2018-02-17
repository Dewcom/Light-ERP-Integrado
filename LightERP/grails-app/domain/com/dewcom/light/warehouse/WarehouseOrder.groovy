package com.dewcom.light.warehouse

import com.dewcom.light.billing.Bill
import com.dewcom.light.utils.Constants

class WarehouseOrder {
    Byte enabled = Constants.ESTADO_ACTIVO
    Long warehouseOrderNumber
    Date warehouseOrderDate = new Date()
    Bill bill
    WarehouseOrderStateType warehouseOrderStateType
    static hasMany = [warehouseOrderDetails: WarehouseOrderDetail]

    static constraints = {
        warehouseOrderNumber nullable: false
        warehouseOrderDate nullable: false
        bill nullable: true
        warehouseOrderStateType nullable: false
    }
}
