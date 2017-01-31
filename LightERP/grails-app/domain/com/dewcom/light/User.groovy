package com.dewcom.light

import com.dewcom.light.rest.UserREST
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
	Date regitrationDate = new Date()
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

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


    def static fromRestAgent(UserREST prestCustomer){

        User tmpUser = new User();

		tmpUser.username = prestCustomer.username;
        tmpUser.password = prestCustomer.password;
		tmpUser.userCode = prestCustomer.userCode;
        tmpUser.name = prestCustomer.name;
        tmpUser.firstLastName = prestCustomer.firstLastName;
        tmpUser.secondLastName = prestCustomer.secondLastName;
        tmpUser.email = prestCustomer.email;
        tmpUser.mobile = prestCustomer.mobile;
        tmpUser.phoneNumber = prestCustomer.phoneNumber;
        tmpUser.extension = prestCustomer.extension;
        tmpUser.commissionPercentage = prestCustomer.commissionPercentage;

        return tmpUser;
    }
}
