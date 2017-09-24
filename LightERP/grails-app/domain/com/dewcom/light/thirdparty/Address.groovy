package com.dewcom.light.thirdparty

import com.dewcom.light.utils.Constants

class Address {

    Integer idDistrict //Con el id del distrito obtenemos el cantón y la provincia
    String address
    Customer customer
    Byte enabled = Constants.ESTADO_ACTIVO

    static belongsTo = [Customer]

    static constraints = {
        idDistrict nullabe: true
        address blank: false
    }
}
