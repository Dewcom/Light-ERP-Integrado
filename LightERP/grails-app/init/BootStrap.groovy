import com.dewcom.light.billing.BillPaymentType
import com.dewcom.light.billing.BillStateType
import com.dewcom.light.configuration.Configuration
import com.dewcom.light.billing.CreditCondition
import com.dewcom.light.billing.Currency
import com.dewcom.light.billing.ExchangeRate
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReport
import com.dewcom.light.thirdparty.CustomerType
import com.dewcom.light.thirdparty.IdentificationType
import com.dewcom.light.warehouse.MeasureUnit
import com.dewcom.light.warehouse.PresentationType
import com.dewcom.light.warehouse.ProductType
import com.dewcom.light.user.Role
import com.dewcom.light.user.User
import com.dewcom.light.user.UserRole
import com.dewcom.light.warehouse.WarehouseOrderStateType
import grails.converters.JSON

class BootStrap {

    def init = {
        //Creacion de constantes por defecto
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
        if(!CustomerType.findByName("Contado & Crédito")){
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

        if(!BillStateType.findByCode(BillStateType.BILL_PRE_BILL_STATE_CODE)){
            def tmpBillStateType = new BillStateType()
            tmpBillStateType.description = "Pre-factura"
            tmpBillStateType.code = BillStateType.BILL_PRE_BILL_STATE_CODE;
            tmpBillStateType.save()
        }

        //estados de ordenes de bodega
        if(!WarehouseOrderStateType.findByCode(WarehouseOrderStateType.WAREHOUSE_ORDER_CREATED)){
            def tmpWarehouseOrderStateType = new WarehouseOrderStateType()
            tmpWarehouseOrderStateType.description = "Orden de bodega borrador"
            tmpWarehouseOrderStateType.code = WarehouseOrderStateType.WAREHOUSE_ORDER_CREATED
            tmpWarehouseOrderStateType.save()
        }
        if(!WarehouseOrderStateType.findByCode(WarehouseOrderStateType.WAREHOUSE_ORDER_VALIDATED)){
            def tmpWarehouseOrderStateType = new WarehouseOrderStateType()
            tmpWarehouseOrderStateType.description = "Orden de bodega validada"
            tmpWarehouseOrderStateType.code = WarehouseOrderStateType.WAREHOUSE_ORDER_VALIDATED
            tmpWarehouseOrderStateType.save()
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

        //Tipo de producto
        if(!ProductType.findByCode(ProductType.NATIONAL)){
            def productType = new ProductType()
            productType.name = "Nacional"
            productType.code = ProductType.NATIONAL
            productType.save()
        }

        if(!ProductType.findByCode(ProductType.IMPORTED)){
            def productType = new ProductType()
            productType.name = "Importado"
            productType.code = ProductType.IMPORTED
            productType.save()
        }

        if(!ProductType.findByCode(ProductType.MANUFACTURED)){
            def productType = new ProductType()
            productType.name = "Manufacturado"
            productType.code = ProductType.MANUFACTURED
            productType.save()
        }

        //Tipo de presentacion
        if(!PresentationType.findByCode(PresentationType.UNITS)){
            def presentationType = new PresentationType()
            presentationType.name = "Unidades"
            presentationType.code = PresentationType.UNITS
            presentationType.save()
        }

        if(!PresentationType.findByCode(PresentationType.SACK_50KG)){
            def presentationType = new PresentationType()
            presentationType.name = "Saco de 50 kg"
            presentationType.code = PresentationType.SACK_50KG
            presentationType.save()
        }

        if(!PresentationType.findByCode(PresentationType.BAG_5KG)){
            def presentationType = new PresentationType()
            presentationType.name = "Bolsa de 5 kg"
            presentationType.code = PresentationType.BAG_5KG
            presentationType.save()
        }

        if(!PresentationType.findByCode(PresentationType.BAG_10KG)){
            def presentationType = new PresentationType()
            presentationType.name = "Bolsa de 10 kg"
            presentationType.code = PresentationType.BAG_10KG
            presentationType.save()
        }

        if(!PresentationType.findByCode(PresentationType.BAG_25KG)){
            def presentationType = new PresentationType()
            presentationType.name = "Bolsa de 25 kg"
            presentationType.code = PresentationType.BAG_25KG
            presentationType.save()
        }

        //Unidades de medida
        if(!MeasureUnit.findByCode(MeasureUnit.KILOGRAMS)){
            def measureType = new MeasureUnit()
            measureType.name = "Kilogramos"
            measureType.symbol = "Kg"
            measureType.code = MeasureUnit.KILOGRAMS
            measureType.save()
        }

        if(!MeasureUnit.findByCode(MeasureUnit.GRAMS)){
            def measureType = new MeasureUnit()
            measureType.name = "Gramos"
            measureType.symbol = "g"
            measureType.code = MeasureUnit.GRAMS
            measureType.save()
        }

        if(!MeasureUnit.findByCode(MeasureUnit.LITERS)){
            def measureType = new MeasureUnit()
            measureType.name = "Litros"
            measureType.symbol = "L"
            measureType.code = MeasureUnit.LITERS
            measureType.save()
        }

        if(!MeasureUnit.findByCode(MeasureUnit.MINILITERS)){
            def measureType = new MeasureUnit()
            measureType.symbol = "mL"
            measureType.name = "Minilitros"
            measureType.code = MeasureUnit.MINILITERS
            measureType.save()
        }

        if(!MeasureUnit.findByCode(MeasureUnit.OUNCES)){
            def measureType = new MeasureUnit()
            measureType.symbol = "oz"
            measureType.name = "Onzas"
            measureType.code = MeasureUnit.OUNCES
            measureType.save()
        }

        if(!MeasureUnit.findByCode(MeasureUnit.UNITS)){
            def measureType = new MeasureUnit()
            measureType.symbol = "uds"
            measureType.name = "Unidades"
            measureType.code = MeasureUnit.UNITS
            measureType.save()
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
