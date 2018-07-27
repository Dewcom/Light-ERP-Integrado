package com.dewcom.light.rest.report.warehouse.request

import grails.validation.Validateable

class WarehouseMovementsReportRequest  implements Validateable {
    String startDate
    String endDate
    String lotNumber
    String productCode
    String movementType

    static constraints = {
    }
}
