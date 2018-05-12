package com.dewcom.light.warehouse

class WarehouseOrderStateType {
    //borrador, validada, rechazada

    //codigo de estados factura
    public static final Integer WAREHOUSE_ORDER_CREATED = 1
    public static final Integer WAREHOUSE_ORDER_VALIDATED = 2
    public static final Integer WAREHOUSE_ORDER_DECLINED = 3

    Integer code
    String description

    static constraints = {
    }
}
