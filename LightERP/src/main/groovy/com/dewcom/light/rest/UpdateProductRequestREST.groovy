package com.dewcom.light.rest

import com.dewcom.light.Constants
import grails.validation.Validateable

/**
 * Created by Mauricio Fernández Mora on 25/12/16.
 */
class UpdateProductRequestREST implements Validateable {
    Integer id
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
        bulkQuantity null: true
        productType blank: false
        costInDollars null: true
        costInColones null: true
        suggestedCost null: true
        tariffHeading blank: false
        commercialName null: true, blank: true
        priceInDollars null: true
        priceInColones null: true
        utilityPercentage null: true, blank: true
    }
}
