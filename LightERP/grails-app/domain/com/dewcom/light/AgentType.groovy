package com.dewcom.light

class AgentType {
    String positionName
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        positionName blank: false
    }
}
