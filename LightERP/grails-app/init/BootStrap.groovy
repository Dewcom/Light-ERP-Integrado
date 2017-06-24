import com.dewcom.light.BillPaymentType
import com.dewcom.light.BillStateType
import com.dewcom.light.Configuration
import com.dewcom.light.Constants
import com.dewcom.light.CreditCondition
import com.dewcom.light.Currency
import com.dewcom.light.ExchangeRate
import com.dewcom.light.CustomerType
import com.dewcom.light.IdentificationType
import com.dewcom.light.Role
import com.dewcom.light.User
import com.dewcom.light.UserRole

class BootStrap {

    def init = {
        //Creacion de contantes por Defecto
        if(!IdentificationType.findByCode(IdentificationType.PHYSICAL_CODE)){
          def physicalClient = new IdentificationType()
          physicalClient.name = "Cédula Física"
          physicalClient.code = IdentificationType.PHYSICAL_CODE
          physicalClient.save()
        }
        if(!IdentificationType.findByCode(IdentificationType.COMPANY_CODE)){
            def companyClient = new IdentificationType()
            companyClient.name = "Cédula Jurídica"
            companyClient.code = IdentificationType.COMPANY_CODE
            companyClient.save()
        }

        if(!IdentificationType.findByCode(IdentificationType.PASSPORT_CODE)){
            def companyClient = new IdentificationType()
            companyClient.name = "Pasaporte"
            companyClient.code = IdentificationType.PASSPORT_CODE
            companyClient.save()
        }

        //Creacion de Tipos de Clientes por Defecto
        if(!CustomerType.findByName("Contado & Credito")){
            def companyClient = new CustomerType()
            companyClient.name = "Contado & Crédito"
            companyClient.save()
        }
        if(!CustomerType.findByName("Solo Contado")){
            def companyClient = new CustomerType()
            companyClient.name = "Solo Contado"
            companyClient.save()
        }

        //estados de factura
        if(!BillStateType.findByCode(BillStateType.FACTURA_CREADA)){
            def tmpBillStateType = new BillStateType()
            tmpBillStateType.description = "Factura borrador"
            tmpBillStateType.code = BillStateType.FACTURA_CREADA
            tmpBillStateType.save()
        }
        if(!BillStateType.findByCode(BillStateType.FACTURA_PAGADA_PARCIAL)){
            def tmpBillStateType = new BillStateType()
            tmpBillStateType.description = "Factura pagada parcial"
            tmpBillStateType.code = BillStateType.FACTURA_PAGADA_PARCIAL
            tmpBillStateType.save()
        }
        if(!BillStateType.findByCode(BillStateType.FACTURA_PAGADA)){
            def tmpBillStateType = new BillStateType()
            tmpBillStateType.description = "Factura pagada"
            tmpBillStateType.code = BillStateType.FACTURA_PAGADA
            tmpBillStateType.save()
        }

        if(!BillStateType.findByCode(BillStateType.FACTURA_VALIDADA)){
            def tmpBillStateType = new BillStateType()
            tmpBillStateType.description = "Factura validada"
            tmpBillStateType.code = BillStateType.FACTURA_VALIDADA
            tmpBillStateType.save()
        }

        if(!BillStateType.findByCode(BillStateType.FACTURA_ANULADA)){
            def tmpBillStateType = new BillStateType()
            tmpBillStateType.description = "Factura anulada"
            tmpBillStateType.code = BillStateType.FACTURA_ANULADA;
            tmpBillStateType.save()
        }

        //monedas

        if(!Currency.findByCurrencyCode(Currency.MONEDA_COLONES)){
            def tmpCurrency = new Currency()
            tmpCurrency.description = "Colones"
            tmpCurrency.currencyCode = Currency.MONEDA_COLONES
            tmpCurrency.save()
        }

        if(!Currency.findByCurrencyCode(Currency.MONEDA_DOLARES)){
            def tmpCurrency = new Currency()
            tmpCurrency.description = "Dólares"
            tmpCurrency.currencyCode = Currency.MONEDA_DOLARES
            tmpCurrency.save()
        }

        //tipos de pago

        if(!BillPaymentType.findByCode(BillPaymentType.PAGO_CONTADO)){
            def tmpPaymentType = new BillPaymentType()
            tmpPaymentType.description = "Contado"
            tmpPaymentType.code = BillPaymentType.PAGO_CONTADO
            tmpPaymentType.save()
        }

        if(!BillPaymentType.findByCode(BillPaymentType.PAGO_CREDITO)){
            def tmpPaymentType = new BillPaymentType()
            tmpPaymentType.description = "Crédito"
            tmpPaymentType.code = BillPaymentType.PAGO_CREDITO
            tmpPaymentType.save()
        }

        //condiciones de credito

        if(!CreditCondition.findByCode(CreditCondition.CREDITO_OCHO_DIAS)){
            def tmpCreditCon = new CreditCondition()
            tmpCreditCon.description = "8 días"
            tmpCreditCon.code = CreditCondition.CREDITO_OCHO_DIAS
            tmpCreditCon.days = 8
            tmpCreditCon.save()
        }

        if(!CreditCondition.findByCode(CreditCondition.CREDITO_QUINCE_DIAS)){
            def tmpCreditCon = new CreditCondition()
            tmpCreditCon.description = "15 días"
            tmpCreditCon.code = CreditCondition.CREDITO_QUINCE_DIAS
            tmpCreditCon.days = 15
            tmpCreditCon.save()
        }



        if(!CreditCondition.findByCode(CreditCondition.CREDITO_TREINTA_DIAS)){
            def tmpCreditCon = new CreditCondition()
            tmpCreditCon.description = "30 días"
            tmpCreditCon.code = CreditCondition.CREDITO_TREINTA_DIAS
            tmpCreditCon.days = 30
            tmpCreditCon.save()
        }

        if(!CreditCondition.findByCode(CreditCondition.CREDITO_SESENTA_DIAS)){
            def tmpCreditCon = new CreditCondition()
            tmpCreditCon.description = "60 días"
            tmpCreditCon.code = CreditCondition.CREDITO_SESENTA_DIAS
            tmpCreditCon.days = 60
            tmpCreditCon.save()
        }

        //exchangeRate
        if(!ExchangeRate.findByCode(ExchangeRate.TIPO_CAMBIO_DOLARES)){
            def tmpExchageRate = new ExchangeRate()
            tmpExchageRate.description = "Tipo cambio dólares compra"
            tmpExchageRate.code = ExchangeRate.TIPO_CAMBIO_DOLARES
            tmpExchageRate.currency = Currency.findByCurrencyCode(Currency.MONEDA_DOLARES)
            tmpExchageRate.value = 574.0D
            tmpExchageRate.save()
        }

        if(!ExchangeRate.findByCode(ExchangeRate.TIPO_CAMBIO_COLONES)){
            def tmpExchageRate = new ExchangeRate()
            tmpExchageRate.description = "Tipo cambio colones compra"
            tmpExchageRate.code = ExchangeRate.TIPO_CAMBIO_COLONES
            tmpExchageRate.currency = Currency.findByCurrencyCode(Currency.MONEDA_COLONES)
            tmpExchageRate.value = 1D
            tmpExchageRate.save()
        }

        //se crea la configuracion de  num factura con el primer numero
        if(!Configuration.findByCode(Configuration.CONFIG_CONSECUTIVO_FACTURA)){
            def tmpConfig = new Configuration(value: "1", description: "consecutivo candidato factura", code: Configuration.CONFIG_CONSECUTIVO_FACTURA).save()
        }


        def adminRole = new Role(authority: 'ROLE_ADMIN').save()
        def userRole = new Role(authority: 'ROLE_USER').save()

        def testUser = new User(username: 'admin', password: 'admin', userCode: 'A100', name: 'admin',
                phoneNumber: '2222-2222').save()

        UserRole.create testUser, adminRole

        UserRole.withSession {
            it.flush()
            it.clear()
        }

        def destroy = {
        }
    }
}
