package com.dewcom.light.warehouse

import com.dewcom.light.utils.Constants

class WarehouseOrderMovementType {
    //produccion, venta, movimiento de bodegas

    //codigo de estados factura
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_PRODUCTION = 1
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_SALE = 2
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_BETWEEN_STOREHOUSES = 3
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_NEW_LOT = 4
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_UPDATE = 5
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_DELETE = 6
    Long id
    Integer code
    Byte enabled = Constants.ESTADO_ACTIVO
    String description

    static constraints = {
        code nullable: true
    }
    static transients = ['id']
}
