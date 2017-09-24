package com.dewcom.light.billing

/**
 * Created by chen on 15/01/17.
 */
class BillPaymentType {
    //codigos de tipos de pago
    public static final Integer PAGO_CONTADO = 1;
    public static final Integer PAGO_CREDITO = 2;

    Integer code
    String description

    static constraints = {
    }
}
