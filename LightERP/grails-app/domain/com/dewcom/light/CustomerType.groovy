package com.dewcom.light

class CustomerType {
    String name
    Byte enabled = Constants.ESTADO_ACTIVO
    Date regitrationDate = new Date()

    static constraints = {
        name blank: false
    }
}
