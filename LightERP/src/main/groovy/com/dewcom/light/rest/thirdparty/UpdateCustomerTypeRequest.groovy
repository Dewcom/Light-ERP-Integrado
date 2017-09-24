package com.dewcom.light.rest.thirdparty

import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 11/09/16.
 */
class UpdateCustomerTypeRequest implements Validateable {
    int id
    String name

    static constraints = {
        name blank: false
    }
}
