package com.dewcom.light.rest.billing

/**
 * Created by chen on 01/02/17.
 */
class BillDetailRequest {
    Long id
    Long productId
    Integer quantity
    Double linePrice
    Double discountPercentage
    Double taxPercentage
}
