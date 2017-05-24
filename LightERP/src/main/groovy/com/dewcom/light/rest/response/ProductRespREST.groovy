package com.dewcom.light.rest.response

/**
 * Created by lchen on 5/22/17.
 */
class ProductRespREST {
    Long id
    String productCode
    String name
    PresentationTypeRespREST presentationType
    double bulkQuantity
    ProductTypeRespREST productType
    double costInDollars
    double costInColones
    double suggestedCost
    String tariffHeading // partida arancelaria
    String commercialName
    double priceInDollars
    double priceInColones
    double salesTax
    double utilityPercentage
    Byte enabled
    Date registrationDate
}
