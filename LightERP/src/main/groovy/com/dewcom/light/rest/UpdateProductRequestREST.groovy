package com.dewcom.light.rest

import com.dewcom.light.Constants
import com.dewcom.light.MeasureUnit
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/12/16.
 */
class UpdateProductRequestREST implements Validateable {
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
        bulkQuantity nullable: true
        cost nullable: true
        productType nullable: false
        tariffHeading blank: true
        commercialName nullable: true, blank: true
        price nullable: false
        utilityPercentage nullable: true, blank: true
        presentationType nullable: false
        productType nullable: false
        productTax nullable: true
    }
}
