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
    double costInDollars
    double costInColones
    double suggestedCost
    String tariffHeading // partida arancelaria
    String commercialName
    double priceInDollars
    double priceInColones
    double salesTax = Constants.SALES_TAX
    double utilityPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

    static constraints = {
        productCode blank: false
        name blank: false
        bulkQuantity null: true
        costInDollars null: true
        costInColones null: true
        suggestedCost null: true
        tariffHeading blank: false
        commercialName null: true, blank: true
        priceInDollars null: true
        priceInColones null: true
        utilityPercentage null: true
    }
}
