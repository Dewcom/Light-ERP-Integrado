package com.dewcom.light.warehouse

class WarehouseOrderStateType {
    //borrador, validada

    //codigo de estados facturas
    public static final Integer WAREHOUSE_ORDER_CREATED = 1;
    public static final Integer WAREHOUSE_ORDER_VALIDATED =2;

    Integer code
    String description

    static constraints = {
    }
}
