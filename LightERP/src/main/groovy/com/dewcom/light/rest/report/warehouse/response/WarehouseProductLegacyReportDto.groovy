package com.dewcom.light.rest.report.warehouse.response

import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReport

/**
 * Created by lchen on 10/17/17.
 */
class WarehouseProductLegacyReportDto {
    def productCode
    def productName
    def colonesCost
    def dollarsCost
    def symbol
    def totalColonesCost //colonesCost * stock
    def totalDollarsCost //dollarsCost * stock
    def exchangeRate
    def stock
    def price
}
