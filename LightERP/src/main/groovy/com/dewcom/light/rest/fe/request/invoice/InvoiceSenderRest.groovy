package com.dewcom.light.rest.fe.request.invoice

import com.dewcom.light.rest.fe.request.IdentificationRest
import com.dewcom.light.rest.fe.request.LocationRest

/**
 * Created by lchen on 10/2/18.
 */
class InvoiceSenderRest {
    String name
    IdentificationRest identification
    String commercialName
    LocationRest location
}
