package com.dewcom.light.rest.thirdparty

import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 09/09/16.
 */
class UpdateIdentificationTypeRequest implements Validateable {
    int id
    String name

    static constraints = {
        name blank: false
    }
}
