package com.dewcom.light

class AgentType {
    String positionName
    Byte enabled = Constants.ESTADO_ACTIVO
    Date regitrationDate = new Date()

    static constraints = {
        positionName blank: false
    }
}
