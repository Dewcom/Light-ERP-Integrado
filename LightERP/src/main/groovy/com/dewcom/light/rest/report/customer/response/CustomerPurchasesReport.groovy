package com.dewcom.light.rest.report.customer.response

/**
 * Created by lchen on 9/10/17.
 */
class CustomerPurchasesReport {
    def customerName
    def customerId
    def productCode
    def productName
    def quantity
    def buyDate
    def buyPrice
    def totalAmount
    def billNumber
    def customerFirstLastName
    def customerSecondLastName
    def customerFullName
    def billState


    def nullSafeSetCustomerFullName(){
        def name = this.customerName != null ? this.customerName : ""
        def firstLastName = this.customerFirstLastName != null ? this.customerFirstLastName : ""
        def secondLastName =  this.customerSecondLastName != null ? this.customerSecondLastName : ""
        this.customerFullName = name + " " + firstLastName + " " + secondLastName
    }
}
