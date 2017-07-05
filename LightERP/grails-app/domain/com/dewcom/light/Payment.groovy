package com.dewcom.light
/**
 * Created by chen on 03/05/17.
 */
class Payment {
    Date paymentDate = new Date()
    byte enabled = Constants.ESTADO_ACTIVO
    Double amount
    String bankAccount
    String bankReceipt
    Bill bill
    String observation
    String paymentType

    static constraints = {
        amount nullable: false
        bill nullable: false
        bankAccount blank: true, nullable: true
        bankReceipt blank: true, nullable: true
        observation  nullable: true, blank: true
        paymentType nullable: true, blank: true
    }
}
