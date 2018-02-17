package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import com.dewcom.light.warehouse.Product
import com.dewcom.light.warehouse.WarehouseOrder

/**
 * Created by Mauricio Fernández Mora on 17/02/18.
 */
class WarehouseOrderDetailRequest {
    Long id
    WarehouseOrder warehouseOrder
    Product product
    Integer quantity
    Byte enabled = Constants.ESTADO_ACTIVO

    static constraints = {
        warehouseOrder nullable: false
        product nullable: false
        quantity nullable: false
    }
}
