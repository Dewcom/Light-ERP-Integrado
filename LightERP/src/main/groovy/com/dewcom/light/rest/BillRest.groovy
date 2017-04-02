package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by chen on 01/02/17.
 */
class BillRest implements Validateable {
    String userName
    Long customerId
    Double exchangeRate
    Long billPaymentTypeId
    Long creditConditionId
    Long currencyId
    String creationDate = new Date()
    List<BillDetailRest> billDetails;
    Integer registrationType;

    static constraints = {
        userName blank:true, nullable: true
        customerId nullable: true
        billPaymentTypeId  nullable: true
        creditConditionId  nullable: true
        currencyId nullable: true
        creationDate blank:true, nullable: true
        registrationType nullable: true
        exchangeRate nullable: true
        billDetails nullable: true
    }
}
