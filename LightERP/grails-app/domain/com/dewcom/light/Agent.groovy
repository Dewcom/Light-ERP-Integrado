package com.dewcom.light

import com.dewcom.light.rest.AgentREST

class Agent {

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
    AgentType agentType

    static hasMany = [suppliers: Supplier, customers: Customer]

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


    def static fromRestAgent(AgentREST prestCustomer){

        Agent tmpAgent = new Agent();

        tmpAgent.agentCode = prestCustomer.agentCode;
        tmpAgent.name = prestCustomer.name;
        tmpAgent.firstLastName = prestCustomer.firstLastName;
        tmpAgent.secondLastName = prestCustomer.secondLastName;
        tmpAgent.email = prestCustomer.email;
        tmpAgent.mobile = prestCustomer.mobile;
        tmpAgent.phoneNumber = prestCustomer.phoneNumber;
        tmpAgent.extension = prestCustomer.extension;
        tmpAgent.commissionPercentage = prestCustomer.commissionPercentage;

        tmpAgent.agentType =  AgentType.findByIdAndEnabled(prestCustomer.agentType, Constants.ESTADO_ACTIVO);

        return tmpAgent;
    }

}
