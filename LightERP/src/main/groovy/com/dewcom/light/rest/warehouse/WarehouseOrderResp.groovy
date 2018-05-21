package com.dewcom.light.rest.warehouse

import com.dewcom.light.billing.Bill
import com.dewcom.light.rest.response.BillRespREST
import com.dewcom.light.warehouse.WarehouseOrderDetail
import com.dewcom.light.warehouse.WarehouseOrderMovementType
import com.dewcom.light.warehouse.WarehouseOrderStateType

class WarehouseOrderResp {
    Long id
    Byte enabled
    Date warehouseOrderDate
    BillRespREST bill
    WarehouseOrderStateType warehouseOrderStateType
    WarehouseOrderMovementType warehouseOrderMovementType
    List<WarehouseOrderDetailResp> warehouseOrderDetails
}
