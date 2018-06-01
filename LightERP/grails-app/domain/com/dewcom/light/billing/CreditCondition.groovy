package com.dewcom.light.billing

import com.dewcom.light.utils.Constants

/**
 * Created by chen on 15/01/17.
 */
class CreditCondition {
    //codigos de tipos de condiciones de credito
    public static final Integer CREDITO_QUINCE_DIAS = 2
    public static final Integer CREDITO_TREINTA_DIAS = 1
    public static final Integer CREDITO_OCHO_DIAS= 3
    public static final Integer CREDITO_SESENTA_DIAS = 4

    //each client can have a default CreditCondition
    String description
    Integer days
    Integer code
    Byte enabled = Constants.ESTADO_ACTIVO

    static constraints = {
    }
}
