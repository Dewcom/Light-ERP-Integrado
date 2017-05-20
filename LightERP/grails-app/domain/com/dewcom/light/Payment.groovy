package com.dewcom.light

import com.dewcom.light.rest.PaymentREST

/**
 * Created by chen on 03/05/17.
 */
class Payment {
    Date paymentDate = new Date()
    byte enabled = Constants.ESTADO_ACTIVO
    Double amount
    String bank
    String bankReceipt
    Bill bill
    String observation

    static constraints = {
        amount nullable: false
        bill nullable: false
        bank blank: true, nullable: true
        bankReceipt blank: true, nullable: true
        observation  nullable: true, blank: true
    }

}
