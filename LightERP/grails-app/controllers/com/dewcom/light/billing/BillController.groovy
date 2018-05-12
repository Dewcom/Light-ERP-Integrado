package com.dewcom.light.billing

import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.JSONMapper
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.billing.BillRequest
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.billing.UpdateBillRequest
import com.dewcom.light.warehouse.Product
import com.dewcom.light.warehouse.WarehouseOrder
import com.dewcom.light.warehouse.WarehouseOrderDetail
import com.dewcom.light.warehouse.WarehouseOrderStateType
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class BillController extends RestController {

    def messageSource
    def billService
    def warehouseOrderService

    /**
     * Este método se encarga de obtener una lista de facturas o una especifico por medio del ID
     * @author Leonardo Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get bill request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def tmpId = params.id

            if(tmpId){
                Bill billFromBd = billService.getBill(tmpId)

                if(billFromBd){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = JSONMapper.from(billFromBd)
                }else{
                    tmpResponse.message = messageSource.getMessage("bill.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def billsFromDb = billService.getAllBills()

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = JSONMapper.listFrom(billsFromDb)
            }
            log.info "====== Get bill response ======"
            log.info tmpResponse.code
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }


    def getBillsByCustomerId() {
        log.info "========== Get bills by client id  request =========="

        ResponseREST tmpResponse = new ResponseREST()

        try {
            def tmpId = params.id
            def tmpBills = new ArrayList()
            if(tmpId){
                tmpBills = billService.getAllBillsByCustomerId(tmpId)
            }
            tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE
            tmpResponse.data = JSONMapper.listFrom(tmpBills)

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

        ResponseREST tmpResponse = new ResponseREST()
        BillRequest tmpBill = new BillRequest(request.JSON.bill)
        try {
            tmpBill.validate()
            if (tmpBill.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpBill.errors)
            } else {
                def newBill =  billService.createBill(tmpBill)

                tmpResponse.message = messageSource.getMessage("create.bill.success", null, Locale.default)
                tmpResponse.data = JSONMapper.from(newBill)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create bill response ======"
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

        ResponseREST tmpResponse = new ResponseREST()
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                Bill tmpBill = billService.getBill(request.JSON.id)

                if(tmpBill) {
                    billService.deleteBill(tmpBill)
                    tmpResponse.message = messageSource.getMessage("delete.bill.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("bill.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default)
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete bill response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de generar un numero de factura
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def generateBillNumber(){
        ResponseREST tmpResponse = new ResponseREST()
        try {
            tmpResponse.message = messageSource.getMessage("generate.billNumber.success", null, Locale.default)
            tmpResponse.data = billService.generateBillNumber()
            tmpResponse.code = Constants.SUCCESS_RESPONSE

            log.info "====== generate bill number response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de modificar una factura
     * @author Leonardo Chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update bill request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST()
        UpdateBillRequest tmpUpdateBillRequest = new UpdateBillRequest(request.JSON)
        //path variable
        tmpUpdateBillRequest.billId = params.long('billId')
        log.info request.JSON
        log.info tmpUpdateBillRequest.billId
        try {
            billService.updateBill(tmpUpdateBillRequest)
            tmpResponse.message = messageSource.getMessage("update.bill.success", null, Locale.default)
            tmpResponse.code = Constants.SUCCESS_RESPONSE


            log.info "====== Update bill response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

}
