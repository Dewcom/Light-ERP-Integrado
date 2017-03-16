package com.dewcom.light

class Bill {
    User user
    Byte enabled = Constants.ESTADO_ACTIVO
    Long billNumber
    Date creationDate = new Date()
    //Date invoiceDate = new Date() se setea cuando la factura entra en estado de validacion.
    Date dueDate = new Date()
    Customer customer
    BillStateType billState
    Double subTotalAmount
    Double totalAmount
    //el descuento se toma en cuenta antes del impuest, se suma el total, se aplica descuento y finalmente el impuesto
    // q viene a ser el subtotal.
    Double totalDiscount
    Double exchangeRate
    BillPaymentType billPaymentType
    Currency currency
    CreditCondition creditCondition
    Double totalTaxAmount
    static hasMany = [billDetails: BillDetail]
    static belongsTo = [Customer]

    static constraints = {
        user  nullable: true
        billNumber nullable: true
        creationDate  nullable: true
        customer  nullable: true
        subTotalAmount  nullable: true
        totalAmount nullable: true
        totalDiscount nullable: true
        exchangeRatenullable: true
        billPaymentType nullable: true
        currency nullable: true
        creditCondition nullable: true
        totalTaxAmount nullable: true
        exchangeRate nullable: true
    }
}
