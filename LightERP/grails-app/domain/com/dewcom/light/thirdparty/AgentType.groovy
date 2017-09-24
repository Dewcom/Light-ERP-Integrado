package com.dewcom.light.thirdparty

import com.dewcom.light.utils.Constants

class AgentType {
    String positionName
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        positionName blank: false
    }
}
