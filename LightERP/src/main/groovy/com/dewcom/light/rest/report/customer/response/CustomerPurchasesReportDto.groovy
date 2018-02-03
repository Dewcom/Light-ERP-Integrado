package com.dewcom.light.rest.report.customer.response

/**
 * Created by lchen on 10/17/17.
 */
class CustomerPurchasesReportDto {
    def customerId
    def productCode
    def productName
    def quantity
    String buyDate
    def buyPrice
    def totalTaxAmount
    def billNumber
    def customerFullName
    def billState
    def exchange
    def currency
    def cost
    def utilityAmount
    def utilityPercentage


    def nullSafeSetCustomerFullName(CustomerPurchasesReport pDomain){
        def name = pDomain.customerName != null ? pDomain.customerName : ""
        def firstLastName = pDomain.customerFirstLastName != null ? pDomain.customerFirstLastName : ""
        def secondLastName =  pDomain.customerSecondLastName != null ? pDomain.customerSecondLastName : ""
        this.customerFullName = name + " " + firstLastName + " " + secondLastName
    }
}
