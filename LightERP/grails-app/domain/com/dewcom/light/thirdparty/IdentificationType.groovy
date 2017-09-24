package com.dewcom.light.thirdparty

import com.dewcom.light.utils.Constants

class IdentificationType {
    final static int COMPANY_CODE = 2
    final static int PHYSICAL_CODE = 1
    final static int PASSPORT_CODE = 3
    String name
    Byte enabled = Constants.ESTADO_ACTIVO;
    Date registrationDate = new Date()
    int code;

    static constraints = {
        name blank: false
    }
}
