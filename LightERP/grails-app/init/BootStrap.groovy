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

        def testUser = new User(username: 'admin', password: 'admin').save()

        UserRole.create testUser, adminRole

        UserRole.withSession {
            it.flush()
            it.clear()
        }

        assert User.count() == 1
        assert Role.count() == 2
        assert UserRole.count() == 1

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

        def destroy = {
        }
    }
}
