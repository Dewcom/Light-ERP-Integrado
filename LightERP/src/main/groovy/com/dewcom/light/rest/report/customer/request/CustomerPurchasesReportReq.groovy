package com.dewcom.light.rest.report.customer.request

/**
 * Created by lchen on 9/4/17.
 */

import grails.validation.Validateable

class CustomerPurchasesReportReq implements Validateable {
    String startDate
    String endDate
    String customerIdentification
    String productCode

    static constraints = {
        startDate blank: false, nullable: false
        endDate blank: false, nullable: false
        customerIdentification  blank: true, nullable: true
        productCode blank: true, nullable: true
    }
}
