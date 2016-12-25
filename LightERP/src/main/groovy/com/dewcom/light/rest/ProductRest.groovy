package com.dewcom.light.rest

import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/12/16.
 */
class ProductRest implements Validateable{

    String productCode
    String name
    int presentationType
    double bulkQuantity
    int productType
    double costInDollars
    double costInColones
    double suggestedCost
    String tariffHeading // partida arancelaria
    String commercialName
    double priceInDollars
    double priceInColones
    double salesTax
    double utilityPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        productCode blank: false
        name blank: false
        presentationType blank: false
        bulkQuantity null: true, blank: true
        productType blank: false
        costInDollars null: true, blank: true
        costInColones null: true, blank: true
        suggestedCost null: true, blank: true
        tariffHeading blank: false
        commercialName null: true, blank: true
        priceInDollars null: true, blank: true
        priceInColones null: true, blank: true
        utilityPercentage null: true, blank: true
    }
}
