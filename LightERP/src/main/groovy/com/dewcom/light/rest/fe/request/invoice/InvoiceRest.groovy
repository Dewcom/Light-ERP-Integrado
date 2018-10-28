package com.dewcom.light.rest.fe.request.invoice

/**
 * Created by lchen on 10/2/18.
 */
class InvoiceRest {
    String apiKey
    InvoiceKey key
    InvoiceHeader header
    InvoiceSenderRest sender
    InvoiceReceiverRest receiver
    InvoiceDetailRest detail
    InvoiceSummaryRest summary
    OtherInvoiceDetailsRest other
    InvoiceReferenceRest reference
}
