package com.dewcom.light

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

    static belongsTo = [Bill]
    static constraints = {
    }
}
