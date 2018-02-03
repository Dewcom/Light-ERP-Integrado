package com.dewcom.light.configuration

class ActionBinnacleLog {
    Integer itemId
    String username
    String action
    String modifiedItemCode
    String domain
    String details
    Date actionDate

    static mapping = {
        details sqlType: 'text'
    }

    static constraints = {
        itemId  nullable: true
    }
}
