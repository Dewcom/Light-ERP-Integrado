package com.dewcom.light.utils

import com.dewcom.light.billing.Bill
import com.dewcom.light.billing.BillDetail
import com.dewcom.light.billing.BillPaymentType
import com.dewcom.light.billing.BillStateType
import com.dewcom.light.billing.CreditCondition
import com.dewcom.light.billing.Currency
import com.dewcom.light.billing.ExchangeRate
import com.dewcom.light.billing.Payment
import com.dewcom.light.rest.response.AddressRespREST
import com.dewcom.light.rest.billing.BillDetailProductResponse
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
import com.dewcom.light.rest.warehouse.MeasureUnitRespREST
import com.dewcom.light.rest.response.PaymentRespREST
import com.dewcom.light.rest.warehouse.PresentationTypeRespREST
import com.dewcom.light.rest.warehouse.ProductLotRespREST
import com.dewcom.light.rest.warehouse.ProductRespREST
import com.dewcom.light.rest.warehouse.ProductTypeRespREST
import com.dewcom.light.rest.warehouse.StorehouseRespREST
import com.dewcom.light.rest.warehouse.WarehouseOrderDetailResp
import com.dewcom.light.rest.warehouse.WarehouseOrderResp
import com.dewcom.light.thirdparty.Address
import com.dewcom.light.thirdparty.Contact
import com.dewcom.light.thirdparty.Customer
import com.dewcom.light.thirdparty.CustomerType
import com.dewcom.light.thirdparty.IdentificationType
import com.dewcom.light.warehouse.MeasureUnit
import com.dewcom.light.warehouse.PresentationType
import com.dewcom.light.warehouse.Product
import com.dewcom.light.warehouse.ProductLot
import com.dewcom.light.warehouse.ProductType
import com.dewcom.light.warehouse.Storehouse
import com.dewcom.light.warehouse.WarehouseOrder
import com.dewcom.light.warehouse.WarehouseOrderMovementType
import com.dewcom.light.warehouse.WarehouseOrderStateType

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
        def tmpRestObject = new ProductTypeRespREST()
            tmpRestObject.name = pProductType.name
            tmpRestObject.enabled = pProductType.enabled
            tmpRestObject.registrationDate = pProductType.registrationDate
            tmpRestObject.id = pProductType.id

        tmpRestObject
    }

    def static from(Product pProduct){
        def tmpRestObject = new ProductRespREST()

        tmpRestObject.name = pProduct.name
        tmpRestObject.enabled = pProduct.enabled
        tmpRestObject.registrationDate = pProduct.registrationDate
        tmpRestObject.id = pProduct.id
        tmpRestObject.productCode = pProduct.productCode
        tmpRestObject.presentationType = from(pProduct.presentationType)
        tmpRestObject.bulkQuantity = pProduct.bulkQuantity
        tmpRestObject.productType = from(pProduct.productType)
        tmpRestObject.cost = pProduct.cost
        tmpRestObject.price = pProduct.price
        tmpRestObject.suggestedCost = pProduct.suggestedCost
        tmpRestObject.tariffHeading = pProduct.tariffHeading
        tmpRestObject.commercialName = pProduct.commercialName
        tmpRestObject.utilityPercentage = pProduct.utilityPercentage
        tmpRestObject.productTax = pProduct.productTax
        tmpRestObject.measureUnit = from(pProduct.measureUnit)
        tmpRestObject.productLots = listFromProductLotForProduct(pProduct.productLot)
        tmpRestObject
    }

    def static fromWarehouseDetailToProduct(Product pProduct){
        def tmpRestObject = new ProductRespREST()

        tmpRestObject.name = pProduct.name
        tmpRestObject.enabled = pProduct.enabled
        tmpRestObject.registrationDate = pProduct.registrationDate
        tmpRestObject.id = pProduct.id
        tmpRestObject.productCode = pProduct.productCode
        tmpRestObject.presentationType = from(pProduct.presentationType)
        tmpRestObject.bulkQuantity = pProduct.bulkQuantity
        tmpRestObject.productType = from(pProduct.productType)
        tmpRestObject.cost = pProduct.cost
        tmpRestObject.price = pProduct.price
        tmpRestObject.suggestedCost = pProduct.suggestedCost
        tmpRestObject.tariffHeading = pProduct.tariffHeading
        tmpRestObject.commercialName = pProduct.commercialName
        tmpRestObject.utilityPercentage = pProduct.utilityPercentage
        tmpRestObject.productTax = pProduct.productTax
        tmpRestObject.measureUnit = from(pProduct.measureUnit)
        tmpRestObject
    }

    /**
     * Metodo alternativo para crear los productos asociados a los lotes de producto de un detalle de orden de salida de bodega,
     * de lo contrario el lote perteneciente al lote de producto traerá cada lote de producto asociado a producto
     */
    def static fromWarehouseDetailToProductLot(ProductLot productLot){
        def tmpRestObject = new ProductLotRespREST()
        tmpRestObject.id = productLot.id
        tmpRestObject.lotNumber = productLot.lotNumber
        tmpRestObject.expirationDate = productLot.expirationDate
        tmpRestObject.lotDate = productLot.lotDate
        tmpRestObject.quantity = productLot.quantity
        tmpRestObject.product = fromWarehouseDetailToProduct(productLot.product)
        tmpRestObject.enabled = productLot.enabled
        tmpRestObject.registrationDate = productLot.registrationDate

        tmpRestObject
    }

    def static from(ProductLot productLot){
        def tmpRestObject = new ProductLotRespREST()
        tmpRestObject.id = productLot.id
        tmpRestObject.lotNumber = productLot.lotNumber
        tmpRestObject.expirationDate = productLot.expirationDate
        tmpRestObject.lotDate = productLot.lotDate
        tmpRestObject.quantity = productLot.quantity
        tmpRestObject.product = from(productLot.product)
        tmpRestObject.enabled = productLot.enabled
        tmpRestObject.registrationDate = productLot.registrationDate

        tmpRestObject
    }

    def static from(WarehouseOrder warehouseOrder){
        def tmpRestObject = new WarehouseOrderResp()
        tmpRestObject.id = warehouseOrder.id
        tmpRestObject.enabled = warehouseOrder.enabled
        tmpRestObject.warehouseOrderDate = warehouseOrder.warehouseOrderDate
        tmpRestObject.warehouseOrderStateType = from(warehouseOrder.warehouseOrderStateType)
        tmpRestObject.warehouseOrderMovementType = from(warehouseOrder.warehouseOrderMovementType)
        tmpRestObject.bill = from(warehouseOrder.bill)
        tmpRestObject.warehouseOrderDetails = listFromWarehouseOrderDetailForWarehouseOrder(warehouseOrder.warehouseOrderDetails)

        tmpRestObject
    }

    def static from(Storehouse storehouse){
        def tmpRestObject = new StorehouseRespREST()
        tmpRestObject.id = storehouse.id
        tmpRestObject.name = storehouse.name
        tmpRestObject.address = storehouse.address
        tmpRestObject.enabled = storehouse.enabled
        tmpRestObject.registrationDate = storehouse.registrationDate
        tmpRestObject.productLots = listFromFilterDisable(storehouse.productLots)

        tmpRestObject
    }

    def static fromBillDetailProduct(Product pProduct){
        def tmpRestObject = new BillDetailProductResponse()
        tmpRestObject.name = pProduct.name
        tmpRestObject.id = pProduct.id
        tmpRestObject.productCode = pProduct.productCode
        tmpRestObject.price = pProduct.price

        tmpRestObject
    }

    def static from(PresentationType pPresentationType){
        def tmpRestObject = new PresentationTypeRespREST()
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

    def static from(MeasureUnit pMeasureType){
        def tmpMeasureTypeObj = new MeasureUnitRespREST()
        tmpMeasureTypeObj.name = pMeasureType.name
        tmpMeasureTypeObj.symbol = pMeasureType.symbol
        tmpMeasureTypeObj.enabled = pMeasureType.enabled
        tmpMeasureTypeObj.registrationDate = pMeasureType.registrationDate
        tmpMeasureTypeObj.code = pMeasureType.code
        tmpMeasureTypeObj.id = pMeasureType.id
        tmpMeasureTypeObj
    }

    def static from(WarehouseOrderStateType pWarehouseOrderStateType){
        def tmpWarehouseOrderStateTypeObj = new WarehouseOrderStateType()
        tmpWarehouseOrderStateTypeObj.code = pWarehouseOrderStateType.code
        tmpWarehouseOrderStateTypeObj.description = pWarehouseOrderStateType.description
        tmpWarehouseOrderStateTypeObj
    }

    def static from(WarehouseOrderMovementType pWarehouseOrderMovementType){
        def tmpWarehouseOrderMovementTypeObj = new WarehouseOrderMovementType()
        tmpWarehouseOrderMovementTypeObj.code = pWarehouseOrderMovementType.code
        tmpWarehouseOrderMovementTypeObj.description = pWarehouseOrderMovementType.description
        tmpWarehouseOrderMovementTypeObj
    }

    def static listFrom(def pListObject){
        def tmpList = new ArrayList()
        pListObject.each{ it ->
            tmpList.add(from(it))
        }
        tmpList
    }

    /**
     * Metodo alternativo para poder filtrar objetos disabled con relacion a un objeto principal
     */
    def static listFromFilterDisable(def pListObject){
        def tmpList = new ArrayList()
        pListObject.each{ it ->
            if(it.enabled == Constants.ESTADO_ACTIVO){
                tmpList.add(from(it))
            }
        }
        tmpList
    }

    /**
     * Metodo alternativo para asociar lotes de producto al producto sin que el lote a su vez traiga de nuevo el producto asociado
     */
    def static listFromProductLotForProduct(def pListObject){
        def tmpList = new ArrayList()
        pListObject.each{ it ->
            if(it.enabled == Constants.ESTADO_ACTIVO){

                def tmpRestObject = new ProductLotRespREST()
                tmpRestObject.id = it.id
                tmpRestObject.lotNumber = it.lotNumber
                tmpRestObject.expirationDate = it.expirationDate
                tmpRestObject.lotDate = it.lotDate
                tmpRestObject.quantity = it.quantity
                tmpRestObject.enabled = it.enabled
                tmpRestObject.registrationDate = it.registrationDate
                tmpList.add(tmpRestObject)
            }
        }
        tmpList
    }

    /**
     * Metodo alternativo para asociar los detalles de orden de bodega a una orden de bodega
     */
    def static listFromWarehouseOrderDetailForWarehouseOrder(def pListObject){
        def tmpList = new ArrayList()
        pListObject.each{ it ->
            if(it.enabled == Constants.ESTADO_ACTIVO){

                def tmpRestObject = new WarehouseOrderDetailResp()
                tmpRestObject.productLot = fromWarehouseDetailToProductLot(it.productLot)
                tmpRestObject.quantity = it.quantity
                tmpRestObject.enabled = it.enabled
                tmpList.add(tmpRestObject)
            }
        }
        tmpList
    }



    //used for null params
    def static from(def pNull1){
        pNull1
    }
}
