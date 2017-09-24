package com.dewcom.light.billing

import com.dewcom.light.utils.Constants
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.utils.LightUtils
import com.dewcom.light.rest.billing.PaymentRequest
import com.dewcom.light.rest.billing.UpdatePaymentRequest
import grails.transaction.Transactional

/**
 * Created by chen on 08/05/17.
 */
@Transactional
class PaymentService {
    def billService
    def messageSource

    Payment getPayment(def pPaymentId) {
        log.info "====== Getting payment from DB ======"
        log.info pPaymentId
        try {
            Payment tmpPaymentFromDB = Payment.findByIdAndEnabled(pPaymentId, Constants.ESTADO_ACTIVO);
            return tmpPaymentFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.payment.error", null, Locale.default));
        }
    }


    def getAllPayments() {
        log.info "====== Getting all payments from DB ======"
        try {
            def paymentsFromBD = Payment.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return paymentsFromBD
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.payments.error", null, Locale.default));
        }
    }

    def createPayment(Payment pPayment) {
        log.info "====== Creating payment ======"
        try {
            def tmpBill = billService.getBill(pPayment.billId)
            def billPayments = tmpBill.payments
            def tmpTotalPaymentsAmount = !billPayments ? 0.0D : billPayments.sum { it.amount };

            if(tmpTotalPaymentsAmount == 0.0D){
                tmpBill.billState = BillStateType.findByCode(BillStateType.FACTURA_PAGADA_PARCIAL)
            }

            if(pPayment.amount + tmpTotalPaymentsAmount > tmpBill.totalAmount){
                throw new LightRuntimeException(messageSource.getMessage("create.payment.amount.greater.error", null, Locale.default));
            }
            else if(tmpBill.totalAmount == tmpTotalPaymentsAmount+pPayment.amount ){
                tmpBill.billState = BillStateType.findByCode(BillStateType.FACTURA_PAGADA)
            }


            //actualizamos el objeto bill
            tmpBill.save()
            pPayment.save(flush: true, failOnError: true)
        } catch (Exception e) {
            log.error(e);
            if(e instanceof LightRuntimeException ){
                throw e;
            }
            else{
                throw new LightRuntimeException(messageSource.getMessage("create.payment.error", null, Locale.default));
            }
        }
    }

    def deletePayment(Payment pPayment) {
        log.info "====== Deleting payment ======"
        try {
            def tmpBill = pPayment.bill
            tmpBill.billState = BillStateType.findByCode(BillStateType.FACTURA_PAGADA_PARCIAL)
            tmpBill.save(failOnError: true)
            pPayment.delete(flush: true, failOnError: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.payment.error", null, Locale.default));
        }
    }

    def updatePayment(UpdatePaymentRequest pPaymentREST) {
        log.info "====== Updating payment ======"
        try {
            Payment tmpPaymentToUpdate = Payment.findByIdAndEnabled(pPaymentREST.id, Constants.ESTADO_ACTIVO)
            if (tmpPaymentToUpdate) {
                def tmpBill = tmpPaymentToUpdate.bill
                def billPayments = tmpBill.payments
                def tmpTotalPaymentsAmount = !billPayments ? 0.0D : billPayments.sum { it.amount };

                if(tmpPaymentToUpdate.amount + tmpTotalPaymentsAmount > tmpBill.totalAmount){
                    throw new LightRuntimeException(messageSource.getMessage("create.payment.amount.greater.error", null, Locale.default));
                }
                else if(tmpBill.totalAmount == tmpTotalPaymentsAmount+tmpPaymentToUpdate.amount ){
                    tmpBill.billState = BillStateType.findByCode(BillStateType.FACTURA_PAGADA)
                }

                //actualizamos el objeto bill
                tmpBill.save()

                tmpPaymentToUpdate.amount = pPaymentREST.amount
                tmpPaymentToUpdate.observation = pPaymentREST.observation
                tmpPaymentToUpdate.bankAccount = pPaymentREST.bankAccount
                tmpPaymentToUpdate.bankReceipt = pPaymentREST.bankReceipt
                tmpPaymentToUpdate.paymentDate = LightUtils.stringToDate(pPaymentREST.paymentDate,"dd-MM-yyyy")
                tmpPaymentToUpdate.paymentType = pPaymentREST.paymentType

                tmpPaymentToUpdate.save(flush: true, failOnError:true)
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.payment.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if (e instanceof LightRuntimeException) {
                throw e;
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.payment.error", null, Locale.default));
            }
        }
    }


    def static fromRestPayment(PaymentRequest pPaymentREST){
        Payment tmpPayment = new Payment();
        tmpPayment.paymentDate =  LightUtils.stringToDate(pPaymentREST.paymentDate,"dd-MM-yyyy")
        tmpPayment.amount = pPaymentREST.amount;
        tmpPayment.bankAccount = pPaymentREST.bankAccount;
        tmpPayment.bankReceipt = pPaymentREST.bankReceipt;
        tmpPayment.bill = Bill.findByIdAndEnabled(pPaymentREST.billId, Constants.ESTADO_ACTIVO);
        tmpPayment.observation = pPaymentREST.observation;
        tmpPayment.paymentType = pPaymentREST.paymentType;
        return tmpPayment;
    }

}
