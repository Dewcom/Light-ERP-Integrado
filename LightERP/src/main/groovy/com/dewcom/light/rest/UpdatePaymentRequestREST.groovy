package com.dewcom.light.rest

import com.dewcom.light.Address
import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class UpdatePaymentRequestREST implements Validateable {
    Double amount
    String bank
    String bankReceipt
    Long id
    String observation


    static constraints = {
        bank blank: true, nullable: true
        amount  nullable: false
        bankReceipt blank: true, nullable: true
        id  nullable: false
        observation  nullable: false
    }
}
