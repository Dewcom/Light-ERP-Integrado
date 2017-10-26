package com.dewcom.light.warehouse

import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.warehouse.StorehouseRequest
import com.dewcom.light.rest.warehouse.UpdateStorehouseRequest
import com.dewcom.light.utils.Constants
import grails.transaction.Transactional

@Transactional
class StorehouseService {

    def messageSource

    Storehouse getStorehouse(def storehouseId) {
        log.info "====== Getting storehouse from DB ======"
        log.info storehouseId
        try {
            Storehouse storehouseFromDB = Storehouse.findByIdAndEnabled(storehouseId, Constants.ESTADO_ACTIVO)
            return storehouseFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.storehouse.error", null, Locale.default))
        }
    }


    def getAllStorehouses() {
        log.info "====== Getting all storehouses from DB ======"
        try {
            def storehousesFromDB = Storehouse.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return storehousesFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.storehouses.error", null, Locale.default))
        }
    }

    def createStorehouse(StorehouseRequest storehouseRequest) {
        try {
            def storehouse = Storehouse.fromRestStorehouse(storehouseRequest)
            storehouse.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.storehouse.error", null, Locale.default));
        }
    }

    def deleteStorehouse(Storehouse storehouse) {
        try {
            storehouse.enabled = Constants.ESTADO_INACTIVO
            storehouse.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.storehouse.error", null, Locale.default))
        }
    }

    def updateStorehouse(UpdateStorehouseRequest updateStorehouse) {
        try {
            Storehouse tmpStorehouseToUpdate = Storehouse.findByIdAndEnabled(updateStorehouse.id, Constants.ESTADO_ACTIVO)
            if (tmpStorehouseToUpdate) {

                tmpStorehouseToUpdate.address = updateStorehouse.address
                tmpStorehouseToUpdate.name = updateStorehouse.name

                tmpStorehouseToUpdate.save(flush: true, failOnError:true)
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.storehouse.notFound.error", null, Locale.default))
            }
        }

        catch (Exception e) {
            log.error(e)
            if (e instanceof LightRuntimeException) {
                throw e
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.storehouse.error", null, Locale.default))
            }
        }
    }
}
