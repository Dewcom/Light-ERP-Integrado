package com.dewcom.light

import com.dewcom.light.rest.BillDetailRest
import com.dewcom.light.rest.BillRest
import com.dewcom.light.rest.UpdateBillRequestREST
import grails.transaction.Transactional

@Transactional
class BillService {

    def messageSource
    def adminService

    Bill getBill(def billId) {
        log.info "====== Getting bill from DB ======"
        log.info billId
        try {
            Bill billFromDB = Bill.findByIdAndEnabled(billId, Constants.ESTADO_ACTIVO);
            return billFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.bill.error", null, Locale.default));
        }
    }


    def getAllBills() {
        log.info "======Getting all bills from DB======"
        try {
            def billsFromDB = Bill.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return billsFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.bills.error", null, Locale.default));
        }
    }


    def getAllBillsByCustomerId(def customerId) {
        log.info "====== Getting all biils from DB by customerId ======"
        def tmpCustomer = Customer.findById(customerId)
        try {
            def billsFromDB = Bill.findAllByEnabledAndCustomer(Constants.ESTADO_ACTIVO, tmpCustomer);
            return billsFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.bills.error", null, Locale.default));
        }
    }

    def createBill(BillRest argRestBill) {
        def savedBill;
        try {
            def configConsecFactura
            Bill tmpBill = new Bill()
            def billUser = User.findByUsername(argRestBill.userName)
            def customer = Customer.findById(argRestBill.customerId)
            def paymentType = BillPaymentType.findById(argRestBill.billPaymentTypeId)
            def creditCondition;
            tmpBill.address = Address.get(argRestBill.billAddress)
            def billDate = LightUtils.stringToDate(argRestBill.billDate,"dd-MM-yyyy")

            if(argRestBill.billPaymentTypeId != null && paymentType.code == Constants.PAGO_CREDITO){
                if(argRestBill.creditConditionId != null ){
                    creditCondition = CreditCondition.findById(argRestBill.creditConditionId)
                    if(billDate != null){
                        tmpBill.dueDate = LightUtils.plusDaysToDate(billDate, creditCondition.days)
                    }
                }
            }
            def currency = Currency.findById(argRestBill.currencyId)

            def billStateType
            if(argRestBill.registrationType == Constants.CREADA_BORRADOR){
                billStateType = BillStateType.findByCode(Constants.FACTURA_CREADA)
            }
            else{
                configConsecFactura = Configuration.findByCode(Constants.CONFIG_CONSECUTIVO_FACTURA)
                if (!configConsecFactura) {
                    Configuration tmpConfig = new Configuration(value: generateBillNumber().toString(), description: "consecutivo factura", code: Constants.CONFIG_CONSECUTIVO_FACTURA)
                    configConsecFactura = adminService.createConfiguration(tmpConfig)
                }
                billStateType = BillStateType.findByCode(Constants.FACTURA_VALIDADA)
                tmpBill.billNumber = configConsecFactura.value as Long
            }

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

            //se actualiza el numero de consecutivo en caso de haberse almacenado  correctamente la factura
            if(argRestBill.registrationType == Constants.CREADA_VALIDADA){
                configConsecFactura.value = ((configConsecFactura.value as Long) + 1).toString();
                adminService.updateConfiguration(configConsecFactura)
            }
        } catch (Exception e) {
            log.error(e);

            if(e instanceof LightRuntimeException){
                throw e;
            }
            else{
                throw new LightRuntimeException(messageSource.getMessage("create.bill.error", null, Locale.default));
            }
        }
        return savedBill;
    }

    def deleteBill(Bill bill) {
        try {
            bill.enabled = Constants.ESTADO_INACTIVO;
            bill.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.bill.error", null, Locale.default));
        }
    }

    def updateBill(UpdateBillRequestREST argUpdateBillRequest) {
        try {
            Bill tmpBillToUpdate = Bill.findByIdAndEnabled(argUpdateBillRequest.billId, Constants.ESTADO_ACTIVO)
            if (tmpBillToUpdate) {

                tmpBillToUpdate.currency = argUpdateBillRequest.currencyId != null ?  Currency.get(argUpdateBillRequest.currencyId) : tmpBillToUpdate.currency
                tmpBillToUpdate.exchangeRate = argUpdateBillRequest.exchangeRate != null ?  argUpdateBillRequest.exchangeRate : tmpBillToUpdate.exchangeRate
                tmpBillToUpdate.billDate = argUpdateBillRequest.billDate != null ?  LightUtils.stringToDate(argUpdateBillRequest.billDate,"dd-MM-yyyy") : tmpBillToUpdate.billDate
                tmpBillToUpdate.customer = argUpdateBillRequest.customerId != null ?  Customer.get(argUpdateBillRequest.customerId) : tmpBillToUpdate.customer
                tmpBillToUpdate.address = argUpdateBillRequest.addressId != null ?  Address.get(argUpdateBillRequest.addressId) : tmpBillToUpdate.address

                if(argUpdateBillRequest.billPaymentTypeId != null){
                    def tmpBillPaymentType = BillPaymentType.get(argUpdateBillRequest.billPaymentTypeId)
                    tmpBillToUpdate.billPaymentType = tmpBillPaymentType
                    if(tmpBillPaymentType.code == Constants.PAGO_CONTADO){
                        tmpBillToUpdate.dueDate = new Date()
                        tmpBillToUpdate.creditCondition = null
                    }
                }

                if(argUpdateBillRequest.creditConditionId != null){
                    def tmpCreditCondition = CreditCondition.get(argUpdateBillRequest.creditConditionId)
                    tmpBillToUpdate.creditCondition = tmpCreditCondition
                    if(tmpBillToUpdate.billDate != null){
                        tmpBillToUpdate.dueDate = LightUtils.plusDaysToDate(tmpBillToUpdate, tmpCreditCondition.days)
                    }
                }

                if(argUpdateBillRequest.billStateId != null){
                    def tmpState = BillStateType.get(argUpdateBillRequest.billStateId)
                    tmpBillToUpdate.billState = tmpState
                    if(tmpState.code == Constants.FACTURA_VALIDADA){
                        if(tmpBillToUpdate.billNumber == null){
                          def  configConsecFactura = Configuration.findByCode(Constants.CONFIG_CONSECUTIVO_FACTURA)
                            if (!configConsecFactura) {
                                Configuration tmpConfig = new Configuration(value: generateBillNumber().toString(), description: "consecutivo factura", code: Constants.CONFIG_CONSECUTIVO_FACTURA)
                                configConsecFactura = adminService.createConfiguration(tmpConfig)
                            }
                            tmpBillToUpdate.billNumber = configConsecFactura.value as Long
                        }

                    }
                }
                if(argUpdateBillRequest.billDetails != null) {
                    //Se desactivan las detalles de factura que fueron eliminadas en el FE


                    if (argUpdateBillRequest.billDetails.size() == 0) {
                        //si la lista viene vacia, se eliminan todas los detalles factura
                        tmpBillToUpdate.billDetails.each{
                            it.enabled = Constants.ESTADO_INACTIVO;
                        }
                    }
                    else{

                    tmpBillToUpdate.billDetails.each { tmpPersistedBillDetail ->

                        tmpPersistedBillDetail.enabled = Constants.ESTADO_INACTIVO;
                        argUpdateBillRequest.billDetails.each { restBilLDetail ->
                            if (tmpPersistedBillDetail.id == restBilLDetail.id) {
                                tmpPersistedBillDetail.enabled = Constants.ESTADO_ACTIVO;
                                /*
                                si viene un detalle factura que ya existe, se pone activo
                                para quitarlo de los candidatos a eliminar y a la misma vez se
                                edita indempotentemente
                                 */
                                setBillDetailFromRESTObject(tmpPersistedBillDetail, restBilLDetail)
                            }
                        }
                    }
                    //Se agregan los detalles factura nuevos
                    def tmpNewBillDetailsToAdd = new ArrayList<BillDetailRest>()
                    argUpdateBillRequest.billDetails.each {
                        if (it.id == null) {
                            tmpNewBillDetailsToAdd.add(it)
                        }
                    }
                    processRestBillDetails(tmpNewBillDetailsToAdd, tmpBillToUpdate)
                }
                    //se recalculan los montos luego de la edicion de detalles de factura
                    tmpBillToUpdate.totalAmount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_TOTAL)
                    tmpBillToUpdate.subTotalAmount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_SUBTOTAL)
                    tmpBillToUpdate.totalTaxAmount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_TOTAL_IMPUESTOS)
                    tmpBillToUpdate.totalDiscount = calculateBillAmount(tmpBillToUpdate, Constants.FACTURA_TOTAL_DESCUENTOS)
                }
                tmpBillToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.bill.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if(e instanceof LightRuntimeException ){
                throw e;
            }
            else{
                throw new LightRuntimeException(messageSource.getMessage("update.bill.error", null, Locale.default));
            }
        }
    }

/**
 * Este método se encarga de procesar todos los detalles de factura que vienen
 * desde el cliente calculando los montos totales necesarios.
 * @author Leo Chen
 */
    def private processRestBillDetails(List<BillDetailRest> argBillDetails, Bill argBill){
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
     * Este método se encarga de procesar revisar de la base de datos
     * cual es el numero de factura mas reciente secuencialmente generar uno nuevo.
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
                billNumber =1;
            }
        } catch (Exception e) {
            log.error "Ha ocurrido un error calculando los totales " + e.message
            throw e
        }
        return billNumber
    }

    /**
     * Este método se encarga de validar que el numero de factura que el cliente
     * envia al backend para almacenar cumpla con ciertos criterios
     * @author Leo Chen
     */
    def  validateBillNumber(def argBillNumber){
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
     * sirve para procesar detalles de fatura en una creacion de factura o edicion
     * detalle factura REST
     * @author Leo Chen
     */
    def  setBillDetailFromRESTObject(def pBillDetail, def pBillDetailRest){
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
            pBillDetail.totalTaxAmount = (pBillDetail.subTotal * pBillDetail.taxPercentage) / 100
            pBillDetail.total = (pBillDetail.subTotal - pBillDetail.totalDiscount) + pBillDetail.totalTaxAmount
        } catch (Exception e) {
            log.error "Ha ocurrido un error creando el objeto detalle factura" + e.message
            throw e
        }
    }
}

