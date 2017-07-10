package com.dewcom.light


import com.dewcom.light.rest.ProductRest

class Product {
    String productCode
    String name
    PresentationType presentationType
    double bulkQuantity
    ProductType productType
    double cost
    double suggestedCost
    String tariffHeading // partida arancelaria
    String commercialName
    double price
    double productTax
    double utilityPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()
    MeasureUnit measureUnit

    static constraints = {
        tariffHeading blank: true
        commercialName null: true, blank: true
        productCode blank: false, nullable: false
        name blank: false, nullable: false
        presentationType nullable: false
        productType nullable: false
        price nullable: false
    }

    def static fromRestProduct(ProductRest pRestProduct){

        Product tmpProduct = new Product()

        tmpProduct.productCode = pRestProduct.productCode
        tmpProduct.name = pRestProduct.name
        tmpProduct.bulkQuantity = pRestProduct.bulkQuantity
        tmpProduct.suggestedCost = pRestProduct.suggestedCost
        tmpProduct.tariffHeading = pRestProduct.tariffHeading
        tmpProduct.commercialName = pRestProduct.commercialName
        tmpProduct.price = pRestProduct.price
        tmpProduct.cost = pRestProduct.cost
        tmpProduct.utilityPercentage = pRestProduct.utilityPercentage
        tmpProduct.productTax = pRestProduct.productTax
        tmpProduct.measureUnit = MeasureUnit.findByIdAndEnabled(pRestProduct.measureUnit, Constants.ESTADO_ACTIVO)

        tmpProduct.presentationType = PresentationType.findByIdAndEnabled(pRestProduct.presentationType, Constants.ESTADO_ACTIVO)
        tmpProduct.productType =  ProductType.findByIdAndEnabled(pRestProduct.productType, Constants.ESTADO_ACTIVO)

        return tmpProduct
    }
}
