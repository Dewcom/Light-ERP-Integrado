package com.dewcom.light.rest.report.warehouse.request

import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 28/01/18.
 */
class ProductLotHistoryRequest  implements Validateable {
    String startDate
    String endDate
    String lotNumber

    static constraints = {
        startDate blank: false, nullable: false
        endDate blank: false, nullable: false
        lotNumber blank: false, nullable: false
    }
}
