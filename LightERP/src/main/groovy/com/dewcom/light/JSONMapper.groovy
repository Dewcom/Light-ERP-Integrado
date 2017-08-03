package com.dewcom.light

import com.dewcom.light.rest.response.AddressRespREST
import com.dewcom.light.rest.response.BillDetailProductRespREST
import com.dewcom.light.rest.response.BillDetailRespREST
import com.dewcom.light.rest.response.BillPaymentTypeRespREST
import com.dewcom.light.rest.response.BillRespREST
import com.dewcom.light.rest.response.BillStateTypeRespREST
import com.dewcom.light.rest.response.ContactRespREST
import com.dewcom.light.rest.response.CreditConditionRespREST
import com.dewcom.light.rest.response.CurrencyRespREST
import com.dewcom.light.rest.response.CustomerRespREST
import com.dewcom.light.rest.response.CustomerTypeRespREST
import com.dewcom.light.rest.response.ExchangeRateRespREST
import com.dewcom.light.rest.response.IdentificationTypeRespREST
import com.dewcom.light.rest.response.MeasureUnitREST
import com.dewcom.light.rest.response.PaymentRespREST
import com.dewcom.light.rest.response.PresentationTypeRespREST
import com.dewcom.light.rest.response.ProductRespREST
import com.dewcom.light.rest.response.ProductTypeRespREST

/**
 * Created by lchen on 5/20/17.
 */
class JSONMapper {

    def static from(Customer pCustomer, boolean isDeep){
        def tmpRestObject = new CustomerRespREST()
        tmpRestObject.id = pCustomer.id
        tmpRestObject.name = pCustomer.name
        tmpRestObject.firstLastName = pCustomer.firstLastName
        tmpRestObject.secondLastName = pCustomer.secondLastName
        tmpRestObject.email = pCustomer.email
        tmpRestObject.phoneNumber1 = pCustomer.phoneNumber1
        tmpRestObject.phoneNumber2 = pCustomer.phoneNumber2
        tmpRestObject.website = pCustomer.website
        tmpRestObject.identification = pCustomer.identification
        tmpRestObject.creditLimit = pCustomer.creditLimit
        tmpRestObject.mobile = pCustomer.mobile
        tmpRestObject.discountPercentage = pCustomer.discountPercentage
        tmpRestObject.identificationType = from(pCustomer.identificationType, true)
        tmpRestObject.enabled = pCustomer.enabled
        tmpRestObject.customerType = from(pCustomer.customerType, true)
        tmpRestObject.contacts = isDeep ? listFrom(pCustomer.contacts, true) : []
        tmpRestObject.addresses = isDeep ? listFrom(pCustomer.addresses, true) : []
        tmpRestObject.registrationDate = pCustomer.registrationDate

        tmpRestObject
    }

    def static from(Contact pContact, boolean isDeep){
        def tmpRestObject = new ContactRespREST()
        tmpRestObject.id = pContact.id
        tmpRestObject.name = pContact.name
        tmpRestObject.firstLastName = pContact.firstLastName
        tmpRestObject.secondLastName = pContact.secondLastName
        tmpRestObject.email = pContact.email
        tmpRestObject.phoneNumber1 = pContact.phoneNumber1
        tmpRestObject.phoneNumber2 = pContact.phoneNumber2
        tmpRestObject.department = pContact.department
        tmpRestObject.mobile = pContact.mobile
        tmpRestObject.jobTitle = pContact.jobTitle
        tmpRestObject.registrationDate = pContact.registrationDate
        tmpRestObject.enabled = pContact.enabled
        tmpRestObject.customerId = pContact.customer.id
        tmpRestObject.customerName = pContact.customer.name
        tmpRestObject.customerLastNames = pContact.customer.firstLastName + " " +  pContact.customer.secondLastName
        tmpRestObject
    }

    def static from(Address pAddress, boolean isDeep){
        def tmpRestObject = new AddressRespREST()
        tmpRestObject.id = pAddress.id
        tmpRestObject.idDistrict = pAddress.idDistrict
        tmpRestObject.address = pAddress.address
        tmpRestObject.customerId = pAddress.customer.id
        tmpRestObject.enabled = pAddress.enabled

        tmpRestObject
    }

    def static from(Bill pBill, boolean isDeep){
        def tmpRestObject = new BillRespREST()
        tmpRestObject.id = pBill.id
        tmpRestObject.currency = from(pBill.currency, true)
        tmpRestObject.billState = from(pBill.billState, true)
        tmpRestObject.billPaymentType = from(pBill.billPaymentType, true)
        tmpRestObject.creditCondition = from(pBill.creditCondition, true)
        tmpRestObject.address = from(pBill.address, true)
        tmpRestObject.enabled = pBill.enabled
        tmpRestObject.totalTaxAmount = pBill.totalTaxAmount
        tmpRestObject.totalDiscount = pBill.totalDiscount
        tmpRestObject.totalAmount = pBill.totalAmount
        tmpRestObject.subTotalAmount = pBill.subTotalAmount
        tmpRestObject.exchangeRate = pBill.exchangeRate
        tmpRestObject.billDate = pBill.billDate
        tmpRestObject.billNumber = pBill.billNumber
        tmpRestObject.dueDate = pBill.dueDate
        tmpRestObject.creationDate = pBill.creationDate
        tmpRestObject.billDetails = listFrom(pBill.billDetails, true)
        tmpRestObject.payments = listFrom(pBill.payments, true)
        tmpRestObject.customer = from(pBill.customer, true)

        tmpRestObject
    }

    def static from(Currency pCurrency, boolean isDeep){
        def tmpRestObject = new CurrencyRespREST()
        tmpRestObject.id = pCurrency.id
        tmpRestObject.currencyCode = pCurrency.currencyCode
        tmpRestObject.description = pCurrency.description

        tmpRestObject

    }

    def static from(BillStateType pBillState, boolean isDeep){
        def tmpRestObject = new BillStateTypeRespREST()
        tmpRestObject.id = pBillState.id
        tmpRestObject.code = pBillState.code
        tmpRestObject.description = pBillState.description
        tmpRestObject
    }

    def static from(BillPaymentType pBillPayment, boolean isDeep){
        def tmpRestObject = new BillPaymentTypeRespREST()
        tmpRestObject.id = pBillPayment.id
        tmpRestObject.code = pBillPayment.code
        tmpRestObject.description = pBillPayment.description
        tmpRestObject
    }

    def static from(ExchangeRate pExchangeRate, boolean isDeep){
        def tmpRestObject = new ExchangeRateRespREST()
        tmpRestObject.id = pExchangeRate.id
        tmpRestObject.code = pExchangeRate.code
        tmpRestObject.description = pExchangeRate.description
        tmpRestObject.value = pExchangeRate.value
        tmpRestObject.currency = from(pExchangeRate.currency, true)

        tmpRestObject
    }

    def static from(Payment pPayment, boolean isDeep){
        def tmpRestObject = new PaymentRespREST()
            tmpRestObject.id = pPayment.id
            tmpRestObject.bankAccount = pPayment.bankAccount
            tmpRestObject.bankReceipt = pPayment.bankReceipt
            tmpRestObject.amount = pPayment.amount
            tmpRestObject.paymentDate = pPayment.paymentDate
            tmpRestObject.billId = pPayment.bill.id
            tmpRestObject.enabled = pPayment.enabled
            tmpRestObject.observation = pPayment.observation
            tmpRestObject.paymentType = pPayment.paymentType
        tmpRestObject
    }

    def static from(CreditCondition pCreditCondition, boolean isDeep){
        def tmpRestObject = new CreditConditionRespREST()
            tmpRestObject.id = pCreditCondition.id
            tmpRestObject.code = pCreditCondition.code
            tmpRestObject.description = pCreditCondition.description
            tmpRestObject.days = pCreditCondition.days
        tmpRestObject
    }

    def static from(BillDetail pBillDetail, boolean isDeep){
        def tmpRestObject = new BillDetailRespREST()
            tmpRestObject.id = pBillDetail.id
            tmpRestObject.billId = pBillDetail.bill.id
            tmpRestObject.product = fromBillDetailProduct(pBillDetail.product)
            tmpRestObject.quantity = pBillDetail.quantity
            tmpRestObject.linePrice = pBillDetail.linePrice
            tmpRestObject.discountPercentage = pBillDetail.discountPercentage
            tmpRestObject.totalDiscount = pBillDetail.totalDiscount
            tmpRestObject.totalTaxAmount = pBillDetail.totalTaxAmount
            tmpRestObject.taxPercentage = pBillDetail.taxPercentage
            tmpRestObject.subTotal = pBillDetail.subTotal
            tmpRestObject.total = pBillDetail.total
            tmpRestObject.enabled = pBillDetail.enabled
        tmpRestObject
    }

    def static from(ProductType pProductType, boolean isDeep){
        def tmpRestObject = new ProductTypeRespREST()
            tmpRestObject.name = pProductType.name
            tmpRestObject.enabled = pProductType.enabled
            tmpRestObject.registrationDate = pProductType.registrationDate
            tmpRestObject.id = pProductType.id

        tmpRestObject
    }

    def static from(Product pProduct, boolean isDeep){
        def tmpRestObject = new ProductRespREST()

            tmpRestObject.name = pProduct.name
            tmpRestObject.enabled = pProduct.enabled
            tmpRestObject.registrationDate = pProduct.registrationDate
            tmpRestObject.id = pProduct.id
            tmpRestObject.productCode = pProduct.productCode
            tmpRestObject.presentationType = from(pProduct.presentationType, true)
            tmpRestObject.bulkQuantity = pProduct.bulkQuantity
            tmpRestObject.productType = from(pProduct.productType, true)
            tmpRestObject.cost = pProduct.cost
            tmpRestObject.price = pProduct.price
            tmpRestObject.suggestedCost = pProduct.suggestedCost
            tmpRestObject.tariffHeading = pProduct.tariffHeading
            tmpRestObject.commercialName = pProduct.commercialName
            tmpRestObject.utilityPercentage = pProduct.utilityPercentage
            tmpRestObject.productTax = pProduct.productTax
            tmpRestObject.measureUnit = from(pProduct.measureUnit, true)
        tmpRestObject
    }

    def static fromBillDetailProduct(Product pProduct, boolean isDeep){
        def tmpRestObject = new BillDetailProductRespREST()
        tmpRestObject.name = pProduct.name
        tmpRestObject.id = pProduct.id
        tmpRestObject.productCode = pProduct.productCode
        tmpRestObject.price = pProduct.price
        tmpRestObject
    }

    def static from(PresentationType pPresentationType, boolean isDeep){
        def tmpRestObject = new PresentationTypeRespREST()
            tmpRestObject.name = pPresentationType.name
            tmpRestObject.enabled = pPresentationType.enabled
            tmpRestObject.registrationDate = pPresentationType.registrationDate
            tmpRestObject.id = pPresentationType.id

        tmpRestObject
    }

    def static from(IdentificationType pIdentificationType, boolean isDeep){
        def tmpRestObject = new IdentificationTypeRespREST()
            tmpRestObject.name = pIdentificationType.name
            tmpRestObject.enabled = pIdentificationType.enabled
            tmpRestObject.registrationDate = pIdentificationType.registrationDate
            tmpRestObject.code = pIdentificationType.code
            tmpRestObject.id = pIdentificationType.id

        tmpRestObject
    }

    def static from(CustomerType pCustomerType, boolean isDeep){
        def tmpRestObject = new CustomerTypeRespREST()
            tmpRestObject.name = pCustomerType.name
            tmpRestObject.enabled = pCustomerType.enabled
            tmpRestObject.registrationDate = pCustomerType.registrationDate
            tmpRestObject.id = pCustomerType.id
        tmpRestObject
    }

    def static from(MeasureUnit pMeasureType, boolean isDeep){
        def tmpMeasureTypeObj = new MeasureUnitREST()
        tmpMeasureTypeObj.name = pMeasureType.name
        tmpMeasureTypeObj.enabled = pMeasureType.enabled
        tmpMeasureTypeObj.registrationDate = pMeasureType.registrationDate
        tmpMeasureTypeObj.code = pMeasureType.code
        tmpMeasureTypeObj.id = pMeasureType.id
        tmpMeasureTypeObj
    }

    def static listFrom(def pListObject, def isDeep){
        def tmpList = new ArrayList()
        pListObject.each{
            tmpList.add(from(it, isDeep))
        }
        tmpList
    }

    //used for null params
    def static from(def pNull){
        pNull
    }
}
