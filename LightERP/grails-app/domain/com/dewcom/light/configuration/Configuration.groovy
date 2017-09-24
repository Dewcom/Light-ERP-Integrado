package com.dewcom.light.configuration

import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by chen on 28/02/17.
 */
class Configuration implements Validateable {
    //codigo config parametro
    public static final Integer CONFIG_CONSECUTIVO_FACTURA = 0;
    Integer code
    String  description
    String  value
    boolean  enabled = Constants.ESTADO_ACTIVO
    static constraints = {
    }
}
