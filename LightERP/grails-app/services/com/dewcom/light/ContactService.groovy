package com.dewcom.light

import com.dewcom.light.rest.ContactREST
import com.dewcom.light.rest.UpdateContactRequestREST
import com.dewcom.light.rest.UpdateCustomerRequestREST
import grails.transaction.Transactional

@Transactional
class ContactService {

    def messageSource

    Contact getContact(def contactId) {
        log.info "====== Getting contact from DB ======"
        log.info contactId
        try {
            Contact contactFromDB = Contact.findByIdAndEnabled(contactId, Constants.ESTADO_ACTIVO);
            return contactFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.contact.error", null, Locale.default));
        }
    }


    def getAllContacts() {
        log.info "====== Getting all customer from DB ======"
        try {
            def contactsFromDB = Contact.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return contactsFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.contacts.error", null, Locale.default));
        }
    }
    def getContactsByCustomerId(def customerId) {
        log.info "====== Getting all contacts from DB by customerId ======"
        def tmpCustomer = Customer.findById(customerId)
        try {
            def contactsFromDB = Contact.findAllByEnabledAndCustomer(Constants.ESTADO_ACTIVO, tmpCustomer);
            return contactsFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.contacts.error", null, Locale.default));
        }
    }


    def createContact(ContactREST pcontact) {
        try {
            def contact = fromRestContact(pcontact)
            contact.save(flush: true, failOnError:true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.contact.error", null, Locale.default));
        }
    }

    def deleteContact(Contact pcontact) {
        try {
            pcontact.enabled = Constants.ESTADO_INACTIVO;
            pcontact.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.contact.error", null, Locale.default));
        }
    }

    def updateContact(UpdateContactRequestREST argRestContact) {
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
    }

    def static fromRestContact(ContactREST pContactRest){
        Contact tmpContact = new Contact();
        tmpContact.name = pContactRest.name;
        tmpContact.firstLastName = pContactRest.firstLastName;
        tmpContact.secondLastName = pContactRest.secondLastName;
        tmpContact.phoneNumber1 = pContactRest.phoneNumber1;
        tmpContact.phoneNumber2 = pContactRest.phoneNumber2;
        tmpContact.mobile = pContactRest.mobile;
        tmpContact.jobTitle = pContactRest.jobTitle;
        tmpContact.department = pContactRest.department;
        tmpContact.email = pContactRest.email;
        tmpContact.customer = Customer.findById(pContactRest.customerId as Long);
        return tmpContact;
    }


}
