package com.dewcom.light.user

import com.dewcom.light.utils.Constants
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.user.UpdateUserRequest
import grails.transaction.Transactional

@Transactional
class UserService {

    def messageSource

    User getUser(def puserId) {
        log.info "====== Getting user from DB ======"
        log.info puserId
        try {
            User userFromDB = User.findByIdAndEnabled(puserId, Constants.ESTADO_ACTIVO);
            return userFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.user.error", null, Locale.default));
        }
    }

    def getByUsername(def username) {
        log.info "====== Getting user from DB  by username======"
        log.info username
        try {
            User userFromDB = User.findByUsernameAndEnabled(username, Constants.ESTADO_ACTIVO);
            return userFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.user.error", null, Locale.default));
        }
    }


    def getAllUsers() {
        log.info "====== Getting all users from DB ======"
        try {
            def usersFromDB = User.findAllByEnabled(Constants.ESTADO_ACTIVO);
            return usersFromDB
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("get.all.users.error", null, Locale.default));
        }
    }

    def createUser(User puser) {
        log.info "====== Creating user ======"
        log.info puser
        try {

            puser.save(flush: true, failOnError: true)
            def roleUser = Role.findByAuthority(Role.ROLE_USER)
            UserRole.create(puser, roleUser)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.user.error", null, Locale.default));
        }
    }

    def deleteUser(User puser) {
        try {
            puser.enabled = Constants.ESTADO_INACTIVO;
            puser.save(flush: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("delete.user.error", null, Locale.default));
        }
    }

    def updateUser(UpdateUserRequest prestUser) {
        log.info "====== Updating user ======"
        try {
            User tmpUserToUpdate = User.findByIdAndEnabled(prestUser.id, Constants.ESTADO_ACTIVO)
            if (tmpUserToUpdate) {

                tmpUserToUpdate.username = prestUser.username == null ? tmpUserToUpdate.username : prestUser.username;
                tmpUserToUpdate.password = prestUser.password == null ? tmpUserToUpdate.password : prestUser.password;
                tmpUserToUpdate.userCode = prestUser.userCode == null ? tmpUserToUpdate.userCode : prestUser.userCode;
                tmpUserToUpdate.name = prestUser.name == null ? tmpUserToUpdate.name : prestUser.name;
                tmpUserToUpdate.firstLastName = prestUser.firstLastName == null ? tmpUserToUpdate.firstLastName : prestUser.firstLastName;
                tmpUserToUpdate.secondLastName = prestUser.secondLastName == null ? tmpUserToUpdate.secondLastName : prestUser.secondLastName;
                tmpUserToUpdate.phoneNumber = prestUser.phoneNumber == null ? tmpUserToUpdate.phoneNumber : prestUser.phoneNumber;
                tmpUserToUpdate.extension = prestUser.extension == null ? tmpUserToUpdate.extension : prestUser.extension;
                tmpUserToUpdate.mobile = prestUser.mobile == null ? tmpUserToUpdate.mobile : prestUser.mobile;
                tmpUserToUpdate.email = prestUser.email == null ? tmpUserToUpdate.email : prestUser.email;
                tmpUserToUpdate.commissionPercentage = prestUser.commissionPercentage == null ? tmpUserToUpdate.commissionPercentage : prestUser.commissionPercentage;

                tmpUserToUpdate.save(flush: true);
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.user.notFound.error", null, Locale.default));
            }
        }

        catch (Exception e) {
            log.error(e);
            if (e instanceof LightRuntimeException) {
                throw e;
            } else {
                throw new LightRuntimeException(messageSource.getMessage("update.User.error", null, Locale.default));
            }
        }
    }
}
