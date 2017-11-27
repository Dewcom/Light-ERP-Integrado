package com.dewcom.light.rest.report.customer.request

/**
 * Created by lchen on 9/4/17.
 */

import grails.validation.Validateable

class CustomerBillsReportReq implements Validateable {
    String startDate
    String endDate
    String customerIdentification
    boolean isPaymentPendingReport

    static constraints = {
        startDate blank: true, nullable: true
        endDate blank: true, nullable: true
        customerIdentification  blank: true, nullable: true
    }
}
