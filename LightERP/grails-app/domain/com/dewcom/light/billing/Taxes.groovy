package com.dewcom.light.billing

import com.dewcom.light.utils.Constants

/**
 * Created by chen on 16/01/17.
 */
class Taxes {
    String description
    Double percentage
    Byte enabled = Constants.ESTADO_ACTIVO
    static constraints = {
    }
    }
