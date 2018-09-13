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
        def savedProductLot
        def productLot
        try {
            def tmpProductLot = ProductLot.findByLotNumber(productLotRequest.lotNumber);

            if(tmpProductLot == null){
                productLot = ProductLot.fromRestProductLot(productLotRequest)

            }else{
                def tmpStorehouse = Storehouse.findById(productLotRequest.storehouseId)

                if(!tmpProductLot.storehouses.contains(tmpStorehouse)) {
                    productLot = ProductLot.fromRestProductLot(productLotRequest)
                }else{
                    throw new LightRuntimeException(messageSource.getMessage("create.productLot.id.nonUnique", null, Locale.default));
                }
            }
            savedProductLot = productLot.save(flush: true, failOnError:true)

            def binnacleLog = new ActionBinnacleLog()
            binnacleLog.itemId = savedProductLot.id
            binnacleLog.movementType = WarehouseOrderMovementType.WAREHOUSE_ORDER_MOVEMENT_NEW_LOT
            binnacleLog.details = messageSource.getMessage("binnacle.action.create", null, Locale.default)
            binnacleLog.domain = productLot.getClass().getSimpleName() as String
            binnacleLog.actionDate = new Date()
            binnacleLog.modifiedItemCode = productLotRequest.lotNumber
            binnacleLog.username = productLotRequest.username
            binnacleLog.quantity = productLotRequest.quantity

            binnacleLog.save(flush: true, failOnError:true)

        } catch (Exception e) {
            log.error(e)
            if(e.getClass() == LightRuntimeException.class  ){
                throw new LightRuntimeException(e.getMessage())
            }else{
                throw new LightRuntimeException(messageSource.getMessage("create.productLot.error", null, Locale.default));
            }
        }

        return savedProductLot
    }

    def deleteProductLot(ProductLot productLot, String username, String deleteReason) {
        try {
            def binnacleLog = new ActionBinnacleLog()
            binnacleLog.itemId = productLot.id
            binnacleLog.movementType = WarehouseOrderMovementType.WAREHOUSE_ORDER_MOVEMENT_DELETE
            binnacleLog.details = deleteReason
            binnacleLog.domain = productLot.getClass().getSimpleName() as String
            binnacleLog.actionDate = new Date()
            binnacleLog.modifiedItemCode = productLot.lotNumber
            binnacleLog.username = username
            binnacleLog.quantity = productLot.quantity

            binnacleLog.save(flush: true, failOnError:true)

            productLot.enabled = Constants.ESTADO_INACTIVO
            productLot.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.productLot.error", null, Locale.default))
        }
    }

    def updateProductLot(UpdateProductLotRequest updateProductLotReq, def detailQuantity) {
        try {

            def filtered = ['storehouses', 'product', 'constraintsMap', 'class', 'constraints', 'errors', 'reason', 'productId', 'id', 'username', 'registrationDate']

            ProductLot tmpProductLotToUpdate = ProductLot.findById(updateProductLotReq.id)

            if (tmpProductLotToUpdate) {

                def filtererOriginalProductLot = tmpProductLotToUpdate.properties
                        .sort{it.key}
                        .collect{it}
                        .findAll{!filtered.contains(it.key)}
                        .join(' - ')

                tmpProductLotToUpdate.lotNumber = updateProductLotReq.lotNumber
                tmpProductLotToUpdate.expirationDate = LightUtils.stringToDate(updateProductLotReq.expirationDate, 'dd-MM-yyyy')
                tmpProductLotToUpdate.expirationDate = LightUtils.stringToDate(updateProductLotReq.lotDate, 'dd-MM-yyyy')
                tmpProductLotToUpdate.quantity = updateProductLotReq.quantity
                tmpProductLotToUpdate.enabled = Constants.ESTADO_ACTIVO

                tmpProductLotToUpdate.save(flush: true, failOnError:true)

                updateProductLotReq.lotDate = LightUtils.stringToDate(updateProductLotReq.lotDate, 'dd-MM-yyyy')
                updateProductLotReq.expirationDate = LightUtils.stringToDate(updateProductLotReq.expirationDate, 'dd-MM-yyyy')

                def filtererUpdateRequest =  updateProductLotReq.properties
                        .sort{it.key}
                        .collect{it}
                        .findAll{!filtered.contains(it.key)}
                        .join(' - ')

                def binnacleLog = new ActionBinnacleLog()
                binnacleLog.itemId = tmpProductLotToUpdate.id
                binnacleLog.movementType = WarehouseOrderMovementType.WAREHOUSE_ORDER_MOVEMENT_UPDATE
                binnacleLog.details = 'RAZON: ' + updateProductLotReq.reason + ', ORIGINAL: ' + filtererOriginalProductLot + ', MODIFICADO: ' + filtererUpdateRequest
                binnacleLog.domain = tmpProductLotToUpdate.getClass().getSimpleName() as String
                binnacleLog.actionDate = new Date()
                binnacleLog.modifiedItemCode = updateProductLotReq.lotNumber
                binnacleLog.username = updateProductLotReq.username
                binnacleLog.quantity = detailQuantity

                binnacleLog.save(flush: true, failOnError:true)

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

    def updateProductLotQuantity(ProductLot productLot) {
        try {

            if(productLot.quantity == 0){
                productLot.enabled = Constants.ESTADO_INACTIVO
            }else{
                productLot.enabled = Constants.ESTADO_ACTIVO
            }

            productLot.save(flush: true, failOnError:true)

        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.productLot.error", null, Locale.default))
        }
    }

    def createProductLotActionLog(def updatedItem, def username){

        try {

            ProductLot productLot = ProductLot.findById(updatedItem.productLot.id)

            def binnacleLog = new ActionBinnacleLog()
            binnacleLog.itemId = updatedItem.id
            binnacleLog.movementType = WarehouseOrderMovementType.WAREHOUSE_ORDER_MOVEMENT_SALE
            binnacleLog.details = messageSource.getMessage("binnacle.action.sale", null, Locale.default)
            binnacleLog.domain = updatedItem.getClass().getSimpleName() as String
            binnacleLog.actionDate = new Date()
            binnacleLog.modifiedItemCode = productLot.lotNumber
            binnacleLog.username = username
            binnacleLog.quantity = updatedItem.quantity

            binnacleLog.save(flush: true, failOnError:true)

        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("binnacle.action.error", null, Locale.default))
        }
    }
}
