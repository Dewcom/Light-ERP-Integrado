package com.dewcom.light.warehouse

import com.dewcom.light.utils.Constants
import com.dewcom.light.rest.warehouse.ProductRequest

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
        productCode blank: false, nullable: false
        name blank: false, nullable: false
        productType nullable: false
        presentationType nullable: false
        measureUnit nullable: false
        tariffHeading nullable: true, blank: true
        commercialName nullable: true, blank: true
    }

    def static fromRestProduct(ProductRequest pRestProduct){

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
