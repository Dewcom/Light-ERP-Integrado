package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by chen on 01/02/17.
 */
class BillREST implements Validateable {
    String userName
    Long customerId
    Long billAddress
    Double exchangeRate
    Long billPaymentTypeId
    Long creditConditionId
    Long currencyId
    String billDate
    List<BillDetailRest> billDetails;
    Integer billState;

    static constraints = {
        userName blank:true, nullable: true
        customerId nullable: true
        billAddress nullable: true
        billPaymentTypeId  nullable: true
        creditConditionId  nullable: true
        currencyId nullable: true
        billDate blank:true, nullable: true
        billState nullable: false
        exchangeRate nullable: true
        billDetails nullable: true
    }
}
