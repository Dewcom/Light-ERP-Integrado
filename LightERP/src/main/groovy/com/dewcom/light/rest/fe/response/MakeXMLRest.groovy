package com.dewcom.light.rest.fe.response

import com.dewcom.light.rest.fe.request.invoice.InvoiceReceiverRest
import com.dewcom.light.rest.fe.request.invoice.InvoiceSenderRest

/**
 * Created by lchen on 10/2/18.
 */
class MakeXMLRest {
    String code
    String status
    String data
    String date
    InvoiceSenderRest sender
    InvoiceReceiverRest receiver
}
