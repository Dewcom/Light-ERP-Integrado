package com.dewcom.light

import com.dewcom.light.rest.BillDetailRest
import com.dewcom.light.rest.BillRest
import com.dewcom.light.rest.UpdateContactRequestREST
import grails.transaction.Transactional

@Transactional
class BillService {

    def messageSource

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
        try {
            def billUser = User.findByUsername(argRestBill.userName)
            def customer = Customer.findById(argRestBill.customerId)
            def paymentType = BillPaymentType.findById(argRestBill.billPaymentTypeId)
            def creditCondition = CreditCondition.findById(argRestBill.creditConditionId)
            def billStateType = BillStateType.findByCode(Constants.FACTURA_CREADA)
            def currency = Currency.findById(argRestBill.currencyId)
            //TODO definir logica para calcular el dueDate en caso de que se tenga una condicion de credito
            Bill tmpBill = new Bill();
            tmpBill.billNumber = generateBillNumber()//LightUtils.randInt() as Long
            tmpBill.user = billUser
            tmpBill.customer = customer
            tmpBill.billPaymentType = paymentType
            tmpBill.creditCondition = creditCondition
            tmpBill.billState = billStateType
            tmpBill.currency = currency
            tmpBill.exchangeRate = argRestBill.exchangeRate
            processRestBillDetails(argRestBill.billDetails, tmpBill)
            //calculo de totales
            tmpBill.totalAmount = calculateBillAmount(tmpBill, Constants.FACTURA_TOTAL)
            tmpBill.subTotalAmount = calculateBillAmount(tmpBill, Constants.FACTURA_SUBTOTAL)
            tmpBill.totalTaxAmount = calculateBillAmount(tmpBill, Constants.FACTURA_TOTAL_IMPUESTOS)
            tmpBill.totalDiscount = calculateBillAmount(tmpBill, Constants.FACTURA_TOTAL_DESCUENTOS)
            //TODO SE NESECITA LOGICA PARA CALCULAR EL DUE DATE A PARTIR DEL CREDIT CONDITION...UNDER CONSTRUCT

           return tmpBill.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.bill.error", null, Locale.default));
        }
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
    def private  calculateBillAmount(Bill argBill, def calculationTypeCode){
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
    def private  generateBillNumber(){
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
}

