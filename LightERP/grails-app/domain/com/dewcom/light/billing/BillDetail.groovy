package com.dewcom.light.billing

import com.dewcom.light.utils.Constants
import com.dewcom.light.warehouse.Product

/**
 * Created by chen on 16/01/17.
 */
class BillDetail {
    Bill bill
    Product product
    Integer quantity
    Double linePrice
    Double discountPercentage
    Double totalDiscount
    Double totalTaxAmount
    Double taxPercentage
    Double subTotal
    Double total
    Byte enabled = Constants.ESTADO_ACTIVO


    static belongsTo = [Bill]
    static constraints = {
    }
}
