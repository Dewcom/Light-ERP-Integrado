package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class PaymentREST implements Validateable {

    String paymentDate
    Double amount
    String paymentType
    String bankAccount
    String bankReceipt
    Long billId
    String observation

    static constraints = {
        bankAccount blank: true, nullable: true
        amount nullable: false
        bankReceipt blank: true, nullable: true
        billId  nullable: false
        observation  nullable: true, blank: true
        paymentDate blank: false, nullable: false
        paymentType blank: true, nullable: true
    }
}
