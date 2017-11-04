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
    double cost
    double suggestedCost
    String tariffHeading // partida arancelaria
    String commercialName
    double price
    double productTax
    double utilityPercentage
    Byte enabled
    Date registrationDate
    MeasureUnitRespREST measureUnit
}
