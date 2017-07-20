package com.dewcom.light.rest.response

/**
 * Created by lchen on 5/22/17.
 */
class BillDetailRespREST {
    Long id
    Long billId
    BillDetailProductRespREST product
    Integer quantity
    Double linePrice
    Double discountPercentage
    Double totalDiscount
    Double totalTaxAmount
    Double taxPercentage
    Double subTotal
    Double total
    Byte enabled

}
