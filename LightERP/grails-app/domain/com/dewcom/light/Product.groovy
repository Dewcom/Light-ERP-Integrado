package com.dewcom.light

import com.dewcom.light.rest.CustomerREST
import com.dewcom.light.rest.ProductRest

class Product {

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

    def static fromRestProduct(ProductRest pRestProduct){

        Product tmpProduct = new Product();

        tmpProduct.productCode = pRestProduct.productCode;
        tmpProduct.name = pRestProduct.name;
        tmpProduct.presentationType = pRestProduct.presentationType;
        tmpProduct.bulkQuantity = pRestProduct.bulkQuantity;
        tmpProduct.productType = pRestProduct.productType;
        tmpProduct.costInDollars = pRestProduct.costInDollars;
        tmpProduct.costInColones = pRestProduct.costInColones;
        tmpProduct.suggestedCost = pRestProduct.suggestedCost;
        tmpProduct.tariffHeading = pRestProduct.tariffHeading;
        tmpProduct.commercialName = pRestProduct.commercialName;
        tmpProduct.priceInDollars = pRestProduct.priceInDollars;
        tmpProduct.priceInColones = pRestProduct.priceInColones;
        tmpProduct.utilityPercentage = pRestProduct.utilityPercentage;

        return tmpProduct;
    }
}
