package com.dewcom.light

class PresentationType {
    String name
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        name blank: false
    }
}
