package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 09/09/16.
 */
class UpdateIdentificationTypeREST implements Validateable {
    int id
    String name

    static constraints = {
        name blank: false
    }
}
