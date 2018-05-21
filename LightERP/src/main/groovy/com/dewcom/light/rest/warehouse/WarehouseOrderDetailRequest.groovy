package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants

/**
 * Created by Mauricio Fernández Mora on 17/02/18.
 */
class WarehouseOrderDetailRequest {
    List<WarehouseOrderProductLotRequest> productLots
    Byte enabled = Constants.ESTADO_ACTIVO

    static constraints = {
        productId nullable: false
    }
}
