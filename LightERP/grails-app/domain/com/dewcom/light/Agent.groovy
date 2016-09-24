package com.dewcom.light

class Agent {
    String name
    AgentType agentType

    static hasMany = [suppliers: Supplier, customers: Customer]

    static constraints = {
        name blank: false
    }
}
