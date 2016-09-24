package com.dewcom.light.rest

import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 10/09/16.
 */
class UpdateAgentTypeREST implements Validateable{
    int id
    String positionName

    static constraints = {
        positionName blank: false
    }
}
