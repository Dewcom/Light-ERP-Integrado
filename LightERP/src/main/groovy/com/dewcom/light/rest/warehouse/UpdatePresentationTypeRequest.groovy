package com.dewcom.light.rest.warehouse

import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/12/16.
 */
class UpdatePresentationTypeRequest implements Validateable {

    int id
    String name

    static constraints = {
        name blank: false
    }
}
