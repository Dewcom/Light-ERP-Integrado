package com.dewcom.light

import com.dewcom.light.rest.BillDetailRest
import com.dewcom.light.rest.BillRest
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
            def creationDate = LightUtils.stringToDate(argRestBill.creationDate,"dd-MM-yyyy")

            if(argRestBill.billPaymentTypeId != null && paymentType.code == Constants.PAGO_CREDITO){
                if(argRestBill.creditConditionId != null ){
                    creditCondition= CreditCondition.findById(argRestBill.creditConditionId)
                    if(creationDate != null){
                        tmpBill.dueDate = LightUtils.plusDaysToDate(creationDate, creditCondition.days)
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
            tmpBill.creationDate = creationDate

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

    /*def updateBill(UpdateContactRequestREST argRestContact) {
        try {
            Contact tmpContactToUpdate = Contact.findByIdAndEnabled(argRestContact.id, Constants.ESTADO_ACTIVO)
            if (tmpContactToUpdate) {
                tmpContactToUpdate.name = argRestContact.name;
                tmpContactToUpdate.firstLastName = argRestContact.firstLastName;
                tmpContactToUpdate.secondLastName = argRestContact.secondLastName;
                tmpContactToUpdate.jobTitle = argRestContact.jobTitle;
                tmpContactToUpdate.department = argRestContact.department;
                tmpContactToUpdate.phoneNumber1 = argRestContact.phoneNumber1;
                tmpContactToUpdate.phoneNumber2 = argRestContact.phoneNumber2;
                tmpContactToUpdate.mobile = argRestContact.mobile;
                tmpContactToUpdate.email =  argRestContact.email;

                tmpContactToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.contact.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if(e instanceof LightRuntimeException ){
                throw e;
            }
            else{
                throw new LightRuntimeException(messageSource.getMessage("update.contact.error", null, Locale.default));
            }
        }
    }*/

/**
 * Este método se encarga de procesar todos los detalles de factura que vienen
 * desde el cliente calculando los montos totales necesarios.
 * @author Leo Chen
 */
    def private processRestBillDetails(List<BillDetailRest> argBillDetails, Bill argBill){
        try {
            argBillDetails.each { billDetailRest ->
                //TODO verificar que el producto este activo por motivos de concurrencia
                def tmpProduct = Product.findByIdAndEnabled(billDetailRest.productId, Constants.ESTADO_ACTIVO)
                def tmpBillDetail = new BillDetail()
                //se inicializa el objeto detalleFactura
                tmpBillDetail.product = tmpProduct
                tmpBillDetail.quantity = billDetailRest.quantity
                tmpBillDetail.linePrice = billDetailRest.linePrice
                tmpBillDetail.discountPercentage = billDetailRest.discountPercentage
                tmpBillDetail.taxPercentage = billDetailRest.taxPercentage
                //se realizan calculos
                tmpBillDetail.subTotal = tmpBillDetail.linePrice * tmpBillDetail.quantity
                tmpBillDetail.totalDiscount = (tmpBillDetail.subTotal * tmpBillDetail.discountPercentage) / 100
                tmpBillDetail.totalTaxAmount = (tmpBillDetail.subTotal * tmpBillDetail.taxPercentage) / 100
                tmpBillDetail.total = (tmpBillDetail.subTotal - tmpBillDetail.totalDiscount) + tmpBillDetail.totalTaxAmount
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
                        tmpAmount+= billDetail.subTotal
                    }
                    break
                case Constants.FACTURA_TOTAL:
                    argBill.billDetails.each { billDetail ->
                        tmpAmount += billDetail.total
                    }
                        break
                case Constants.FACTURA_TOTAL_DESCUENTOS:
                    argBill.billDetails.each { billDetail ->
                        tmpAmount += billDetail.totalDiscount
                    }
                        break
                case Constants.FACTURA_TOTAL_IMPUESTOS:
                    argBill.billDetails.each { billDetail ->
                        tmpAmount += billDetail.totalTaxAmount
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
}

