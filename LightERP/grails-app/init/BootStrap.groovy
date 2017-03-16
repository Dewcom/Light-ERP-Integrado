import com.dewcom.light.BillDetail
import com.dewcom.light.BillPaymentType
import com.dewcom.light.BillStateType

import com.dewcom.light.PresentationType
import com.dewcom.light.ProductType
import grails.converters.JSON
import com.dewcom.light.AgentType
import com.dewcom.light.CustomerType
import com.dewcom.light.IdentificationType
import com.dewcom.light.Role
import com.dewcom.light.User
import com.dewcom.light.UserRole

class BootStrap {

    def init = {
        def adminRole = new Role(authority: 'ROLE_ADMIN').save()
        def userRole = new Role(authority: 'ROLE_USER').save()

        def testUser = new User(username: 'admin', password: 'admin', userCode: 'A100', name: 'admin', phoneNumber: '2222-2222').save()

        UserRole.create testUser, adminRole

        UserRole.withSession {
            it.flush()
            it.clear()
        }

       /* assert User.count() == 2
        assert Role.count() == 2
        assert UserRole.count() == 1*/

        JSON.registerObjectMarshaller(IdentificationType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['name'] = it.name
            return returnArray
        }

        JSON.registerObjectMarshaller(AgentType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['positionName'] = it.positionName
            return returnArray
        }

        JSON.registerObjectMarshaller(CustomerType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['name'] = it.name
            return returnArray
        }

        JSON.registerObjectMarshaller(CustomerType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['name'] = it.name
            return returnArray
        }

        JSON.registerObjectMarshaller(ProductType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['name'] = it.name
            return returnArray
        }

        JSON.registerObjectMarshaller(PresentationType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['name'] = it.name
            return returnArray
        }

        JSON.registerObjectMarshaller(BillDetail) {
            def returnArray = [:]
            returnArray['quantity'] = it.quantity
            returnArray['linePrice'] = it.linePrice
            returnArray['discountPercentage'] = it.discountPercentage
            returnArray['totalDiscount'] = it.totalDiscount
            returnArray['taxPercentage'] = it.taxPercentage
            returnArray['subTotal'] = it.subTotal
            returnArray['total'] = it.total
            returnArray['productId'] = it.product.id
            return returnArray
        }

        JSON.registerObjectMarshaller(Currency) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['description'] = it.description

            return returnArray
        }

        JSON.registerObjectMarshaller(BillPaymentType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['description'] = it.description

            return returnArray
        }

        JSON.registerObjectMarshaller(BillStateType) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['description'] = it.description

            return returnArray
        }


        JSON.registerObjectMarshaller(User) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['username'] = it.username

            return returnArray
        }

        def destroy = {
        }
    }
}
