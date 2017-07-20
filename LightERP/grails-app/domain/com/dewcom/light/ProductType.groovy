package com.dewcom.light

class ProductType {
    public static final Integer NATIONAL = 1
    public static final Integer IMPORTED = 2
    public static final Integer MANUFACTURED = 3
    Integer code
    String name
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        name blank: false
    }
}
