package com.dewcom.light

import com.dewcom.light.rest.UpdateContactRequestREST
import grails.transaction.Transactional

@Transactional
class BillService {

    def messageSource

    Contact getBill(def billId) {
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

    def createBill(Bill bill) {
        try {
            bill.save(flush: true, failOnError:true)
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

    def serviceMethod() {

    }
}
