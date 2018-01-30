package com.dewcom.light.warehouse

import com.dewcom.light.configuration.ActionBinnacleLog
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
        def productLot = new ProductLot()
        try {
            def tmpProductLot = ProductLot.findByLotNumber(productLotRequest.lotNumber);

            if(tmpProductLot == null){
                productLot = ProductLot.fromRestProductLot(productLotRequest)

            }else{
                def tmpStorehouse = Storehouse.findById(productLotRequest.storehouseId);

                if(!tmpProductLot.storehouses.contains(tmpStorehouse)) {
                    productLot = ProductLot.fromRestProductLot(productLotRequest)
                }else{
                    throw new LightRuntimeException(messageSource.getMessage("create.productLot.id.nonUnique", null, Locale.default));
                }
            }

            def binnacleLog = new ActionBinnacleLog()
            binnacleLog.action = messageSource.getMessage("binnacle.action.create", null, Locale.default)
            binnacleLog.domain = productLot.toString()
            binnacleLog.modificationDate = new Date()
            binnacleLog.modifiedItem = productLotRequest.lotNumber
            binnacleLog.username = productLotRequest.username

            binnacleLog.save(flush: true, failOnError:true)
            productLot.save(flush: true, failOnError:true)

        } catch (Exception e) {
            log.error(e);
            if(e.getClass() == LightRuntimeException.class  ){
                throw new LightRuntimeException(e.getMessage());
            }else{
                throw new LightRuntimeException(messageSource.getMessage("create.productLot.error", null, Locale.default));
            }
        }
    }

    def deleteProductLot(ProductLot productLot, String username, String deleteReason) {
        try {
            def binnacleLog = new ActionBinnacleLog()
            binnacleLog.action = messageSource.getMessage("binnacle.action.delete", null, Locale.default) + ' ' +    deleteReason
            binnacleLog.domain = productLot.toString()
            binnacleLog.modificationDate = new Date()
            binnacleLog.modifiedItem = productLot.lotNumber
            binnacleLog.username = username

            binnacleLog.save(flush: true, failOnError:true)

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

                tmpProductLotToUpdate.lotNumber = updateProductLotReq.lotNumber
                tmpProductLotToUpdate.expirationDate = LightUtils.stringToDate(updateProductLotReq.expirationDate,"dd-MM-yyyy")
                tmpProductLotToUpdate.lotDate = LightUtils.stringToDate(updateProductLotReq.lotDate,"dd-MM-yyyy")
                tmpProductLotToUpdate.quantity = updateProductLotReq.quantity

                def binnacleLog = new ActionBinnacleLog()
                binnacleLog.action = messageSource.getMessage("binnacle.action.modify", null, Locale.default) + ' ' + updateProductLotReq.reason
                binnacleLog.domain = tmpProductLotToUpdate.toString()
                binnacleLog.modificationDate = new Date()
                binnacleLog.modifiedItem = updateProductLotReq.lotNumber
                binnacleLog.username = updateProductLotReq.username

                binnacleLog.save(flush: true, failOnError:true)

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
