package com.dewcom.light.user

import com.dewcom.light.utils.Constants
import com.dewcom.light.User
import com.dewcom.light.rest.RestController
import com.dewcom.light.rest.user.UserRequest
import com.dewcom.light.rest.ResponseREST
import com.dewcom.light.rest.user.UpdateUserRequest
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

class UserController extends RestController{
    static allowedMethods = [get: "GET", create: "POST", update: "PUT", delete: "DELETE"]
    def messageSource
    def userService

    /**
     * Este método se encarga de obtener una lista de usuarios o uno específico por medio del ID
     * @author Mauricio Fernández Mora
     */
    @Secured(['ROLE_ANONYMOUS'])
    def get() {
        log.info "========== Get user request =========="

        ResponseREST tmpResponse = new ResponseREST();

        try {
            def tmpId = params.id

            if(tmpId){
                User userFromDB = userService.getUser(tmpId);

                if(userFromDB){
                    tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                    tmpResponse.data = userFromDB
                }else{
                    tmpResponse.message = messageSource.getMessage("user.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                def usersFromDB = userService.getAllUsers();
                tmpResponse.message = messageSource.getMessage("generic.request.success", null, Locale.default);
                tmpResponse.code = Constants.SUCCESS_RESPONSE
                tmpResponse.data = usersFromDB
            }
            log.info "====== Get user response ======"
            JSON.use('deep')
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de crear un nuevo usuario
     * @author Mauricio Fernández Mora
     * @param user
     */
    @Secured(['ROLE_ANONYMOUS'])
    def create() {
        log.info "==========  Create user request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        User tmpUser;
        UserRequest restUser = new UserRequest(request.JSON.user);
        try {
            def tmpUsernameToCheck = User.findByUsernameAndEnabled(restUser.username, Constants.ESTADO_ACTIVO)
            if(tmpUsernameToCheck){
                tmpResponse.code = Constants.ERROR_UNDECLARED_EXCEPTION
                tmpResponse.message =  messageSource.getMessage("create.user.username.nonUnique", null, Locale.default)
                render tmpResponse as JSON
                return
            }

            def tmpUserCodeToCheck = User.findByUserCodeAndEnabled(restUser.userCode, Constants.ESTADO_ACTIVO)
            if(tmpUserCodeToCheck){
                tmpResponse.code = Constants.ERROR_UNDECLARED_EXCEPTION
                tmpResponse.message =  messageSource.getMessage("create.user.userCode.nonUnique", null, Locale.default)
                render tmpResponse as JSON
                return
            }

            restUser.validate();
            if (restUser.hasErrors()) {
                this.handleDataErrorsREST(messageSource, restUser.errors);
            } else {
                tmpUser = User.fromRestUser(restUser);
                userService.createUser(tmpUser);

                tmpResponse.message = messageSource.getMessage("create.user.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE
            }
            log.info "====== Create user response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e)
        }
    }

    /**
     * Este método se encarga de borrar (Borrado lógico) un usuario
     * @author Mauricio Fernández Mora
     * @param id
     */
    @Secured(['ROLE_ANONYMOUS'])
    def delete() {
        log.info "==========  Delete user request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        try {
            if (request.JSON && request.JSON != null &&  request.JSON.id != null ) {
                User tmpUser = userService.getUser(request.JSON.id);

                if(tmpUser) {
                    userService.deleteUser(tmpUser);
                    tmpResponse.message = messageSource.getMessage("delete.user.success", null, Locale.default);
                    tmpResponse.code = Constants.SUCCESS_RESPONSE
                }else {
                    tmpResponse.message = messageSource.getMessage("user.not.found", null, Locale.default);
                    tmpResponse.code = Constants.REGISTER_NOT_FOUND
                }
            }else{
                tmpResponse.message = messageSource.getMessage("generic.request.error.missing.parameters", null, Locale.default);
                tmpResponse.code = Constants.ERROR_VALIDACION_DE_CAMPOS
            }
            log.info "====== Delete user response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        } catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }

    /**
     * Este método se encarga de modificar un usuario
     * @author Mauricio Fernández Mora
     * @param request
     */
    @Secured(['ROLE_ANONYMOUS'])
    def update() {
        log.info "==========  Update user request =========="
        log.info request.JSON

        ResponseREST tmpResponse = new ResponseREST();
        UpdateUserRequest tmpUser = new UpdateUserRequest(request.JSON);
        try {
            tmpUser.validate();
            if (tmpUser.hasErrors()) {
                this.handleDataErrorsREST(messageSource, tmpUser.errors);
            } else {
                userService.updateUser(tmpUser);
                tmpResponse.message = messageSource.getMessage("update.user.success", null, Locale.default)
                tmpResponse.code = Constants.SUCCESS_RESPONSE

            }
            log.info "====== Update user response ======"
            log.info tmpResponse as JSON
            render tmpResponse as JSON
        }catch (Exception e) {
            this.handleRESTExceptions(messageSource, e);
        }
    }
}
