package com.dewcom.light.rest.thirdparty

import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 10/09/16.
 */
class UpdateAgentTypeRequest implements Validateable{
    int id
    String positionName

    static constraints = {
        positionName blank: false
    }
}
