package com.dewcom.light.rest

/**
 * Created by chen on 04/04/17.
 */
class UpdateBillRequestREST {
    Long billId
    String billDate
    Long customerId
    Long billStateId
    Double exchangeRate
    Long billPaymentTypeId
    Long currencyId
    Long creditConditionId
    Long addressId
    List<BillDetailRest> billDetails
}
