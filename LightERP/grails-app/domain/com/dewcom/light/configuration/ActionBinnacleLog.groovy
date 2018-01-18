package com.dewcom.light.configuration

class ActionBinnacleLog {
    String username
    String action
    String modifiedItem
    String domain
    Date modificationDate

    static mapping = {
        domain sqlType: 'text'
    }

    static constraints = {
    }
}
