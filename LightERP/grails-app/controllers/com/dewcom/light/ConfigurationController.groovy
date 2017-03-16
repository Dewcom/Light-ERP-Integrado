package com.dewcom.light

import com.dewcom.light.rest.ResponseREST
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class ConfigurationController extends RestController {

    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def adminService
    def billService

    /**
     * Este método se encarga de obtener las configuraciones o una especifica
     * id es suministrado como parámetro
     * @author Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get configuration  request =====+++====="
        ResponseREST tmpResponse = new ResponseREST();
        try {
            def tmpId = params.id

            if(tmpId){
                Configuration config = adminService.getConfiguration(tmpId);

                if(config){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = config
                }else{
                    tmpResponse.message = messageSource.getMessage("configuration.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def configurations = adminService.getAllConfigurations();

                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = configurations
            }
            log.info "====== Get configuration  response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear una configuracion
     * @author Chen
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create configuration  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        Configuration tmpConfiguration = new Configuration(request.JSON);
        try {
            tmpConfiguration.validate();
            if (tmpConfiguration.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpConfiguration.errors);
            } else {
                adminService.createConfiguration(tmpConfiguration);

                tmpResponse.message = messageSource.getMessage("create.configuration.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create configuration  response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) una configuracion
     * @author leo
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete configuration  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null) {
                Configuration tmpConfig = adminService.getConfiguration(request.JSON.id);

                if(tmpConfig) {
                    adminService.deleteConfiguration(tmpConfig);
                    tmpResponse.message = messageSource.getMessage("delete.configuration.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("configuration.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete configuration  response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar una configuracion
     * @author Leo chen
     * @param name
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update configuration  request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        Configuration tmpConfigurationRest = new Configuration(request.JSON);
        try {
            tmpConfigurationRest.validate();
            if (tmpConfigurationRest.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpConfigurationRest.errors);
            } else {
                Configuration tmpConfiguration = adminService.getCustomerType(tmpConfigurationRest.id);
                if(tmpConfiguration.code == Constants.CONFIG_CONSECUTIVO_FACTURA) {
                    billService.validateBillNumber(tmpConfiguration.value as Long)
                }

                if(tmpConfiguration) {
                    tmpConfiguration.value = tmpConfigurationRest.value
                    tmpConfiguration.description = tmpConfigurationRest.description
                    tmpConfiguration.code = tmpConfigurationRest.code
                    adminService.updateConfiguration(tmpConfiguration);
                    tmpResponse.message = messageSource.getMessage("update.configuration.success", null, Locale.default)
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("configuration.not.found", null, Locale.default)
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }
            log.info "====== Update configuration response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
