package com.dewcom.light.warehouse

import com.dewcom.light.billing.Bill
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.warehouse.WarehouseOrderDetailRequest
import com.dewcom.light.rest.warehouse.WarehouseOrderRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.LightUtils
import grails.transaction.Transactional

@Transactional
class WarehouseOrderService {

    def messageSource

    WarehouseOrder getWarehouseOrder(def warehouseOrderId) {
        log.info "====== Getting a warehouseOrder from DB ======"
        log.info warehouseOrderId
        try {
            WarehouseOrder warehouseOrderFromDB = WarehouseOrder.findByIdAndEnabled(productId, Constants.ESTADO_ACTIVO)
            return warehouseOrderFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.warehouse.order.error", null, Locale.default))
        }
    }


    def getAllWarehouseOrders() {
        log.info "====== Getting all warehouse orders from DB ======"
        try {
            def warehouseOrdersFromDB = WarehouseOrder.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return warehouseOrdersFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.warehouse.orders.error", null, Locale.default))
        }
    }
    def createWarehouseOrder(WarehouseOrder warehouseOrder) {
        try {
            warehouseOrder.save(flush: true, failOnError: true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.warehouse.order.error", null, Locale.default))
        }
    }

    def deleteWarehouseOrder(WarehouseOrder warehouseOrderId) {
        try {
            warehouseOrderId.enabled = Constants.ESTADO_INACTIVO
            warehouseOrderId.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.warehouse.order.error", null, Locale.default))
        }
    }

    def updateWarehouseOrder(WarehouseOrderRequest warehouseOrderRequest) {
        try {
            WarehouseOrder tmpWarehouseOrder = WarehouseOrder.findByIdAndEnabled(warehouseOrderRequest.warehouseOrderId, Constants.ESTADO_ACTIVO)

            if (tmpWarehouseOrder) {

                tmpWarehouseOrder.warehouseOrderNumber = warehouseOrderRequest.warehouseOrderNumber
                tmpWarehouseOrder.warehouseOrderDate = warehouseOrderRequest.warehouseOrderDate != null ?  LightUtils.stringToDate(warehouseOrderRequest.warehouseOrderDate,"dd-MM-yyyy") : tmpWarehouseOrder.warehouseOrderDate
                tmpWarehouseOrder.warehouseOrderStateType = warehouseOrderRequest.warehouseOrderStateType
                tmpWarehouseOrder.bill = Bill.findByIdAndEnabled(warehouseOrderRequest.warehouseOrderId, Constants.ESTADO_ACTIVO)


                if(warehouseOrderRequest.warehouseOrderDetails != null) {
                    //Se desactivan las detalles de que fueron eliminados en el FE

                    if (warehouseOrderRequest.warehouseOrderDetails.size() == 0) {
                        //si la listwarehouseOrderRequesta viene vacia, se eliminan todas los detalles
                        tmpWarehouseOrder.warehouseOrderDetails.each{
                            it.enabled = Constants.ESTADO_INACTIVO;
                        }
                    }else{
                        tmpWarehouseOrder.warehouseOrderDetails.each { tmpPersistedDetail ->

                            tmpPersistedDetail.enabled = Constants.ESTADO_INACTIVO;
                            warehouseOrderRequest.warehouseOrderDetails.each { restOrderDetail ->
                                if (tmpPersistedDetail.id == restOrderDetail.id) {
                                    tmpPersistedDetail.enabled = Constants.ESTADO_ACTIVO;

                                    def tmpProduct = Product.findByIdAndEnabled(restOrderDetail.productId, Constants.ESTADO_ACTIVO)

                                    tmpPersistedDetail.product = tmpProduct
                                    tmpPersistedDetail.quantity = restOrderDetail.quantity
                                }
                            }
                        }
                        //Se agregan los detalles de orden nuevos
                        def tmpNewOrderDetailsToAdd = new ArrayList<WarehouseOrderDetailRequest>()

                        warehouseOrderRequest.warehouseOrderDetails.each {
                            if (it.id == null) {
                                def tmpOrderDetail = new WarehouseOrderDetail()
                                tmpOrderDetail.product = Product.findByIdAndEnabled(it.productId, Constants.ESTADO_ACTIVO)
                                tmpOrderDetail.quantity = it.quantity
                                tmpWarehouseOrder.addToWarehouseOrderDetails(tmpOrderDetail)
                            }
                        }
                    }
                }

                //luego de taggear los detalles de factura existentes a eliminar, se eliminan de la lista para reflejar dicha
                //eliminacion en BD
                tmpWarehouseOrder.warehouseOrderDetails.removeAll { it.enabled == Constants.ESTADO_INACTIVO}

                tmpWarehouseOrder.save(flush: true, failOnError:true)
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.product.notFound.error", null, Locale.default))
            }
        }

        catch (Exception e) {
            log.error(e)
            if (e instanceof LightRuntimeException) {
                throw e
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.product.error", null, Locale.default))
            }
        }
    }
}
