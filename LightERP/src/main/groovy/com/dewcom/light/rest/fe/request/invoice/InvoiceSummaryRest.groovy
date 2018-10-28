package com.dewcom.light.rest.fe.request.invoice

/**
 * Created by lchen on 10/2/18.
 */
class InvoiceSummaryRest {
    String currency
    String exchangeRate
    String totalTaxedService // totalserviciogravado
    String totalExemptService // totalservicioexento,
    String totalTaxedMerchandise // totalmercaderiagravado
    String totalExemptMerchandise // totalmercaderiaexento
    String totalTaxed
    String totalExempt
    String totalSale
    String totalDiscount
    String totalNetSale
    String totalTaxes
    String totalReceipt
}
