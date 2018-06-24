package com.dewcom.light

class UrlMappings {

    static mappings = {
        "/api/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: 'application', action: 'index')
        "500"(view: '/error')
        "404"(view: '/notFound')

        get "/api/customer/contacts"(controller: 'customer', action: 'getCustomerContacts')
        get "/api/customer/addresses"(controller: 'customer', action: 'getCustomerAddresses')
        get "/api/bill/billNumber"(controller: 'bill', action: 'generateBillNumber')
        post "/api/bill"(controller: 'bill', action: 'create')
        put "/api/bill/$billId"(controller: 'bill', action: 'update')
        get "/api/bill"(controller: 'bill', action: 'get')
        //payments
        put "/api/payment/$paymentId"(controller: 'payment', action: 'update')
        post "/api/payment"(controller: 'payment', action: 'create')
        delete "/api/payment/$paymentId"(controller: 'payment', action: 'delete')
        get "/api/payment/$paymentId"(controller: 'payment', action: 'get')
        get "/api/payment"(controller: 'payment', action: 'get')
        //mantenimientos catalogo
        get "/api/billPaymentType"(controller: 'billPaymentType', action: 'getAll')
        get "/api/billStateType"(controller: 'billStateType', action: 'getAll')
        get "/api/creditCondition"(controller: 'creditCondition', action: 'getAll')
        put "/api/creditCondition/$id"(controller: 'creditCondition', action: 'update')
        delete "/api/creditCondition/$id"(controller: 'creditCondition', action: 'delete')
        get "/api/currency"(controller: 'currency', action: 'getAll')
        get "/api/exchangeRate"(controller: 'exchangeRate', action: 'get')
        put "/api/exchangeRate/$code"(controller: 'exchangeRate', action: 'updateExchangeRate')
        get  "/api/exchangeRate/$code"(controller: 'exchangeRate', action: 'getExchangeRateByCode')
        get  "/api/tax"(controller: 'tax', action: 'get')
        post  "/api/tax"(controller: 'tax', action: 'create')
        put  "/api/tax/$id"(controller: 'tax', action: 'update')
        delete  "/api/tax/$id"(controller: 'tax', action: 'delete')

        get  "/api/presentationType"(controller: 'presentationType', action: 'get')
        post  "/api/presentationType"(controller: 'presentationType', action: 'create')
        put  "/api/presentationType/$id"(controller: 'presentationType', action: 'update')
        delete  "/api/presentationType/$id"(controller: 'presentationType', action: 'delete')

        get  "/api/customerType"(controller: 'customerType', action: 'get')
        post  "/api/customerType"(controller: 'customerType', action: 'create')
        put  "/api/customerType/$id"(controller: 'customerType', action: 'update')
        delete  "/api/customerType/$id"(controller: 'customerType', action: 'delete')

        get  "/api/productType"(controller: 'productType', action: 'get')
        post  "/api/productType"(controller: 'productType', action: 'create')
        put  "/api/productType/$id"(controller: 'productType', action: 'update')
        delete  "/api/productType/$id"(controller: 'productType', action: 'delete')


        get "/api/warehouseOrderMovementType"(controller: 'warehouseOrderMovementType', action: 'get')
        post "/api/warehouseOrderMovementType"(controller: 'warehouseOrderMovementType', action: 'create')
        put "/api/warehouseOrderMovementType/$id"(controller: 'warehouseOrderMovementType', action: 'update')
        delete "/api/warehouseOrderMovementType/$id"(controller: 'warehouseOrderMovementType', action: 'delete')

        //measureUnit
        get "/api/measureUnit"(controller: 'measureUnit', action: 'getAll')
        put "/api/measureUnit/$id"(controller: 'measureUnit', action: 'update')
        delete "/api/measureUnit/$id"(controller: 'measureUnit', action: 'delete')
        post "/api/measureUnit"(controller: 'measureUnit', action: 'create')

        post "/api/billPaymentType"(controller: 'billPaymentType', action: 'create')
        post "/api/billStateType"(controller: 'billStateType', action: 'create')
        post "/api/creditCondition"(controller: 'creditCondition', action: 'create')
        post "/api/currency"(controller: 'currency', action: 'create')
        post "/api/exchangeRate"(controller: 'exchangeRate', action: 'create')
        //contact
        post "/api/customer/contact"(controller: 'contact', action: 'create')

        //reports
        get "/api/customer/purchaseReport"(controller: 'customerReport', action: 'getCustomerProductPurchases')
        get "/api/customer/billingReport"(controller: 'customerReport', action: 'getCustomerBills')

        //users
        get "/api/user"(controller: 'user', action: 'get')

        //config
        put "/api/configuration/$code"(controller: 'configuration', action: 'update')
        get "/api/configuration/$code"(controller: 'configuration', action: 'get')

    }
}
