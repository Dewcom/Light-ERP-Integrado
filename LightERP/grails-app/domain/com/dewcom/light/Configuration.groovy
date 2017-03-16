package com.dewcom.light

import grails.validation.Validateable

/**
 * Created by chen on 28/02/17.
 */
class Configuration implements Validateable {
    Integer code
    String  description
    String  value
    boolean  enabled = Constants.ESTADO_ACTIVO
    static constraints = {
    }
}
