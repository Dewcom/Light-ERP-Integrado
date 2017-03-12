package com.dewcom.light

import com.dewcom.light.rest.BillRest
import com.dewcom.light.rest.ResponseREST
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class BillController extends RestController {

    def messageSource
    def billService

    /**
     * Este método se encarga de obtener una lista de facturas o una especifico por medio del ID
     * @author Leonardo Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get bill request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                Bill billFromBd = BillService.getBill(tmpId);

                if(billFromBd){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = billFromBd
                }else{
                    tmpResponse.message = messageSource.getMessage("bill.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def billsFromDb = billService.getAllBills();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = billsFromDb
            }
            log.info "====== Get bill response ======"
            log.info tmpResponse as JSON
            JSON.use('deep');
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }


    def getBillsByCustomerId() {
        log.info "========== Get bills by client id  request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id
            def tmpBills = new ArrayList()
            if(tmpId){
                tmpBills = billService.getAllBillsByCustomerId(tmpId);
            }
            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = tmpBills

            log.info "====== Get bills by client id response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear una factura
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create  bill request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        BillRest tmpBill = new BillRest(request.JSON);
        try {
            tmpBill.validate();
            if (tmpBill.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpBill.errors);
            } else {
              def newBill =  billService.createBill(tmpBill);

                tmpResponse.message = messageSource.getMessage("create.bill.success", null, Locale.default)
                tmpResponse.data = newBill
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create bill response ======"
            log.info tmpResponse as JSON
            JSON.use('deep');
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un contacto
     * @author Leonardo Chen
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete bill  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                Bill tmpBill = billService.getBill(request.JSON.id);

                if(tmpBill) {
                    billService.deleteBill(tmpBill);
                    tmpResponse.message = messageSource.getMessage("delete.bill.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("bill.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete bill response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un contacto
     * @author Leonardo Chen
     * @param name
     */
   /* @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update bill request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateContactRequestREST tmpContactRest = new UpdateContactRequestREST(request.JSON);
        log.info request.JSON
        try {
            tmpContactRest.validate();
            if (tmpContactRest.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpContactRest.errors);
            } else {
                contactService.updateContact(tmpContactRest);
                tmpResponse.message = messageSource.getMessage("update.contact.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update contact response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }*/

}
