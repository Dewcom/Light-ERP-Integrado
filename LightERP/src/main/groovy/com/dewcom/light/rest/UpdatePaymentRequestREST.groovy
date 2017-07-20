package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdatePaymentRequestREST implements Validateable {
    Double amount
    String paymentType
    String bankAccount
    String bankReceipt
    Long id
    String observation
    String paymentDate

    static constraints = {
        bankAccount blank: true, nullable: true
        amount  nullable: false
        bankReceipt blank: true, nullable: true
        id  nullable: false
        observation  nullable: true
        paymentDate blank: false, nullable: false
        paymentType blank: true, nullable: true
    }
}
