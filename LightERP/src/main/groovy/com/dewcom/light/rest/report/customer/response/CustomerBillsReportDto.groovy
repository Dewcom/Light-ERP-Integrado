package com.dewcom.light.rest.report.customer.response

/**
 * Created by lchen on 10/17/17.
 */
class CustomerBillsReportDto {
    def customerFullName
    def customerId
    def totalDiscount
    def totalTaxes
    def subTotal
    String buyDate
    def totalAmount
    def billNumber
    def billStateDesc
    def balance
    def paymentsPerformed
    def paymentMaxDate
    def expirationDays
    def creditCondition
    def currency
    def exchange


    def nullSafeSetCustomerFullName(CustomerBillsReport pDomain){
        def name = pDomain.customerName != null ? pDomain.customerName : ""
        def firstLastName = pDomain.customerFirstLastName != null ? pDomain.customerFirstLastName : ""
        def secondLastName =  pDomain.customerSecondLastName != null ? pDomain.customerSecondLastName : ""
        this.customerFullName = name + " " + firstLastName + " " + secondLastName
    }
}
