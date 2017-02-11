package com.dewcom.light

class Bill {
    User user
    Byte enabled
    Long billNumber
    Date creationDate
    Date dueDate
    Customer customer
    BillStateType billState
    Double subTotalAmount
    Double totalAmount
    //el descuento se toma en cuenta antes del impuest, se suma el total, se aplica descuento y finalmente el impuesto
    // q viene a ser el subtotal.
    Double TotalDiscount
    Double exchangeRate
    BillPaymentType billPaymentType
    Currency currency
    Double totalTaxAmount
    static hasMany = [billDetails: BillDetail]
    static belongsTo = [Customer]
    static constraints = {
    }
}
