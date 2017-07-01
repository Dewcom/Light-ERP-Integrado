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
            pproduct.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.product.error", null, Locale.default));
        }
    }

    def updateProduct(UpdateProductRequestREST prestProduct) {
        try {
            Product tmpProductToUpdate = Product.findByIdAndEnabled(prestProduct.id, Constants.ESTADO_ACTIVO)
            if (tmpProductToUpdate) {

                tmpProductToUpdate.productCode = prestProduct.productCode;
                tmpProductToUpdate.name = prestProduct.name;
                tmpProductToUpdate.bulkQuantity = prestProduct.bulkQuantity;
                tmpProductToUpdate.costInDollars = prestProduct.costInDollars;
                tmpProductToUpdate.costInColones = prestProduct.costInColones;
                tmpProductToUpdate.suggestedCost = prestProduct.suggestedCost;
                tmpProductToUpdate.tariffHeading = prestProduct.tariffHeading;
                tmpProductToUpdate.commercialName = prestProduct.commercialName;
                tmpProductToUpdate.priceInDollars = prestProduct.priceInDollars;
                tmpProductToUpdate.priceInColones = prestProduct.priceInColones;
                tmpProductToUpdate.utilityPercentage = prestProduct.utilityPercentage;

                tmpProductToUpdate.productType = ProductType.findByIdAndEnabled(prestProduct.productType, Constants.ESTADO_ACTIVO);
                tmpProductToUpdate.presentationType = PresentationType.findByIdAndEnabled(prestProduct.presentationType, Constants.ESTADO_ACTIVO);

                tmpProductToUpdate.save(flush: true, failOnError:true);
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

    Product getMeasureType(def measureTypeId) {
        log.info "====== Getting measure type from DB ======"
        log.info measureTypeId
        try {
            MeasureType measureTypeFromDB = MeasureType.findByIdAndEnabled(measureTypeId, Constants.ESTADO_ACTIVO);
            return measureTypeFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.measure.type.error", null, Locale.default));
        }
    }


    def getAllMeasureTypes() {
        log.info "====== Getting all measure types from DB ======"
        try {
            def measureTypesFromDB = MeasureType.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return measureTypesFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.measure.types.error", null, Locale.default));
        }
    }
}
