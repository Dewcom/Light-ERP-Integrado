package com.dewcom.light.warehouse

import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.warehouse.ProductLotRequest
import com.dewcom.light.rest.warehouse.UpdateProductLotRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.LightUtils
import grails.transaction.Transactional

@Transactional
class ProductLotService {

    def messageSource

    ProductLot getproductLot(def productLotId) {
        log.info "====== Getting productLot from DB ======"
        log.info productLotId
        try {
            ProductLot productLotFromDB = ProductLot.findByIdAndEnabled(productLotId, Constants.ESTADO_ACTIVO)
            return productLotFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.productLot.error", null, Locale.default))
        }
    }


    def getAllProductLots() {
        log.info "====== Getting all productLots from DB ======"
        try {
            def productLotsFromDB = ProductLot.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return productLotsFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.productLots.error", null, Locale.default))
        }
    }

    def createProductLot(ProductLotRequest productLotRequest) {
        try {
            def productLot = ProductLot.fromRestProductLot(productLotRequest)
            productLot.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.productLot.error", null, Locale.default));
        }
    }

    def deleteProductLot(ProductLot productLot) {
        try {
            productLot.enabled = Constants.ESTADO_INACTIVO
            productLot.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.productLot.error", null, Locale.default))
        }
    }

    def updateProductLot(UpdateProductLotRequest updateProductLotReq) {
        try {
            ProductLot tmpProductLotToUpdate = ProductLot.findByIdAndEnabled(updateProductLotReq.id, Constants.ESTADO_ACTIVO)
            if (tmpProductLotToUpdate) {

                String lotNumber
                Date expirationDate
                Date lotDate
                String productOrigin
                Double quantity
                Product product
                Storehouse storehouse
                Byte enabled = Constants.ESTADO_ACTIVO
                Date registrationDate = new Date()

                tmpProductLotToUpdate.lotNumber = updateProductLotReq.lotNumber
                tmpProductLotToUpdate.expirationDate = LightUtils.stringToDate(updateProductLotReq.expirationDate,"dd-MM-yyyy")
                tmpProductLotToUpdate.lotDate = LightUtils.stringToDate(updateProductLotReq.lotDate,"dd-MM-yyyy")
                tmpProductLotToUpdate.productOrigin = updateProductLotReq.productOrigin
                tmpProductLotToUpdate.quantity = updateProductLotReq.quantity
                tmpProductLotToUpdate.product = Product.findByIdAndEnabled(updateProductLotReq.productId, Constants.ESTADO_ACTIVO)
                tmpProductLotToUpdate.storehouse = Storehouse.findByIdAndEnabled(updateProductLotReq.storehouseId, Constants.ESTADO_ACTIVO)

                tmpProductLotToUpdate.save(flush: true, failOnError:true)
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.productLot.notFound.error", null, Locale.default))
            }
        }

        catch (Exception e) {
            log.error(e)
            if (e instanceof LightRuntimeException) {
                throw e
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.productLot.error", null, Locale.default))
            }
        }
    }
}
