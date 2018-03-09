package com.dewcom.light.billing

/**
 * Created by chen on 15/01/17.
 */
class BillStateType {
    //borrador, validada, pagada parcialmente, pagada, anulada.

    //codigo de estados facturas
    public static final Integer FACTURA_CREADA = 1;
    public static final Integer FACTURA_VALIDADA =2 ;
    public static final Integer FACTURA_PAGADA_PARCIAL =3;
    public static final Integer FACTURA_PAGADA =4 ;
    public static final Integer FACTURA_ANULADA =5;
    public static final Integer BILL_PRE_BILL_STATE_CODE = 6;

    Integer code
    String description

    static constraints = {
    }
}
