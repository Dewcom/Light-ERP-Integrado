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

    }
}
