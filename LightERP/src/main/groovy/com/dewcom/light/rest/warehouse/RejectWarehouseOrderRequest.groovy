package com.dewcom.light.rest.warehouse

import grails.validation.Validateable

class RejectWarehouseOrderRequest implements Validateable {
    Integer warehouseOrderId
    String username
    String reason

    static constraints = {
    }
}
