package com.dewcom.light.rest.fe.request.invoice

/**
 * Created by lchen on 10/2/18.
 */
class InvoiceDetailCodeRest {
    String type
    InvoiceDetailCodeRest code
    String ammount
    String measurementUnit
    String commertialMeasurementUnit
    String detail
    String unitPrice
    String totalAmount
    String discount
    String discountOrigin // naturaleza descuento
    String subtotal
    String lineTotalAmount
}
