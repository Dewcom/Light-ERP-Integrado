package com.dewcom.light.warehouse

import com.dewcom.light.utils.Constants

class PresentationType {
    public static final Integer UNITS = 1
    public static final Integer SACK_50KG = 2
    public static final Integer BAG_5KG = 3
    public static final Integer BAG_10KG = 4
    public static final Integer BAG_25KG = 5
    Integer code
    String name
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        name blank: false
        code nullable: true
    }
}
