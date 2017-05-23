package com.dewcom.light.rest

import com.dewcom.light.Address
import com.dewcom.light.Constants
import com.dewcom.light.Contact
import grails.validation.Validateable

/**
 * Created by Leo chen on 11/09/16.
 */
class PaymentREST implements Validateable {

    Double amount
    String bank
    String bankReceipt
    Long billId
    String observation


    static constraints = {
        bank blank: true, nullable: true
        amount nullable: false
        bankReceipt blank: true, nullable: true
        billId  nullable: false
        observation  nullable: true, blank: true
    }
}
