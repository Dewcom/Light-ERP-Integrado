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
    String creationDate
    List<BillDetailRest>billDetails;
    Integer registrationType;
}
