package com.dewcom.light.rest.response

/**
 * Created by lchen on 5/23/17.
 */
class PaymentRespREST {
    Long id
    Date paymentDate
    byte enabled
    Double amount
    String bank
    String bankReceipt
    Long billId
    String observation
}
