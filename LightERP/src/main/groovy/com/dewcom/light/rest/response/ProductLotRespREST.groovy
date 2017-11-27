package com.dewcom.light.rest.response

import com.dewcom.light.utils.Constants

/**
 * Created by Mauricio Fernández Mora on 04/11/17.
 */
class ProductLotRespREST {
    Long id
    String lotNumber
    Date expirationDate
    Date lotDate
    String productOrigin
    Double quantity
    ProductRespREST product
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
}
