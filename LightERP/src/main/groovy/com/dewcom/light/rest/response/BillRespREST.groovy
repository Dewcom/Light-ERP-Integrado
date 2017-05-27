package com.dewcom.light.rest.response

/**
 * Created by lchen on 5/22/17.
 */
class BillRespREST {
    Long id
    AddressRespREST address
    Byte enabled
    Long billNumber
    Date creationDate
    Date billDate
    Date dueDate
    CustomerRespREST customer
    BillStateTypeRespREST billState
    Double subTotalAmount
    Double totalAmount
    Double totalDiscount
    Double exchangeRate
    BillPaymentTypeRespREST billPaymentType
    CurrencyRespREST currency
    CreditConditionRespREST creditCondition
    Double totalTaxAmount
    List<BillDetailRespREST> billDetails
    List<PaymentRespREST> payments
}
