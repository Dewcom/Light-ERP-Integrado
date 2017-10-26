package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/10/17.
 */
class UpdateStorehouseRequest implements Validateable{
    Integer id
    String name
    String address

    static constraints = {
        id nullable: false
        name blank: false, nullable: false
        name blank: false, nullable: false
    }
}
