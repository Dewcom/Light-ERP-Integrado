package com.dewcom.light

class BillStateChangeLog {
    String userName
    Date modificationDate = new Date()
    Bill modifiedBill
    BillStateType newState

    static constraints = {
    }
}
