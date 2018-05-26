package com.dewcom.light.warehouse

import com.dewcom.light.billing.Bill
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.warehouse.ProductLotRequest
import com.dewcom.light.rest.warehouse.RejectWarehouseOrderRequest
import com.dewcom.light.rest.warehouse.UpdateProductLotRequest
import com.dewcom.light.rest.warehouse.UpdateWarehouseOrderRequest
import com.dewcom.light.rest.warehouse.WarehouseOrderDetailRequest
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.LightUtils
import grails.transaction.Transactional

@Transactional
class WarehouseOrderService {

    def messageSource
    def productLotService
    def billService

    WarehouseOrder getWarehouseOrder(def warehouseOrderId) {
        log.info "====== Getting a warehouseOrder from DB ======"
        log.info warehouseOrderId
        try {
            WarehouseOrder warehouseOrderFromDB = WarehouseOrder.findByIdAndEnabled(warehouseOrderId, Constants.ESTADO_ACTIVO)
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

    def createWarehouseOrder(WarehouseOrder warehouseOrder, String pusername) {

        def savedWarehouseOrder
        try {
            savedWarehouseOrder = warehouseOrder.save(flush: true, failOnError:true)

            // Si la orden de salida se crea correctamente se mandan a actualizar las cantidades en los lotes
            if(savedWarehouseOrder){
                savedWarehouseOrder.warehouseOrderDetails.each {
                    def tmpProductLot = it.productLot

                    UpdateProductLotRequest updateProductLotRequest = new UpdateProductLotRequest()
                    updateProductLotRequest.id = tmpProductLot.id as Integer
                    updateProductLotRequest.username = pusername
                    updateProductLotRequest.lotNumber = tmpProductLot.lotNumber
                    updateProductLotRequest.expirationDate = tmpProductLot.expirationDate
                    updateProductLotRequest.lotDate = tmpProductLot.lotDate
                    updateProductLotRequest.quantity = tmpProductLot.quantity - it.quantity
                    updateProductLotRequest.reason = savedWarehouseOrder.warehouseOrderMovementType.description
                    updateProductLotRequest.registrationDate = tmpProductLot.registrationDate

                    productLotService.updateProductLot(updateProductLotRequest)

                }
            }
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("create.warehouse.order.error", null, Locale.default))
        }
    }

    def createWarehouseOrderFromBill(WarehouseOrder warehouseOrder) {

        try {
            warehouseOrder.save(flush: true, failOnError:true)
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

    def updateWarehouseOrder(UpdateWarehouseOrderRequest updateWarehouseOrderRequest) {

        def savedOrder

        try{

            def originalOrder = WarehouseOrder.findByIdAndEnabled(updateWarehouseOrderRequest.warehouseOrderId, Constants.ESTADO_ACTIVO)

            //Se crea un mapa para luego ser usado en la actualizacion de los lotes de producto
            def productLotsToUpdate  = getProductLotListToUpdate(originalOrder.warehouseOrderDetails, updateWarehouseOrderRequest.warehouseOrderDetails)

            // Se desactivan cada uno de los detalles viejos para activar luego solo los nuevos
            originalOrder.warehouseOrderDetails.each {
                it.enabled = Constants.ESTADO_INACTIVO
            }

            updateWarehouseOrderRequest.warehouseOrderDetails.each { newDetail ->

                def found = false

                originalOrder.warehouseOrderDetails.each { oldDetail ->

                    if(newDetail.productLotId == oldDetail.productLotId){
                        found = true
                        oldDetail.enabled = Constants.ESTADO_ACTIVO
                        oldDetail.quantity = newDetail.quantity
                    }
                }
                if(!found){
                    def newWarehouseDetail = new WarehouseOrderDetail()
                    newWarehouseDetail.quantity = newDetail.quantity
                    newWarehouseDetail.productLot = ProductLot.findByIdAndEnabled(newDetail.productLotId, Constants.ESTADO_ACTIVO)
                    originalOrder.addToWarehouseOrderDetails(newWarehouseDetail)
                }
            }

            originalOrder.warehouseOrderStateType = WarehouseOrderStateType.findByCode(updateWarehouseOrderRequest.warehouseOrderStateType)
            originalOrder.warehouseOrderMovementType = WarehouseOrderMovementType.findByCode(updateWarehouseOrderRequest.warehouseOrderMovementType)



            savedOrder = originalOrder.save(flush: true, failOnError:true)

            // Si la orden se actualiza correctamente se mandan a actualizar cada uno de los lotes de producto
            if(savedOrder){
                productLotsToUpdate.each { k, v ->
                    def tmpProductLot = ProductLot.findById(k)
                    tmpProductLot.quantity += v

                    if(tmpProductLot.quantity < 0){
                        def negativeProductLot = new ProductLotRequest()
                        negativeProductLot.quantity = tmpProductLot.quantity
                        negativeProductLot.username = "admin" // TODO: se quema el usuario administrador, cambiar si eventualmente se crea un usuario 'system;
                        negativeProductLot.lotNumber = "loteTemporal " + new Date()
                        negativeProductLot.expirationDate = null
                        negativeProductLot.lotDate = LightUtils.dateToString(new Date(), "dd-MM-yyyy")
                        negativeProductLot.productId = tmpProductLot.product.id
                        negativeProductLot.storehouseId = 1 // TODO: Se quema el id de la bodega, cambiar cuando se implementen facturas por bodega

                        productLotService.createProductLot(negativeProductLot)

                        tmpProductLot.quantity = 0
                    }
                    productLotService.updateProductLotQuantity(tmpProductLot)
                }
            }


        }catch(Exception e){
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("update.warehouse.order.error", null, Locale.default))

        }
    }

    def approveWarehouseOrder(WarehouseOrder warehouseOrder) {

        def approvedWarehouseOrder
        try {

            WarehouseOrderStateType warehouseOrderStateType = WarehouseOrderStateType.findByCode(Constants.WAREHOUSE_ORDER_VALIDATED)
            warehouseOrder.warehouseOrderStateType = warehouseOrderStateType

            approvedWarehouseOrder = warehouseOrder.save(flush: true, failOnError:true)

            if(approvedWarehouseOrder){

                Bill tmpBill = Bill.findByIdAndEnabled(approvedWarehouseOrder.bill.id, Constants.ESTADO_ACTIVO)
                billService.changeBillStateFromAppovedWarehouseOrder(tmpBill)
            }

        }catch (Exception e) {
            log.error(e)
            if (e instanceof LightRuntimeException) {
                throw e
            } else {
                throw new LightRuntimeException(messageSource.getMessage("approve.warehouse.order.error", null, Locale.default))
            }
        }
    }


    def rejectWarehouseOrder(RejectWarehouseOrderRequest rejectWarehouseOrderRequest) {

        def savedRejectedaWarehouseOrder

        try {

            WarehouseOrder rejectedWarehouseOrder = WarehouseOrder.findByIdAndEnabled(rejectWarehouseOrderRequest.warehouseOrderId, Constants.ESTADO_ACTIVO)

            rejectedWarehouseOrder.enabled = Constants.ESTADO_INACTIVO

            savedRejectedaWarehouseOrder = rejectedWarehouseOrder.save(flush: true, failOnError:true)

            if(savedRejectedaWarehouseOrder){
                handleProductLotQuantityRestitution(rejectedWarehouseOrder.warehouseOrderDetails, rejectWarehouseOrderRequest)
                billService.deleteBill(savedRejectedaWarehouseOrder.bill)
            }

        }catch (Exception e) {
            log.error(e)
            if (e instanceof LightRuntimeException) {
                throw e
            } else {
                throw new LightRuntimeException(messageSource.getMessage("reject.warehouse.order.error", null, Locale.default))
            }
        }
    }

    def getWarehouseOrderFromBill(def billRequest, def newBill){

        def tmpWarehouseOrder = new WarehouseOrder()

        tmpWarehouseOrder.bill = Bill.findById(newBill.id)
        tmpWarehouseOrder.warehouseOrderStateType = WarehouseOrderStateType.findByCode(Constants.WAREHOUSE_ORDER_CREATED)
        tmpWarehouseOrder.warehouseOrderMovementType = WarehouseOrderMovementType.findByCode(Constants.WAREHOUSE_ORDER_MOVEMENT_SALE)

        billRequest.billDetails.each { billDetailRest ->
            def tmpProductLots

            //se setean los detalles de orden de bodega
            def tmpProduct = Product.findByIdAndEnabled(billDetailRest.productId, Constants.ESTADO_ACTIVO)

            if(tmpProduct){
                tmpProductLots = ProductLot.findAllByProductAndEnabled(tmpProduct, Constants.ESTADO_ACTIVO, [sort: "lotDate", order : "asc"])
            }

            if(tmpProductLots.size() > 0){

                def continueCreatingDetails = true
                def index = 0
                def tmpQuantity = billDetailRest.quantity

                while(continueCreatingDetails) {
                    def warehouseOrderDetail = new WarehouseOrderDetail()

                    if(tmpProductLots[index].quantity >= tmpQuantity ){
                        warehouseOrderDetail.productLot = tmpProductLots[index]
                        warehouseOrderDetail.quantity = tmpQuantity

                        tmpProductLots[index].quantity = tmpProductLots[index].quantity - tmpQuantity

                        productLotService.updateProductLotQuantity(tmpProductLots[index])

                        tmpWarehouseOrder.addToWarehouseOrderDetails(warehouseOrderDetail)

                        tmpQuantity = 0
                        continueCreatingDetails = false
                    }else{


                        if(tmpProductLots[index].quantity < 0){
                            warehouseOrderDetail.productLot = tmpProductLots[index]
                            warehouseOrderDetail.quantity = tmpQuantity

                            tmpProductLots[index].quantity = tmpProductLots[index].quantity - tmpQuantity

                            productLotService.updateProductLotQuantity(tmpProductLots[index])
                            tmpQuantity = 0
                        }else{
                            tmpQuantity -= tmpProductLots[index].quantity

                            warehouseOrderDetail.productLot = tmpProductLots[index]
                            warehouseOrderDetail.quantity = tmpProductLots[index].quantity

                            tmpProductLots[index].quantity = tmpProductLots[index].quantity - tmpProductLots[index].quantity

                            productLotService.updateProductLotQuantity(tmpProductLots[index])

                            tmpWarehouseOrder.addToWarehouseOrderDetails(warehouseOrderDetail)

                        }

                        if(tmpProductLots.size() > index){
                            index ++

                            if(tmpProductLots.size() == index){
                                continueCreatingDetails = false
                            }
                        }else{
                            continueCreatingDetails = false
                        }
                    }
                }

                if(tmpQuantity != 0){
                    def warehouseOrderDetail = new WarehouseOrderDetail()
                    def savedNegativeProductLot = handleNegativeProductLots(billDetailRest, tmpQuantity)
                    warehouseOrderDetail.productLot = savedNegativeProductLot
                    warehouseOrderDetail.quantity = tmpQuantity
                    tmpWarehouseOrder.addToWarehouseOrderDetails(warehouseOrderDetail)
                }

            }else{
                def warehouseOrderDetail = new WarehouseOrderDetail()
                def savedNegativeProductLot = handleNegativeProductLots(billDetailRest)
                warehouseOrderDetail.productLot = savedNegativeProductLot
                warehouseOrderDetail.quantity = billDetailRest.quantity
                tmpWarehouseOrder.addToWarehouseOrderDetails(warehouseOrderDetail)
            }
        }
            return tmpWarehouseOrder
    }

    def handleNegativeProductLots(def billDetailRequest){

        def negativeProductLot = new ProductLotRequest()
        negativeProductLot.quantity = -billDetailRequest.quantity
        negativeProductLot.username = "admin" // TODO: se quema el usuario administrador, cambiar si eventualmente se crea un usuario 'system;
        negativeProductLot.lotNumber = "loteTemporal " + new Date()
        negativeProductLot.expirationDate = null
        negativeProductLot.lotDate = LightUtils.dateToString(new Date(), "dd-MM-yyyy")
        negativeProductLot.productId = billDetailRequest.productId
        negativeProductLot.storehouseId = 1 // TODO: Se quema el id de la bodega, cambiar cuando se implementen facturas por bodega

        def savedNegativeProductLot = productLotService.createProductLot(negativeProductLot)

        return savedNegativeProductLot
    }

    def handleNegativeProductLots(def billDetailRequest, Double quantity){

        def negativeProductLot = new ProductLotRequest()
        negativeProductLot.quantity = -quantity
        negativeProductLot.username = "admin" // TODO: se quema el usuario administrador, cambiar si eventualmente se crea un usuario 'system;
        negativeProductLot.lotNumber = "loteTemporal " + new Date()
        negativeProductLot.expirationDate = null
        negativeProductLot.lotDate = LightUtils.dateToString(new Date(), "dd-MM-yyyy")
        negativeProductLot.productId = billDetailRequest.productId
        negativeProductLot.storehouseId = 1 // TODO: Se quema el id de la bodega, cambiar cuando se implementen facturas por bodega

        def savedNegativeProductLot = productLotService.createProductLot(negativeProductLot)

        return savedNegativeProductLot
    }

    def handleProductLotQuantityRestitution(def warehouseOrderDetails, def rejectWarehouseOrderRequest){

        warehouseOrderDetails.each {

            def tmpProductLot = ProductLot.findById(it.productLotId)

            UpdateProductLotRequest updateProductLotRequest = new UpdateProductLotRequest()
            updateProductLotRequest.id = tmpProductLot.id as Integer
            updateProductLotRequest.username = rejectWarehouseOrderRequest.username
            updateProductLotRequest.lotNumber = tmpProductLot.lotNumber
            updateProductLotRequest.expirationDate = tmpProductLot.expirationDate
            updateProductLotRequest.lotDate = tmpProductLot.lotDate
            updateProductLotRequest.quantity = tmpProductLot.quantity + it.quantity
            updateProductLotRequest.reason = rejectWarehouseOrderRequest.reason
            updateProductLotRequest.registrationDate = tmpProductLot.registrationDate
            updateProductLotRequest.enabled = Constants.ESTADO_ACTIVO

            productLotService.updateProductLot(updateProductLotRequest)
        }
    }

    //Se encarga de procesar la lista de detalles de orden originales contra los nuevos para determinar cada uno de los lotes
    // de producto que necesitan actualizarse
    def getProductLotListToUpdate(def oldList, def newList){
        def productLotMap = new HashMap<Integer, Integer>()

        try{

            newList.each { newDetail ->
                productLotMap.put(newDetail.productLotId, - newDetail.quantity)
            }



            oldList.each {oldDetail ->

                if(productLotMap.containsKey(oldDetail.productLotId as Integer)){

                    Integer tmpId = oldDetail.productLotId as Integer
                    productLotMap[tmpId] = oldDetail.quantity + productLotMap[tmpId]

                }else{
                    productLotMap.put(oldDetail.productLotId, oldDetail.quantity)
                }
            }

        }catch (Exception e){
            log.error "Ha ocurrido un error ajustando los lotes de producto " + e.message
            throw e
        }

        return productLotMap
    }

}
