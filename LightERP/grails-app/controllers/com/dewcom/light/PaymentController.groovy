package com.dewcom.light

import com.dewcom.light.rest.PaymentREST
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.UpdatePaymentRequestREST
import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

/**
 * Created by chen on 06/05/17.
 */
class PaymentController extends  RestController {

    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def paymentService
    def billService
    /**
     * Este método se encarga de obtener una lista de pagos o uno especifico
     * @author Leonardo Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get payment request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
           def tmpId = params.long('paymentId')
            log.info tmpId

            if (tmpId) {
                Payment tmpPayment = paymentService.getPayment(tmpId);

                if (tmpPayment) {
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(tmpPayment)
                } else {
                    tmpResponse.message = messageSource.getMessage("payment.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            } else {
                def paymentsFromDb = paymentService.getAllPayments();
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(paymentsFromDb)
            }
            log.info "====== Get payment response ======"
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo pago
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
        def create() {
        log.info "==========  Create payment request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        Payment tmpPayment;
        PaymentREST tmpRestPayment = new PaymentREST(request.JSON.payment);
        try {

            tmpRestPayment.validate();
            if (tmpRestPayment.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpRestPayment.errors);
            } else {
                tmpPayment = paymentService.fromRestPayment(tmpRestPayment);
                paymentService.createPayment(tmpPayment);

                tmpResponse.message = messageSource.getMessage("create.payment.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create payment response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un pago
     * @author Leonardo Chen
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete payment request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            def tmpId = params.long('paymentId')
            if (tmpId != null) {
                Payment tmpPayment = paymentService.getPayment(tmpId);

                if (tmpPayment) {
                    paymentService.deletePayment(tmpPayment);
                    tmpResponse.message = messageSource.getMessage("delete.payment.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    //en caso de que la factura se quede sin pagos esta pasa a validada
                    if(tmpPayment.bill.payments.size() == 0){
                        billService.changeBillState(tmpPayment.bill, BillStateType.FACTURA_VALIDADA)
                    }
                } else {
                    tmpResponse.message = messageSource.getMessage("payment.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            } else {
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete tmpPayment response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un pago
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update payment request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdatePaymentRequestREST tmpPayment = new UpdatePaymentRequestREST(request.JSON.payment);
        try {
            tmpPayment.id = params.long('paymentId')
            tmpPayment.validate();
            if (tmpPayment.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpPayment.errors);
            } else {
                paymentService.updatePayment(tmpPayment);
                tmpResponse.message = messageSource.getMessage("update.payment.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update payment response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}