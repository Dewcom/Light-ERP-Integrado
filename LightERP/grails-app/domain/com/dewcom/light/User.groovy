package com.dewcom.light

import com.dewcom.light.billing.Bill
import com.dewcom.light.rest.user.UserRequest
import com.dewcom.light.utils.Constants
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class User implements Serializable {

	private static final long serialVersionUID = 1

	transient springSecurityService

	String username
	String password
	Byte enabled = Constants.ESTADO_ACTIVO
	Date registrationDate = new Date()
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired


	static hasMany = [bills: Bill]

	String userCode
	String name
	String firstLastName
	String secondLastName
	String email
	String mobile
	String phoneNumber
	String extension
	Double commissionPercentage


	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this)*.role
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}

	static transients = ['springSecurityService']

	static constraints = {
		password blank: false, password: true
		username blank: false, unique: true
        userCode blank: false, nullable: false, maxSize: 5
        name blank: false
        firstLastName blank: true, nullable: true
        secondLastName blank: true, nullable: true
        phoneNumber blank: false
        extension blank: true, nullable: true
        mobile nullable: true, blank: true
        email nullable: true, blank: true
        commissionPercentage blank: true, nullable: true
	}

	static mapping = {
		password column: '`password`'
	}


    def static fromRestUser(UserRequest prestUser){

        User tmpUser = new User();

		tmpUser.username = prestUser.username;
        tmpUser.password = prestUser.password;
		tmpUser.userCode = prestUser.userCode;
        tmpUser.name = prestUser.name;
        tmpUser.firstLastName = prestUser.firstLastName;
        tmpUser.secondLastName = prestUser.secondLastName;
        tmpUser.email = prestUser.email;
        tmpUser.mobile = prestUser.mobile;
        tmpUser.phoneNumber = prestUser.phoneNumber;
        tmpUser.extension = prestUser.extension;
        tmpUser.commissionPercentage = prestUser.commissionPercentage;

        return tmpUser;
    }
}
