package com.dewcom.light.rest

import com.dewcom.light.Constants
import com.dewcom.light.PresentationType
import com.dewcom.light.ProductType
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/12/16.
 */
class ProductRest implements Validateable{

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
    double salesTax = Constants.SALES_TAX
    double utilityPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
    Integer measureUnit

    static constraints = {
        bulkQuantity nullable: true
        suggestedCost nullable: true
        tariffHeading blank: true
        commercialName null: true, blank: true
        utilityPercentage nullable: true
        productCode blank: false, nullable: false
        name blank: false, nullable: false
        presentationType nullable: false
        productType null: false
        price null: false
    }
}
