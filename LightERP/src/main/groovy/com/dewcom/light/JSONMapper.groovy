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
import com.dewcom.light.rest.response.PaymentRespREST
import com.dewcom.light.rest.response.PresentationTypeRespREST
import com.dewcom.light.rest.response.ProductRespREST
import com.dewcom.light.rest.response.ProductTypeRespREST

/**
 * Created by lchen on 5/20/17.
 */
class JSONMapper {

    def static from(Customer pCustomer){
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
        tmpRestObject.identificationType = from(pCustomer.identificationType)
        tmpRestObject.enabled = pCustomer.enabled
        tmpRestObject.customerType = from(pCustomer.customerType)
        tmpRestObject.contacts = listFrom(pCustomer.contacts)
        tmpRestObject.addresses = listFrom(pCustomer.addresses)
        tmpRestObject.registrationDate = pCustomer.registrationDate

        tmpRestObject
    }

    def static from(Contact pContact){
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



    def static from(Address pAddress){
        def tmpRestObject = new AddressRespREST()
        tmpRestObject.id = pAddress.id
        tmpRestObject.idDistrict = pAddress.idDistrict
        tmpRestObject.address = pAddress.address
        tmpRestObject.customerId = pAddress.customer.id
        tmpRestObject.enabled = pAddress.enabled

        tmpRestObject
    }



    def static from(Bill pBill){
        def tmpRestObject = new BillRespREST()
        tmpRestObject.id = pBill.id
        tmpRestObject.currency = from(pBill.currency)
        tmpRestObject.billState = from(pBill.billState)
        tmpRestObject.billPaymentType = from(pBill.billPaymentType)
        tmpRestObject.creditCondition = from(pBill.creditCondition)
        tmpRestObject.address = from(pBill.address)
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
        tmpRestObject.billDetails = listFrom(pBill.billDetails)
        tmpRestObject.payments = listFrom(pBill.payments)
        tmpRestObject.customer = from(pBill.customer)

        tmpRestObject
    }


    def static from(Currency pCurrency){
        def tmpRestObject = new CurrencyRespREST()
        tmpRestObject.id = pCurrency.id
        tmpRestObject.currencyCode = pCurrency.currencyCode
        tmpRestObject.description = pCurrency.description

        tmpRestObject

    }


    def static from(BillStateType pBillState){
        def tmpRestObject = new BillStateTypeRespREST()
        tmpRestObject.id = pBillState.id
        tmpRestObject.code = pBillState.code
        tmpRestObject.description = pBillState.description
        tmpRestObject
    }



    def static from(BillPaymentType pBillPayment){
        def tmpRestObject = new BillPaymentTypeRespREST()
        tmpRestObject.id = pBillPayment.id
        tmpRestObject.code = pBillPayment.code
        tmpRestObject.description = pBillPayment.description
        tmpRestObject
    }


    def static from(ExchangeRate pExchangeRate){
        def tmpRestObject = new ExchangeRateRespREST()
        tmpRestObject.id = pExchangeRate.id
        tmpRestObject.code = pExchangeRate.code
        tmpRestObject.description = pExchangeRate.description
        tmpRestObject.value = pExchangeRate.value
        tmpRestObject.currency = from(pExchangeRate.currency)

        tmpRestObject
    }

    def static from(Payment pPayment){
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


    def static from(CreditCondition pCreditCondition){
        def tmpRestObject = new CreditConditionRespREST()
            tmpRestObject.id = pCreditCondition.id
            tmpRestObject.code = pCreditCondition.code
            tmpRestObject.description = pCreditCondition.description
            tmpRestObject.days = pCreditCondition.days
        tmpRestObject
    }


    def static from(BillDetail pBillDetail){
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

    def static from(ProductType pProductType){
        def  tmpRestObject = new ProductTypeRespREST()
            tmpRestObject.name = pProductType.name
            tmpRestObject.enabled = pProductType.enabled
            tmpRestObject.registrationDate = pProductType.registrationDate
            tmpRestObject.id = pProductType.id

        tmpRestObject
    }


    def static from(Product pProduct){
        def  tmpRestObject = new ProductRespREST()

            tmpRestObject.name = pProduct.name
            tmpRestObject.enabled = pProduct.enabled
            tmpRestObject.registrationDate = pProduct.registrationDate
            tmpRestObject.id = pProduct.id
            tmpRestObject.productCode = pProduct.productCode
            tmpRestObject.presentationType = from(pProduct.presentationType)
            tmpRestObject.bulkQuantity = pProduct.bulkQuantity
            tmpRestObject.productType = from(pProduct.productType)
            tmpRestObject.costInColones = pProduct.costInColones
            tmpRestObject.costInDollars = pProduct.costInDollars
            tmpRestObject.priceInColones = pProduct.priceInColones
            tmpRestObject.priceInDollars = pProduct.priceInDollars
            tmpRestObject.suggestedCost = pProduct.suggestedCost
            tmpRestObject.tariffHeading = pProduct.tariffHeading
            tmpRestObject.commercialName = pProduct.commercialName
            tmpRestObject.utilityPercentage = pProduct.utilityPercentage
            tmpRestObject.salesTax = pProduct.salesTax
        tmpRestObject
    }



    def static fromBillDetailProduct(Product pProduct){
        def  tmpRestObject = new BillDetailProductRespREST()
        tmpRestObject.name = pProduct.name
        tmpRestObject.id = pProduct.id
        tmpRestObject.productCode = pProduct.productCode
        tmpRestObject.priceInColones = pProduct.priceInColones
        tmpRestObject.priceInDollars = pProduct.priceInDollars
        tmpRestObject
    }


    def static from(PresentationType pPresentationType){
        def  tmpRestObject = new PresentationTypeRespREST()
            tmpRestObject.name = pPresentationType.name
            tmpRestObject.enabled = pPresentationType.enabled
            tmpRestObject.registrationDate = pPresentationType.registrationDate
            tmpRestObject.id = pPresentationType.id

        tmpRestObject
    }


    def static from(IdentificationType pIdentificationType){
        def tmpRestObject = new IdentificationTypeRespREST()
            tmpRestObject.name = pIdentificationType.name
            tmpRestObject.enabled = pIdentificationType.enabled
            tmpRestObject.registrationDate = pIdentificationType.registrationDate
            tmpRestObject.code = pIdentificationType.code
            tmpRestObject.id = pIdentificationType.id

        tmpRestObject
    }


    def static from(CustomerType pCustomerType){
        def tmpRestObject = new CustomerTypeRespREST()
            tmpRestObject.name = pCustomerType.name
            tmpRestObject.enabled = pCustomerType.enabled
            tmpRestObject.registrationDate = pCustomerType.registrationDate
            tmpRestObject.id = pCustomerType.id
        tmpRestObject
    }


    def static listFrom(def pListObject){
        def tmpList = new ArrayList()
        pListObject.each{
            tmpList.add(from(it))
        }
        tmpList
    }

    //used for null params
    def static from(def pNull){
        pNull
    }
}
