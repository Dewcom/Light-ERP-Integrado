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
    }
}
