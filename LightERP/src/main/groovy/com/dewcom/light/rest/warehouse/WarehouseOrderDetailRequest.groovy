package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants

/**
 * Created by Mauricio Fernández Mora on 17/02/18.
 * Este POJO sirve tanto para create como para update
 */
class WarehouseOrderDetailRequest {
    Integer productLotId
    Integer quantity
    Byte enabled = Constants.ESTADO_ACTIVO

    static constraints = {
    }
}
