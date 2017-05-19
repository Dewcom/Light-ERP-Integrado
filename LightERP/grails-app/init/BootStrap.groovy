import com.dewcom.light.Address
import com.dewcom.light.Bill
import com.dewcom.light.BillDetail
import com.dewcom.light.BillPaymentType
import com.dewcom.light.BillStateType
import com.dewcom.light.Contact
import com.dewcom.light.Customer
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

        def testUser = new User(username: 'admin', password: 'admin', userCode: 'A100', name: 'admin',
                phoneNumber: '2222-2222').save()

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


        JSON.registerObjectMarshaller(Bill) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['billDate'] = it.billDate
            returnArray['address'] = it.address
            returnArray['billNumber'] = it.billNumber
            returnArray['dueDate'] = it.dueDate
            returnArray['subTotalAmount'] = it.subTotalAmount
            returnArray['creationDate'] = it.creationDate
            returnArray['totalAmount'] = it.totalAmount
            returnArray['totalDiscount'] = it.totalDiscount
            returnArray['exchangeRate'] = it.exchangeRate
            returnArray['totalTaxAmount'] = it.totalTaxAmount
            returnArray['billState'] = it.billState
            returnArray['billDetails'] = it.billDetails
            returnArray['billPaymentType'] = it.billPaymentType
            returnArray['currency'] = it.currency
            returnArray['creditCondition'] = it.creditCondition
            returnArray['customer'] = it.customer
            return returnArray
        }

        JSON.registerObjectMarshaller(BillDetail) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['quantity'] = it.quantity
            returnArray['linePrice'] = it.linePrice
            returnArray['discountPercentage'] = it.discountPercentage
            returnArray['totalDiscount'] = it.totalDiscount
            returnArray['taxPercentage'] = it.taxPercentage
            returnArray['totalTaxAmount'] = it.totalTaxAmount
            returnArray['subTotal'] = it.subTotal
            returnArray['total'] = it.total
            returnArray['enabled'] = it.enabled
            returnArray['product'] = ["id": it.product.id, "productCode": it.product.productCode, "name": it.product.name]

            return returnArray
        }

        JSON.registerObjectMarshaller(Customer) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['name'] = it.name
            returnArray['firstLastName'] = it.firstLastName
            returnArray['secondLastName'] = it.secondLastName
            returnArray['identificationType'] = ["id": it.identificationType.id, "name": it.identificationType.name]
            returnArray['customerType'] = ["id": it.customerType.id, "name": it.customerType.name]
            returnArray['identification'] = it.identification
            returnArray['phoneNumber1'] = it.phoneNumber1
            returnArray['phoneNumber2'] = it.phoneNumber2
            returnArray['mobile'] = it.mobile
            returnArray['website'] = it.website
            returnArray['email'] = it.email
            returnArray['contacts'] = it.contacts
            returnArray['addresses'] = it.addresses
            returnArray['enabled'] = it.enabled
            returnArray['registrationDate'] = it.registrationDate
            returnArray['discountPercentage'] = it.discountPercentage
            returnArray['creditLimit'] = it.creditLimit
            return returnArray
        }

        JSON.registerObjectMarshaller(Currency) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['description'] = it.description

            return returnArray
        }


        JSON.registerObjectMarshaller(Contact) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['customerId'] = it.customer.id
            returnArray['name'] = it.name
            returnArray['firstLastName'] = it.firstLastName
            returnArray['secondLastName'] = it.secondLastName
            returnArray['jobTitle'] = it.jobTitle
            returnArray['department'] = it.department
            returnArray['phoneNumber1'] = it.phoneNumber1
            returnArray['phoneNumber2'] = it.phoneNumber2
            returnArray['mobile'] = it.mobile
            returnArray['email'] = it.email
            returnArray['enabled'] = it.enabled
            returnArray['registrationDate'] = it.registrationDate
            return returnArray
        }


        JSON.registerObjectMarshaller(Address) {
            def returnArray = [:]
            returnArray['id'] = it.id
            returnArray['idDistrict'] = it.idDistrict
            returnArray['address'] = it.address
            returnArray['enabled'] = it.enabled
            returnArray['customerId'] = it.customer.id

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
