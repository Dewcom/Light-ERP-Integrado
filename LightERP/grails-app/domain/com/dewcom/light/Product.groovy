package com.dewcom.light


import com.dewcom.light.rest.ProductRest

class Product {
    String productCode
    String name
    PresentationType presentationType
    double bulkQuantity
    ProductType productType
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
        tariffHeading blank: false
        commercialName null: true, blank: true
    }

    def static fromRestProduct(ProductRest pRestProduct){

        Product tmpProduct = new Product();

        tmpProduct.productCode = pRestProduct.productCode;
        tmpProduct.name = pRestProduct.name;
        tmpProduct.bulkQuantity = pRestProduct.bulkQuantity;
        tmpProduct.costInDollars = pRestProduct.costInDollars;
        tmpProduct.costInColones = pRestProduct.costInColones;
        tmpProduct.suggestedCost = pRestProduct.suggestedCost;
        tmpProduct.tariffHeading = pRestProduct.tariffHeading;
        tmpProduct.commercialName = pRestProduct.commercialName;
        tmpProduct.priceInDollars = pRestProduct.priceInDollars;
        tmpProduct.priceInColones = pRestProduct.priceInColones;
        tmpProduct.utilityPercentage = pRestProduct.utilityPercentage;

        tmpProduct.presentationType = PresentationType.findByIdAndEnabled(pRestProduct.presentationType, Constants.ESTADO_ACTIVO);
        tmpProduct.productType =  ProductType.findByIdAndEnabled(pRestProduct.productType, Constants.ESTADO_ACTIVO);

        return tmpProduct;
    }
}
