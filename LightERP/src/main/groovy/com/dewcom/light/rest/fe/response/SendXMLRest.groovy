package com.dewcom.light.rest.fe.response

import com.dewcom.light.rest.fe.request.invoice.InvoiceReceiverRest
import com.dewcom.light.rest.fe.request.invoice.InvoiceSenderRest

/**
 * Created by lchen on 10/2/18.
 */
class SendXMLRest { // Esta respuesta es igual a la de MakeXML
    String code
    String status
    String data
    String date
    InvoiceSenderRest sender
    InvoiceReceiverRest receiver
}
