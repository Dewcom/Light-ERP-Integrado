package com.dewcom.light

class SupplierType {
    String name
    Byte enabled = Constants.ESTADO_ACTIVO
    Date regitrationDate = new Date()

    static constraints = {
        name blank: false
    }
}
