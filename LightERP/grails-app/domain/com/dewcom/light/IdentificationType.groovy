package com.dewcom.light

class IdentificationType {
    final static int COMPANY_CODE = 2
    final static int PHYSICAL_CODE = 1
    String name
    Byte enabled = Constants.ESTADO_ACTIVO;
    Date registrationDate = new Date()
    int code;

    static constraints = {
        name blank: false
    }
}
