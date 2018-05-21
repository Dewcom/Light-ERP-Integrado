package com.dewcom.light.warehouse

import com.dewcom.light.utils.Constants

class MeasureUnit {
    public static final Integer KILOGRAMS = 1
    public static final Integer GRAMS = 2
    public static final Integer LITERS = 3
    public static final Integer MINILITERS = 4
    public static final Integer OUNCES = 5
    public static final Integer UNITS = 6

    Integer code
    String name
    String symbol = ""
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        name blank: false
        symbol blank: true, nullable: true
    }
}
