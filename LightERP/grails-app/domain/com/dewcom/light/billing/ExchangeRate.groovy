package com.dewcom.light.billing

/**
 * Created by chen on 23/01/17.
 */
class ExchangeRate {
    public static final Integer TIPO_CAMBIO_DOLARES = 1;
    public static final Integer TIPO_CAMBIO_COLONES = 2;
    Integer code
    String description
    Double value
    Currency currency

    static constraints = {
    }
}
