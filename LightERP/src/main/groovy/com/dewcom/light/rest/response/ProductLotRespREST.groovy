package com.dewcom.light.rest.response

import com.dewcom.light.utils.Constants
import com.dewcom.light.warehouse.ProductType

/**
 * Created by Mauricio Fernández Mora on 04/11/17.
 */
class ProductLotRespREST {
    Long id
    String lotNumber
    Date expirationDate
    Date lotDate
    ProductTypeRespREST productOrigin
    Double quantity
    ProductRespREST product
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
}
