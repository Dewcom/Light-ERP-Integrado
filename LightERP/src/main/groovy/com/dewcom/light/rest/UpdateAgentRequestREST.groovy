package com.dewcom.light.rest

import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 28/01/17.
 */
class UpdateAgentRequestREST implements Validateable {

    Integer id
    String agentCode
    String name
    String firstLastName
    String secondLastName
    String email
    String mobile
    String phoneNumber
    String extension
    Double commissionPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
    Integer agentType

    static constraints = {
        agentCode blank: false, nullable: false, maxSize: 5
        name blank: false
        firstLastName blank: true, nullable: true
        secondLastName blank: true, nullable: true
        phoneNumber blank: false
        extension blank: true, nullable: true
        mobile nullable: true, blank: true
        email nullable: true, blank: true
        commissionPercentage nullable: true
    }
}
