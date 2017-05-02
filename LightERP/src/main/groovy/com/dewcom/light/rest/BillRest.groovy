package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by chen on 01/02/17.
 */
class BillRest implements Validateable {
    String userName
    Long customerId
    Long billAddress
    Double exchangeRate
    Long billPaymentTypeId
    Long creditConditionId
    Long currencyId
    String billDate
    List<BillDetailRest> billDetails;
    Integer registrationType;

    static constraints = {
        userName blank:true, nullable: true
        customerId nullable: true
        billAddress nullable: true
        billPaymentTypeId  nullable: true
        creditConditionId  nullable: true
        currencyId nullable: true
        billDate blank:true, nullable: true
        registrationType nullable: true
        exchangeRate nullable: true
        billDetails nullable: true
    }
}
