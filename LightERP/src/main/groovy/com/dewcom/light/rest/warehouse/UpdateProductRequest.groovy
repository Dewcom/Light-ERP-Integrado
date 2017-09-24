package com.dewcom.light.rest.warehouse

import com.dewcom.light.utils.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/12/16.
 */
class UpdateProductRequest implements Validateable {
    Integer id
    String productCode
    String name
    Integer presentationType
    double bulkQuantity
    Integer productType
    double cost
    double suggestedCost
    String tariffHeading // partida arancelaria
    String commercialName
    double price
    double productTax
    double utilityPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
    Integer measureUnit

    static constraints = {
        productCode blank: false, nullable: false
        name blank: false, nullable: false
        productType nullable: false
        presentationType nullable: false
        measureUnit nullable: false
        tariffHeading nullable: true, blank: true
        commercialName nullable: true, blank: true
    }
}
