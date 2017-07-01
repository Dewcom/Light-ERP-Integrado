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
    double salesTax = Constants.SALES_TAX
    double utilityPercentage
    Byte enabled = Constants.ESTADO_ACTIVO
    Date registrationDate = new Date()

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

    def static fromRestProduct(ProductRest pRestProduct){

        Product tmpProduct = new Product()

        tmpProduct.productCode = pRestProduct.productCode
        tmpProduct.name = pRestProduct.name
        tmpProduct.bulkQuantity = pRestProduct.bulkQuantity
        tmpProduct.suggestedCost = pRestProduct.suggestedCost
        tmpProduct.tariffHeading = pRestProduct.tariffHeading
        tmpProduct.commercialName = pRestProduct.commercialName
        tmpProduct.price = pRestProduct.price
        tmpProduct.utilityPercentage = pRestProduct.utilityPercentage

        tmpProduct.presentationType = PresentationType.findByIdAndEnabled(pRestProduct.presentationType, Constants.ESTADO_ACTIVO)
        tmpProduct.productType =  ProductType.findByIdAndEnabled(pRestProduct.productType, Constants.ESTADO_ACTIVO)

        return tmpProduct
    }
}
