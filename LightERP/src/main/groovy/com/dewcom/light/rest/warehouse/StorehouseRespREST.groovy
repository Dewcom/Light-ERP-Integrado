package com.dewcom.light.rest.warehouse

/**
 * Created by Mauricio Fernández Mora on 25/10/17.
 */
class StorehouseRespREST {
    Long id
    String name
    String address
    Byte enabled
    Date registrationDate
    List<ProductLotRespREST> productLots
}
