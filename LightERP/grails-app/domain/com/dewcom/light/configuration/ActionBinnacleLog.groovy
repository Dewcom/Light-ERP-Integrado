package com.dewcom.light.configuration

class ActionBinnacleLog {
    Integer itemId
    String username
    Integer movementType
    String modifiedItemCode
    String domain
    String details
    Date actionDate
    double quantity

    static mapping = {
        details sqlType: 'text'
    }

    static constraints = {
        itemId  nullable: true
    }
}
