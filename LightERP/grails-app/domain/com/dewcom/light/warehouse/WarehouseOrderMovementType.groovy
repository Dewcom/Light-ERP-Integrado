package com.dewcom.light.warehouse

class WarehouseOrderMovementType {
    //produccion, venta, movimiento de bodegas

    //codigo de estados factura
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_PRODUCTION = 1
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_SALE = 2
    public static final Integer WAREHOUSE_ORDER_MOVEMENT_BETWEEN_STOREHOUSES = 3

    Integer code
    String description

    static constraints = {
    }
}
