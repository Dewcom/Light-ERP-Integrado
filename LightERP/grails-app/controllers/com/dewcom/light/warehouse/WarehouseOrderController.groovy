package com.dewcom.light.warehouse

import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.RestController
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class WarehouseOrderController extends RestController {

    def messageSource
    def billService

    /**
     * Este método se encarga de obtener una lista de ordenes de salida de bodega por medio de un id
     * @author Mauricio Fernandez
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
    }
}
