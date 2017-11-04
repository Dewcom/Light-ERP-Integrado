package com.dewcom.light.warehouse

import com.dewcom.light.rest.warehouse.ProductLotRequest
import com.dewcom.light.rest.warehouse.StorehouseRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.LightUtils

class ProductLot {
    String lotNumber
    Date expirationDate
    Date lotDate
    String productOrigin
    Double quantity
    Product product
    Storehouse storehouse
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static hasMany = [storehouses: Storehouse]

    static belongsTo = [Storehouse]

    static constraints = {
        lotNumber blank: false, nullable: false
        expirationDate blank: false, nullable: false
        lotDate blank: false, nullable: false
        quantity nullable: false
        product nullable: false
        storehouse nullable: false
    }

    def static fromRestProductLot(ProductLotRequest productLotRequest){

        ProductLot productLot = new ProductLot()

        productLot.lotNumber = productLotRequest.lotNumber
        productLot.expirationDate = LightUtils.stringToDate(productLotRequest.expirationDate,"dd-MM-yyyy")
        productLot.lotDate = LightUtils.stringToDate(productLotRequest.lotDate,"dd-MM-yyyy")
        productLot.productOrigin = productLotRequest.productOrigin
        productLot.quantity = productLotRequest.quantity
        productLot.product = Product.findByIdAndEnabled(productLotRequest.productId, Constants.ESTADO_ACTIVO)
        productLot.storehouse = Storehouse.findByIdAndEnabled(productLotRequest.storehouseId, Constants.ESTADO_ACTIVO)

        return productLot
    }
}
