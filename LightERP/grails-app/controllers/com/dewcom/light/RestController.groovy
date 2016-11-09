package com.dewcom.light

import com.dewcom.light.rest.FieldErrorREST
import com.dewcom.light.rest.ResponseREST
import grails.converters.JSON
import org.grails.web.json.JSONArray
import org.grails.web.json.JSONObject
import org.springframework.validation.Errors
import org.springframework.validation.FieldError

import java.lang.reflect.UndeclaredThrowableException

class RestController {

    protected void handleRESTExceptions(def messageSource, Exception e) {
        log.error("Error en llamada REST")
        ResponseREST tmpResponse = new ResponseREST()

        if (e instanceof UndeclaredThrowableException) {
            e = e.getUndeclaredThrowable()
        }

        tmpResponse.message = e.systemMessage
        tmpResponse.code = Constants.ERROR_UNDECLARED_EXCEPTION

        log.info "=======Response con errores======="
        log.info tmpResponse as JSON
        render tmpResponse as JSON
    }

    protected void handleDataErrorsREST(def messageSource, Errors errors) {
        FieldError fieldError = errors.fieldError
        JSONObject errorObj = new JSONObject()
        ResponseREST respTemporal = new ResponseREST()

        if (fieldError) {

            JSONArray tpmErrorList = new JSONArray()

            for (error in errors.allErrors) {

                FieldErrorREST errorCampoREST = new FieldErrorREST()
                errorCampoREST.errorCode = getValidationErrorCode(error.code)
                errorCampoREST.message = error.defaultMessage
                errorCampoREST.field = error.field

                tpmErrorList.put(errorCampoREST)
            }

            errorObj.put("errors", tpmErrorList)

            respTemporal.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            respTemporal.message = messageSource.getMessage("default.general.validation.error", null, Locale.default)
            respTemporal.data = errorObj
            render respTemporal as JSON

        } else {
            respTemporal.code = Constants.ERROR_RESPONSE_CON_ERRORES
            respTemporal.message = messageSource.getMessage("rest.error.response.con.errores", null, Locale.default)
            respTemporal.data = errors.allErrors[0]
            log.error "Error verificando entidad : " + respTemporal.data
            log.info "=======Response con errores======="
            log.info respTemporal as JSON
            render respTemporal as JSON
        }
    }

    private String getValidationErrorCode(def code) {
        def errorCode

        switch (code) {
            case Constants.ERROR_VALIDACION_DE_CAMPOS_VACIOS_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_VACIOS; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_BLANK_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_BLANK; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_MAX_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_MAX; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_TAMANO_MAX_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_TAMANO_MAX; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_EMAIL_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_EMAIL; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_TAMANO_EXCEDIDO_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_TAMANO_EXCEDIDO; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_TAMANO_MIN_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_TAMANO_MIN; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_NO_EN_LISTA_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_NO_EN_LISTA; break;
            case Constants.ERROR_VALIDACION_DE_CAMPOS_VALOR_UNICO_ORIG: errorCode = Constants.ERROR_VALIDACION_DE_CAMPOS_VALOR_UNICO; break;
            default: errorCode = "Error desconocido";
        }

        return errorCode
    }
}
