package com.dewcom.light.warehouse

import com.dewcom.light.billing.Bill
import com.dewcom.light.rest.warehouse.ProductRespREST
import com.dewcom.light.rest.warehouse.WarehouseOrderRequest
import com.dewcom.light.utils.Constants

class WarehouseOrder {
    Byte enabled = Constants.ESTADO_ACTIVO
    Date warehouseOrderDate = new Date()
    Bill bill
    WarehouseOrderStateType warehouseOrderStateType
    WarehouseOrderMovementType warehouseOrderMovementType
    static hasMany = [warehouseOrderDetails: WarehouseOrderDetail]

    static constraints = {
        warehouseOrderDate nullable: false
        bill nullable: true
        warehouseOrderStateType nullable: false
    }


    def static fromRestWarehouseOrder(WarehouseOrderRequest warehouseOrderRequest){

        WarehouseOrder warehouseOrder = new WarehouseOrder()

        warehouseOrder.bill = null
        warehouseOrder.warehouseOrderStateType = WarehouseOrderStateType.findById(warehouseOrderRequest.warehouseOrderStateType, Constants.ESTADO_ACTIVO)
        warehouseOrder.warehouseOrderMovementType = WarehouseOrderMovementType.findById(warehouseOrderRequest.warehouseOrderMovementType, Constants.ESTADO_ACTIVO)

        warehouseOrderRequest.warehouseOrderDetails.each {

            if(it) {
                WarehouseOrderDetail tmpDetail = new WarehouseOrderDetail()
                ProductLot tmpProductLot = ProductLot.findByIdAndEnabled(it.productLotId, Constants.ESTADO_ACTIVO)
                tmpDetail.productLot = tmpProductLot
                tmpDetail.quantity = it.quantity
                warehouseOrder.addToWarehouseOrderDetails(tmpDetail)
            }
        }

        return warehouseOrder
    }
}
