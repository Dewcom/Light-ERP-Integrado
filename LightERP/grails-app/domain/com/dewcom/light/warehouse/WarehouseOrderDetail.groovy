package com.dewcom.light.warehouse

import com.dewcom.light.billing.Bill
import com.dewcom.light.utils.Constants

class WarehouseOrderDetail {
    WarehouseOrder warehouseOrder
    Product product
    Integer quantity
    Byte enabled = Constants.ESTADO_ACTIVO

    static belongsTo = [WarehouseOrder]
    static constraints = {
        warehouseOrder nullable: false
        product nullable: false
        quantity nullable: false
    }
}
