package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import com.dewcom.light.warehouse.Product

class WarehouseOrderDetailResp {
    ProductLotRespREST productLot
    Integer quantity
    Byte enabled = Constants.ESTADO_ACTIVO
}
