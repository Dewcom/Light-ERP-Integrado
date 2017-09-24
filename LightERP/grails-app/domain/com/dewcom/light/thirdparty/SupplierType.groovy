package com.dewcom.light.thirdparty

import com.dewcom.light.utils.Constants

class SupplierType {
    String name
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        name blank: false
    }
}
