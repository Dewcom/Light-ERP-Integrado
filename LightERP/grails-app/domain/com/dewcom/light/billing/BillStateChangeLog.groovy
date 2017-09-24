package com.dewcom.light.billing

class BillStateChangeLog {
    String userName
    Date modificationDate = new Date()
    Bill modifiedBill
    BillStateType newState

    static constraints = {
    }
}
