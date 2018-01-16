package com.dewcom.light.warehouse

import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.warehouse.ProductLotRequest
import com.dewcom.light.rest.warehouse.UpdateProductLotRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.LightUtils
import grails.transaction.Transactional
import org.apache.catalina.Store

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

            def tmpProductLot = ProductLot.findByLotNumber(productLotRequest.lotNumber);

            if(tmpProductLot == null){
                def productLot = ProductLot.fromRestProductLot(productLotRequest)

            }else{
                def tmpStorehouse = Storehouse.findById(productLotRequest.storehouseId);

                if(!tmpProductLot.storehouses.contains(tmpStorehouse)) {
                    def productLot = ProductLot.fromRestProductLot(productLotRequest)
                    productLot.save(flush: true, failOnError:true)
                }else{
                    throw new LightRuntimeException(messageSource.getMessage("create.productLot.id.nonUnique", null, Locale.default));
                }
            }

        } catch (Exception e) {
            log.error(e);
            if(e.getClass() == LightRuntimeException.class  ){
                throw new LightRuntimeException(e.getMessage());
            }else{
                throw new LightRuntimeException(messageSource.getMessage("create.productLot.error", null, Locale.default));
            }
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

                tmpProductLotToUpdate.lotNumber = updateProductLotReq.lotNumber
                tmpProductLotToUpdate.expirationDate = LightUtils.stringToDate(updateProductLotReq.expirationDate,"dd-MM-yyyy")
                tmpProductLotToUpdate.lotDate = LightUtils.stringToDate(updateProductLotReq.lotDate,"dd-MM-yyyy")
                tmpProductLotToUpdate.quantity = updateProductLotReq.quantity

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
