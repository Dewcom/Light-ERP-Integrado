package com.dewcom.light

import com.dewcom.light.rest.UpdateProductRequestREST
import grails.transaction.Transactional

@Transactional
class ProductService {

    def messageSource

    Product getProduct(def productId) {
        log.info "====== Getting product from DB ======"
        log.info productId
        try {
            Product productFromDB = Product.findByIdAndEnabled(productId, Constants.ESTADO_ACTIVO);
            return productFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.product.error", null, Locale.default));
        }
    }


    def getAllProducts() {
        log.info "====== Getting all products from DB ======"
        try {
            def productsFromDB = Product.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return productsFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.products.error", null, Locale.default));
        }
    }

    def createProduct(Product pproduct) {
        try {
            pproduct.save(flush: true, failOnError: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.product.error", null, Locale.default));
        }
    }

    def deleteProduct(Product pproduct) {
        try {
            pproduct.enabled = Constants.ESTADO_INACTIVO;
            pproduct.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.product.error", null, Locale.default));
        }
    }

    def updateProduct(UpdateProductRequestREST pRestProduct) {
        try {
            Product tmpProductToUpdate = Product.findByIdAndEnabled(pRestProduct.id, Constants.ESTADO_ACTIVO)
            if (tmpProductToUpdate) {

                tmpProductToUpdate.productCode = pRestProduct.productCode;
                tmpProductToUpdate.name = pRestProduct.name;
                tmpProductToUpdate.presentationType = pRestProduct.presentationType;
                tmpProductToUpdate.bulkQuantity = pRestProduct.bulkQuantity;
                tmpProductToUpdate.productType = pRestProduct.productType;
                tmpProductToUpdate.costInDollars = pRestProduct.costInDollars;
                tmpProductToUpdate.costInColones = pRestProduct.costInColones;
                tmpProductToUpdate.suggestedCost = pRestProduct.suggestedCost;
                tmpProductToUpdate.tariffHeading = pRestProduct.tariffHeading;
                tmpProductToUpdate.commercialName = pRestProduct.commercialName;
                tmpProductToUpdate.priceInDollars = pRestProduct.priceInDollars;
                tmpProductToUpdate.priceInColones = pRestProduct.priceInColones;
                tmpProductToUpdate.utilityPercentage = pRestProduct.utilityPercentage;

                tmpProductToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.product.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if (e instanceof LightRuntimeException) {
                throw e;
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.product.error", null, Locale.default));
            }
        }
    }
}
