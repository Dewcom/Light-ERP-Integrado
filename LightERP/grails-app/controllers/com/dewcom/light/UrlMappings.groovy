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
        get "/api/currency"(controller: 'currency', action: 'getAll')
        get "/api/exchangeRate"(controller: 'exchangeRate', action: 'get')

        post "/api/billPaymentType"(controller: 'billPaymentType', action: 'create')
        post "/api/billStateType"(controller: 'billStateType', action: 'create')
        post "/api/creditCondition"(controller: 'creditCondition', action: 'create')
        post "/api/currency"(controller: 'currency', action: 'create')
        post "/api/exchangeRate"(controller: 'exchangeRate', action: 'create')
    }
}
