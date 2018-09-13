package com.dewcom.light.billing

import com.dewcom.light.configuration.Configuration
import com.dewcom.light.utils.Constants
import com.dewcom.light.exception.LightException
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.utils.LightUtils
import com.dewcom.light.user.User
import com.dewcom.light.rest.billing.BillDetailRequest
import com.dewcom.light.rest.billing.BillRequest
import com.dewcom.light.rest.billing.UpdateBillRequest
import com.dewcom.light.thirdparty.Address
import com.dewcom.light.thirdparty.Customer
import com.dewcom.light.warehouse.Product
import grails.transaction.Transactional

@Transactional
class BillService {

    def messageSource
    def adminService
    def warehouseOrderService

    Bill getBill(def billId) {
        log.info "====== Getting bill from DB ======"
        log.info billId
        try {
            Bill billFromDB = Bill.findByIdAndEnabled(billId, Constants.ESTADO_ACTIVO)
            return billFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.bill.error", null, Locale.default))
        }
    }


    def getAllBills() {
        log.info "======Getting all bills from DB======"
        try {
            def billsFromDB = Bill.findAllByEnabled(Constants.ESTADO_ACTIVO)
            return billsFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.bills.error", null, Locale.default))
        }
    }


    def getAllBillsByCustomerId(def customerId) {
        log.info "====== Getting all biils from DB by customerId ======"
        def tmpCustomer = Customer.findById(customerId)
        try {
            def billsFromDB = Bill.findAllByEnabledAndCustomer(Constants.ESTADO_ACTIVO, tmpCustomer)
            return billsFromDB
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("get.all.bills.error", null, Locale.default))
        }
    }

    def createBill(BillRequest argRestBill) {
        def savedBill
        try {
            def configConsecFactura
            Bill tmpBill = new Bill()
            def billUser = User.findByUsername(argRestBill.userName)
            def customer = Customer.findById(argRestBill.customerId)
            def paymentType = BillPaymentType.findById(argRestBill.billPaymentTypeId)
            def creditCondition
            tmpBill.address = Address.get(argRestBill.billAddress)
            def billDate = LightUtils.stringToDate(argRestBill.billDate,"dd-MM-yyyy")
            tmpBill.dueDate = billDate

            if(argRestBill.billPaymentTypeId != null && paymentType.code == BillPaymentType.PAGO_CREDITO){
                if(argRestBill.creditConditionId != null ){
                    creditCondition = CreditCondition.findById(argRestBill.creditConditionId)
                    if(billDate != null){
                        tmpBill.dueDate = LightUtils.plusDaysToDate(billDate, creditCondition.days)
                    }
                }
            }
            def currency = Currency.findById(argRestBill.currencyId)

            def billStateType = BillStateType.findByCode(argRestBill.billState)

            tmpBill.user = billUser
            tmpBill.customer = customer
            tmpBill.billPaymentType = paymentType
            tmpBill.creditCondition = creditCondition
            tmpBill.billState = billStateType
            tmpBill.currency = currency
            tmpBill.exchangeRate = argRestBill.exchangeRate
            tmpBill.billDate = billDate

            if(argRestBill.billDetails != null && argRestBill.billDetails.size() > 0 ){
                processRestBillDetails(argRestBill.billDetails, tmpBill)
                //calculo de totales
                tmpBill.totalAmount = calculateBillAmount(tmpBill, Constants.FACTURA_TOTAL)
                tmpBill.subTotalAmount = calculateBillAmount(tmpBill, Constants.FACTURA_SUBTOTAL)
                tmpBill.totalTaxAmount = calculateBillAmount(tmpBill, Constants.FACTURA_TOTAL_IMPUESTOS)
                tmpBill.totalDiscount = calculateBillAmount(tmpBill, Constants.FACTURA_TOTAL_DESCUENTOS)
            }

            savedBill = tmpBill.save(flush: true, failOnError:true)

            // Si la factura se crea correctamente se manda a crear la orden de bodega
            if(savedBill && savedBill.billState.id == Constants.BILL_PRE_BILL_STATE_CODE){
                warehouseOrderService.createWarehouseOrderFromBill(warehouseOrderService.getWarehouseOrderFromBill(argRestBill, savedBill))
            }

        } catch (Exception e) {
            log.error(e)

            if(e instanceof LightRuntimeException){
                throw e
            }
            else{
                throw new LightRuntimeException(messageSource.getMessage("create.bill.error", null, Locale.default))
            }
        }
        return savedBill
    }

    def deleteBill(Bill bill) {
        try {
            bill.enabled = Constants.ESTADO_INACTIVO
            bill.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("delete.bill.error", null, Locale.default))
        }
    }

    // Si la llamada al metodo viene desde una actualizacion de orden de salida de bodega no se crea una orden de salida nueva
def updateBill(UpdateBillRequest argUpdateBillRequest, boolean isUpdateFromWarehouseOrder) {

        def updatedBill
        try {
            Bill tmpBillToUpdate = Bill.findByIdAndEnabled(argUpdateBillRequest.billId, Constants.ESTADO_ACTIVO)
            if (tmpBillToUpdate) {

                tmpBillToUpdate.currency = argUpdateBillRequest.currencyId != null ?  Currency.get(argUpdateBillRequest.currencyId) : tmpBillToUpdate.currency
                tmpBillToUpdate.exchangeRate = argUpdateBillRequest.exchangeRate != null ?  argUpdateBillRequest.exchangeRate : tmpBillToUpdate.exchangeRate
                tmpBillToUpdate.billDate = argUpdateBillRequest.billDate != null ?  LightUtils.stringToDate(argUpdateBillRequest.billDate,"dd-MM-yyyy") : tmpBillToUpdate.billDate
                tmpBillToUpdate.customer = argUpdateBillRequest.customerId != null ?  Customer.get(argUpdateBillRequest.customerId) : tmpBillToUpdate.customer
                tmpBillToUpdate.address = argUpdateBillRequest.addressId != null ?  Address.get(argUpdateBillRequest.addressId) : tmpBillToUpdate.address

                if(argUpdateBillRequest.billPaymentTypeId != null){
                    def tmpBillPaymentType = BillPaymentType.findByCode(argUpdateBillRequest.billPaymentTypeId)
                    tmpBillToUpdate.billPaymentType = tmpBillPaymentType
                    if(tmpBillPaymentType.code == BillPaymentType.PAGO_CONTADO){
                        tmpBillToUpdate.dueDate = tmpBillToUpdate.billDate
                        tmpBillToUpdate.creditCondition = null
                    }
                }

                if(argUpdateBillRequest.creditConditionId != null){
                    def tmpCreditCondition = CreditCondition.get(argUpdateBillRequest.creditConditionId)
                    tmpBillToUpdate.creditCondition = tmpCreditCondition
                    if(tmpBillToUpdate.billDate != null){
                        tmpBillToUpdate.dueDate = LightUtils.plusDaysToDate(tmpBillToUpdate.billDate, tmpCreditCondition.days)
                    }
                }

                if(argUpdateBillRequest.billStateId != null){
                    def tmpState = BillStateType.findByCode(argUpdateBillRequest.billStateId)
                    if(tmpState.code == BillStateType.FACTURA_VALIDADA){
                        if(tmpBillToUpdate.billState.code == BillStateType.FACTURA_CREADA){
                            def configConsecFactura = Configuration.findByCode(Configuration.CONFIG_CONSECUTIVO_FACTURA)
                            def billNumber = configConsecFactura.value as Long
                            tmpBillToUpdate.billNumber = billNumber
                            //se actualiza el consecutivo al existir para generar un nuevo candidato a utilizar
                            configConsecFactura.value = billNumber+1
                            adminService.updateConfiguration(configConsecFactura)
                        }
                    }
                    tmpBillToUpdate.billState = tmpState
                }

                if(argUpdateBillRequest.billDetails != null) {
                    //Se desactivan las detalles de factura que fueron eliminadas en el FE

                    if (argUpdateBillRequest.billDetails.size() == 0) {
                        //si la lista viene vacia, se eliminan todas los detalles factura
                        tmpBillToUpdate.billDetails.each{
                            it.enabled = Constants.ESTADO_INACTIVO
                        }
                    }else{

                        tmpBillToUpdate.billDetails.each { tmpPersistedBillDetail ->

                            tmpPersistedBillDetail.enabled = Constants.ESTADO_INACTIVO
                            argUpdateBillRequest.billDetails.each { restBilLDetail ->
                                if (tmpPersistedBillDetail.id == restBilLDetail.id) {
                                    tmpPersistedBillDetail.enabled = Constants.ESTADO_ACTIVO
                                    /*
                                    si viene un detalle factura que ya existe, se pone activo
                                    para quitarlo de los candidatos a eliminar y a la misma vez se
                                    edita
                                     */
                                    setBillDetailFromRESTObject(tmpPersistedBillDetail, restBilLDetail)
                                }
                            }
                        }
                        //Se agregan los detalles factura nuevos
                        def tmpNewBillDetailsToAdd = new ArrayList<BillDetailRequest>()
                        argUpdateBillRequest.billDetails.each {
                            if (it.id == null) {
                                tmpNewBillDetailsToAdd.add(it)
                            }
                        }

                        processRestBillDetails(tmpNewBillDetailsToAdd, tmpBillToUpdate)
                    }
                    //luego de taggear los detalles de factura existentes a eliminar, se eliminan de la lista para reflejar dicha
                    //eliminacion en BD
                    tmpBillToUpdate.billDetails.removeAll { it.enabled == Constants.ESTADO_INACTIVO}
                    //se recalculan los montos luego de la edicion de detalles de factura
                    tmpBillToUpdate.totalAmount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_TOTAL)
                    tmpBillToUpdate.subTotalAmount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_SUBTOTAL)
                    tmpBillToUpdate.totalTaxAmount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_TOTAL_IMPUESTOS)
                    tmpBillToUpdate.totalDiscount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_TOTAL_DESCUENTOS)
                }
                updatedBill = tmpBillToUpdate.save(flush: true, failOnError: true)

                if(updatedBill.billState.code == BillStateType.BILL_PRE_BILL_STATE_CODE && !isUpdateFromWarehouseOrder){
                    warehouseOrderService.createWarehouseOrderFromBill(warehouseOrderService.getWarehouseOrderFromBill(argUpdateBillRequest, updatedBill))
                }
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.bill.notFound.error", null, Locale.default))
            }
        }

        catch (Exception e) {
            log.error(e)
            if(e instanceof LightRuntimeException ){
                throw e
            }
            else{
                throw new LightRuntimeException(messageSource.getMessage("update.bill.error", null, Locale.default))
            }
        }
    }

/**
 * Este método se encarga de procesar todos los detalles de factura que vienen
 * desde el cliente calculando los montos totales necesarios.
 * @author Leo Chen
 */
    def private processRestBillDetails(List<BillDetailRequest> argBillDetails, Bill argBill){
        try {
            argBillDetails.each { billDetailRest ->
                //TODO verificar que el producto este activo por motivos de concurrencia
                def tmpBillDetail = new BillDetail()
                //se  setea  el objeto detalleFactura
                setBillDetailFromRESTObject(tmpBillDetail, billDetailRest)
                argBill.addToBillDetails(tmpBillDetail)
            }
        } catch (Exception e) {
            log.error "Ha ocurrido un error procesando los detalles de factura " + e.message
            throw e
        }
    }

    /**
     * Este método se encarga de procesar todos los detalles de factura que vienen
     * desde el cliente calculando los montos total indicado por parametro.
     * @author Leo Chen
     */
    def private calculateBillAmount(Bill argBill, def calculationTypeCode){
        def tmpAmount = 0.0D
        try {
            switch (calculationTypeCode) {
                case Constants.FACTURA_SUBTOTAL:
                    argBill.billDetails.each { billDetail ->
                        if(billDetail.enabled == Constants.ESTADO_ACTIVO) {
                            tmpAmount += billDetail.subTotal
                        }
                    }
                    break
                case Constants.FACTURA_TOTAL:
                    argBill.billDetails.each { billDetail ->
                        if(billDetail.enabled == Constants.ESTADO_ACTIVO) {
                            tmpAmount += billDetail.total
                        }
                    }
                        break
                case Constants.FACTURA_TOTAL_DESCUENTOS:
                    argBill.billDetails.each { billDetail ->
                        if(billDetail.enabled == Constants.ESTADO_ACTIVO) {
                            tmpAmount += billDetail.totalDiscount
                        }
                    }
                        break
                case Constants.FACTURA_TOTAL_IMPUESTOS:
                    argBill.billDetails.each { billDetail ->
                        if(billDetail.enabled == Constants.ESTADO_ACTIVO) {
                            tmpAmount += billDetail.totalTaxAmount
                        }
                    }
                        break
            }
        } catch (Exception e) {
            log.error "Ha ocurrido un error calculando los totales " + e.message
            throw e
        }
        return tmpAmount
    }

    /**
     * Este método se encarga de generar el siguiente numero factible
     * para ser utilizado como bill number utilizado en flujo de creacion y edicion especificamente
     * @author Leo Chen
     */
    def generateBillNumber(){
        def billNumber = 0L
        try {
         def tmpMaxBillNumber = Bill.createCriteria().get {
                projections {
                    max "billNumber"
                }
            } as Long

            if(tmpMaxBillNumber != null){
                billNumber = tmpMaxBillNumber+1
            }
            else{
                //si entramos en este bloque no existe facturas registradas
                // por lo tanto el numero de factura
                billNumber =1
            }
        } catch (Exception e) {
            log.error "Ha ocurrido un error calculando el numero de factura " + e.message
            throw e
        }
        return billNumber
    }

    /**
     * Este método se encarga de validar que el numero de factura que el cliente
     * envia al backend para almacenar cumpla con ciertos criterios
     * @author Leo Chen
     */
    def validateBillNumber(def argBillNumber){
        try {
            def lastBillNumber = Bill.createCriteria().get {
                projections {
                    max "billNumber"
                }
            } as Long

            def totalBills = Bill.countByBillNumber(argBillNumber)
            log.info 'totalBills'+totalBills

            if(totalBills > 0){
                throw new LightException(messageSource.getMessage("billNumber.nonUnique.error", null, Locale.default))
            }
            else if(argBillNumber <= 0 || (lastBillNumber != null &&  argBillNumber < lastBillNumber)){
                log.info 'totalBills'+totalBills
                throw new LightException(messageSource.getMessage("billNumber.invalid.error", null, Locale.default))
            }
        } catch (Exception e) {
            log.error "Ha ocurrido un error validando el numero de factura " + e.message
            throw e
        }
    }

    /**
     * Este método se encarga de setear un objeto detalle factura a partir de un objeto
     * sirve para procesar detalles de factura en una creacion de factura o edicion
     * detalle factura REST
     * @author Leo Chen
     */
    def setBillDetailFromRESTObject(def pBillDetail, def pBillDetailRest){
        try {
            def tmpProduct = Product.findByIdAndEnabled(pBillDetailRest.productId, Constants.ESTADO_ACTIVO)
            //se inicializa el objeto detalleFactura
            pBillDetail.product = tmpProduct
            pBillDetail.quantity = pBillDetailRest.quantity
            pBillDetail.linePrice = pBillDetailRest.linePrice
            pBillDetail.discountPercentage = pBillDetailRest.discountPercentage
            pBillDetail.taxPercentage = pBillDetailRest.taxPercentage
            //se realizan calculos
            pBillDetail.subTotal = pBillDetail.linePrice * pBillDetail.quantity
            pBillDetail.totalDiscount = (pBillDetail.subTotal * pBillDetail.discountPercentage) / 100
            pBillDetail.totalTaxAmount = ((pBillDetail.subTotal - pBillDetail.totalDiscount) * pBillDetail.taxPercentage) / 100
            pBillDetail.total = (pBillDetail.subTotal - pBillDetail.totalDiscount) + pBillDetail.totalTaxAmount
        } catch (Exception e) {
            log.error "Ha ocurrido un error creando el objeto detalle factura" + e.message
            throw e
        }
    }

    /**
     * Este servicio se encarga de actualizar  solamente el estado de la factura cuando sea necesario
     * desde cualquier controller
     * @param pBill es la factura a actualizar
     * @param pBillStateCode es el codigo del estado
     * @author Leo Chen
     */
    def changeBillState(def pBill, def pBillStateCode){
        try {
            pBill.billState = BillStateType.findByCode(pBillStateCode)
            pBill.save(failOnError: true)
        } catch (Exception e) {
            log.error "Ha ocurrido un error actualizando el estado de la factura" + e.message
            throw e
        }
    }

    /**
     * Este servicio se encarga de actualizar el estado de una factura y asignar consecutivo de factura cuando la orden de salida de
     * bodega asociada es aprobada
     * @param pBill es la factura a actualizar
     * @param pBillStateCode es el codigo del estado
     * @author Leo Chen
     */
    def changeBillStateFromAppovedWarehouseOrder(def pBill){
        try {
            pBill.billState = BillStateType.findByCode(BillStateType.FACTURA_VALIDADA)
            def configConsecFactura = Configuration.findByCode(Configuration.CONFIG_CONSECUTIVO_FACTURA)
            def billNumber = configConsecFactura.value as Long
            pBill.billNumber = billNumber
            //se actualiza el consecutivo al existir para generar un nuevo candidato a utilizar
            configConsecFactura.value = billNumber+1
            adminService.updateConfiguration(configConsecFactura)

            pBill.save(failOnError: true)
        } catch (Exception e) {
            log.error "Ha ocurrido un error actualizando el estado de la factura" + e.message
            throw e
        }
    }

    /**
     * Este metodo se encarga de determinar si las cantidades de cada una de los detalles de la factura estan disponibles
     * @param pbill es la factura a crear
     * @author Mauricio Fernandez
     * @return boolean areQuantitiesAvailable}
     */
    def checkProducLotQuantities(def detailsList){

        // Metodo no se usa mas, eventualmente se puede eliminar

        detailsList.each { billDetailReq ->
            def tmpquantity = 0
            def tmpProduct = Product.findByIdAndEnabled(billDetailReq.productId, Constants.ESTADO_ACTIVO)

            tmpProduct.productLot.each{ productLot ->
                if(productLot.enabled == Constants.ESTADO_ACTIVO){
                    tmpquantity += productLot.quantity
                }
            }

            if(tmpquantity < billDetailReq.quantity){
                throw new LightRuntimeException(messageSource.getMessage("bill.detail.quantity.exceeded.error", null, Locale.default))
            }
        }
    }
}

