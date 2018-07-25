package com.dewcom.light.report

import com.dewcom.light.billing.BillPaymentType
import com.dewcom.light.billing.BillStateType
import com.dewcom.light.billing.Currency
import com.dewcom.light.rest.report.customer.request.CustomerBillsReportReq
import com.dewcom.light.rest.report.customer.request.CustomerPurchasesReportReq
import com.dewcom.light.rest.report.customer.response.BillsReportSummary
import com.dewcom.light.rest.report.customer.response.CustomerBillsReport
import com.dewcom.light.rest.report.customer.response.CustomerBillsReportDto
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReport
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReportDto
import com.dewcom.light.rest.report.response.ReportResp
import com.dewcom.light.rest.report.customer.response.PurchasesReportHeader
import com.dewcom.light.rest.report.customer.response.PurchasesReportSummary
import com.dewcom.light.thirdparty.Customer
import com.dewcom.light.utils.LightUtils
import com.dewcom.light.warehouse.Product
import grails.transaction.Transactional

@Transactional
class CustomerReportService {
    def messageSource
    def sessionFactory

    def getCustomerProductPurchases(CustomerPurchasesReportReq pReq){

        try{
            ReportResp purchasesReportResponse = new ReportResp()
            //TODO THIS SHOULD BE REFACTORED BY USING STORED PROCEDURES, LEO
            String hqlQuery = "select new map (b.billNumber as billNumber, c.identification as customerId, b.billDate as buyDate," +
                    " p.productCode as productCode, p.name as productName, cur.currencyCode as currencyCode, b.exchangeRate as exchange, d.subTotal as buyPrice, " +
                    "d.totalTaxAmount as totalTaxAmount, c.name as customerName, " +
                    "c.firstLastName as customerFirstLastName, c.secondLastName as customerSecondLastName , " +
                    "d.quantity as quantity, bs.description as billState, p.cost as cost)" +
                    " from BillDetail d join  d.bill b  " +
                    "join b.customer c join b.currency cur " +
                    "join d.product p " +
                    "join b.billState bs  " +
                    "where bs.code != 5 and bs.code != 1 and b.billDate between :startDate and :endDate "

            def reportHeader = new PurchasesReportHeader()
            if(pReq.customerIdentification != null && !pReq.customerIdentification.isEmpty()){
                hqlQuery += "and c.identification like  '"+pReq.customerIdentification.trim()+"' "
                def customer = Customer.findByIdentification(pReq.customerIdentification.trim());
                if(customer){
                    reportHeader.customerFullName = customer.name +" "+ (LightUtils.isNotBlank(customer.firstLastName) ? customer.firstLastName : "") +" "+
                            (LightUtils.isNotBlank(customer.secondLastName) ? customer.secondLastName : "")
                }
            }
            if(pReq.productCode != null && !pReq.productCode.isEmpty()){
                hqlQuery += "and p.productCode like  '"+pReq.productCode.trim()+"' "
                def product = Product.findByProductCode(pReq.productCode.trim())
                if(product){
                    reportHeader.productName = product.name;
                }
            }

            Date tmpStartDate = LightUtils.stringToDate(pReq.startDate, "dd-MM-yyyy")
            Date tmpEndDate = LightUtils.stringToDate(pReq.endDate, "dd-MM-yyyy")
            hqlQuery += " order by b.billDate DESC"

            def session = sessionFactory.currentSession
            def query = session.createQuery(hqlQuery)

            query.setParameter("startDate", tmpStartDate)
            query.setParameter("endDate", tmpEndDate)

            def results = query.list()

            purchasesReportResponse.reportHeader = reportHeader
            def purchasesReportSummary = new PurchasesReportSummary()
            purchasesReportResponse.reportData = buildPurchasesReportDtoObjects(LightUtils.buildReportDomainObjects(results, CustomerPurchasesReport.getName()))
            purchasesReportSummary.totalGrossPrice = LightUtils.formatDouble(purchasesReportResponse.reportData.buyPrice.sum(),2)
            purchasesReportSummary.totalQuantity = purchasesReportResponse.reportData.quantity.sum()
            purchasesReportSummary.totalTaxAmount = LightUtils.formatDouble(purchasesReportResponse.reportData.totalTaxAmount.sum(),2)
            purchasesReportSummary.totalCost = LightUtils.formatDouble(purchasesReportResponse.reportData.cost.sum(),2)
            purchasesReportSummary.totalUtilityAmount = LightUtils.formatDouble(purchasesReportResponse.reportData.utilityAmount.sum(),2)
            purchasesReportResponse.reportSummary = purchasesReportSummary
            formatPurchasesReportAmounts(purchasesReportResponse.reportData)

            CustomerBillsReport

            purchasesReportResponse

        }
        catch(Exception e){
            throw e;
        }
    }




    //builds purchases report dto objects
    def buildPurchasesReportDtoObjects(def pDomainObjects){
        def List<CustomerPurchasesReportDto> results = new ArrayList<>()
        if(pDomainObjects != null) {
            pDomainObjects.each { it ->
                def tmpReportObj = new CustomerPurchasesReportDto()
                tmpReportObj.customerFullName = tmpReportObj.nullSafeSetCustomerFullName(it)
                tmpReportObj.buyDate = LightUtils.dateToString(it.buyDate, "dd-MM-yyyy")
                tmpReportObj.buyPrice = it.buyPrice * it.exchange
                tmpReportObj.customerId = it.customerId
                tmpReportObj.totalTaxAmount = it.totalTaxAmount * it.exchange
                tmpReportObj.productCode = it.productCode
                tmpReportObj.productName = it.productName
                tmpReportObj.billState = it.billState
                tmpReportObj.billNumber = formatBillNumber(6, it.billNumber)
                tmpReportObj.quantity = it.quantity
                tmpReportObj.currency = it.currencyCode == Currency.MONEDA_DOLARES ? 'Dólar' : 'Colón'
                tmpReportObj.exchange = it.exchange
                tmpReportObj.cost = it.cost * it.quantity
                tmpReportObj.utilityAmount = tmpReportObj.buyPrice - tmpReportObj.cost
                tmpReportObj.utilityPercentage = (tmpReportObj.utilityAmount / tmpReportObj.buyPrice) * 100
                results.add(tmpReportObj)
            }
        }
        results
    }

    //builds bills report dto objects
    def buildBillsReportDtoObjects(def pDomainObjects){
        def List<CustomerBillsReportDto> results = new ArrayList<>()
        def totalPaymentsAmount = 0;
        if(pDomainObjects != null) {
            pDomainObjects.each { it ->
                def tmpReportObj = new CustomerBillsReportDto()
                tmpReportObj.customerFullName = tmpReportObj.nullSafeSetCustomerFullName(it)
                tmpReportObj.buyDate = LightUtils.dateToString(it.buyDate, "dd-MM-yyyy")
                tmpReportObj.customerId = it.customerId
                tmpReportObj.totalAmount = it.totalAmount * it.exchange
                tmpReportObj.totalDiscount = it.totalDiscount * it.exchange
                tmpReportObj.subTotal = it.subTotal * it.exchange
                tmpReportObj.billStateDesc = it.billStateDesc
                tmpReportObj.billNumber = formatBillNumber(6, it.billNumber)
                tmpReportObj.totalTaxes = it.totalTaxes * it.exchange
                tmpReportObj.paymentsPerformed = it.totalPayments == null ? 0 : it.totalPayments
                tmpReportObj.balance = it.paymentsTotalAmount == null ? it.totalAmount * it.exchange : (it.totalAmount - it.paymentsTotalAmount) * it.exchange
                def maxPaymentDate = it.buyDate
                if(it.paymentType == BillPaymentType.PAGO_CREDITO){
                    maxPaymentDate = LightUtils.plusDaysToDate(it.buyDate, it.conditionDays)
                }

                def expirationDays = 0;
                if( it.stateCode == BillStateType.FACTURA_VALIDADA ||  it.stateCode == BillStateType.FACTURA_PAGADA_PARCIAL ){
                    expirationDays = LightUtils.daysBetweenDates(maxPaymentDate, new Date())
                }

                tmpReportObj.expirationDays = expirationDays < 0 ? 0 : expirationDays
                tmpReportObj.paymentMaxDate = LightUtils.dateToString(maxPaymentDate , "dd-MM-yyyy")
                tmpReportObj.creditCondition = it.conditionDays == null ? 0 : it.conditionDays
                tmpReportObj.currency = it.currency == Currency.MONEDA_DOLARES ? 'Dólar' : 'Colón'
                tmpReportObj.exchange = it.exchange
                results.add(tmpReportObj)
            }
        }
        results
    }

    def formatBillNumber(Integer pCantidadZeros, def pBillNumber){
        int zeros;
        def result = "";
        if(pBillNumber == null ){
            zeros = pCantidadZeros - 1
        }
        else{
             zeros = pCantidadZeros - (pBillNumber.toString().length())
        }

        String zerosToConcat = "";
        for(int i = 1; i <= zeros;i++){
            zerosToConcat = zerosToConcat.concat("0")
        }
        //return
        result =  pBillNumber == null ? ("B"+ zerosToConcat) : (zerosToConcat + pBillNumber)
        result
    }


    def formatBillReportAmounts(def billReportData){
        billReportData.each { it ->
            it.totalAmount = LightUtils.formatDouble(it.totalAmount, 2)
            it.totalDiscount = LightUtils.formatDouble(it.totalDiscount, 2)
            it.subTotal = LightUtils.formatDouble(it.subTotal, 2)
            it.totalTaxes = LightUtils.formatDouble(it.totalTaxes, 2)
            it.balance = LightUtils.formatDouble(it.balance, 2)
        }
    }

    def formatPurchasesReportAmounts(def purchasesReportData){
        purchasesReportData.each { it ->
            it.totalTaxAmount = LightUtils.formatDouble(it.totalTaxAmount, 2)
            it.buyPrice = LightUtils.formatDouble(it.buyPrice, 2)
            it.cost = LightUtils.formatDouble(it.cost, 2)
            it.utilityAmount = LightUtils.formatDouble(it.utilityAmount, 2)
            it.utilityPercentage = LightUtils.formatDouble(it.utilityPercentage, 2)

        }
    }


    def getCustomerBills(CustomerBillsReportReq pReq){
        try{
             def billsReportResponse = new ReportResp()
            //TODO IF POSSIBLE THIS SHOULD BE REFACTORED BY USING STORED PROCEDURES, LEO
            String selectProjections = "select new map (sum(payment.amount) as paymentsTotalAmount, count(payment) as totalPayments, b.billNumber as billNumber, " +
                    "c.identification as customerId, b.billDate as buyDate, c.name as customerName, " +
                    "c.firstLastName as customerFirstLastName, c.secondLastName as customerSecondLastName, " +
                    "b.subTotalAmount as subTotal, b.totalTaxAmount as totalTaxes, b.totalAmount as totalAmount, " +
                    "b.totalDiscount as totalDiscount, bs.description as billStateDesc, bs.code as stateCode,  pt.code as paymentType, cc.days as conditionDays, cur.currencyCode as currency, b.exchangeRate as exchange) from Bill b ";

            String joins = " join b.currency cur join b.billPaymentType pt join b.customer c join b.billState bs left join b.creditCondition cc left  join b.payments as payment ";

            String hqlQuery = selectProjections + joins + buildWhereClauseConditions(pReq) + " group by b order by b.billDate DESC";
            def session = sessionFactory.currentSession
            def query = session.createQuery(hqlQuery)

            if(pReq.customerIdentification != null && !pReq.customerIdentification.trim().isEmpty()){
                query.setParameter("customerId", pReq.customerIdentification);
            }

            if(pReq.startDate != null && !pReq.startDate.trim().isEmpty() && pReq.endDate != null && !pReq.endDate.trim().isEmpty()){
                Date tmpStartDate = LightUtils.stringToDate(pReq.startDate, "dd-MM-yyyy")
                Date tmpEndDate = LightUtils.stringToDate(pReq.endDate, "dd-MM-yyyy")
                query.setParameter("startDate", tmpStartDate )
                query.setParameter("endDate", tmpEndDate )
            }

            def results = query.list()

            billsReportResponse.reportHeader = new PurchasesReportHeader()
            def billsReportSummary = new BillsReportSummary()
            billsReportResponse.reportData = buildBillsReportDtoObjects(LightUtils.buildReportDomainObject(results, CustomerBillsReport.getName()))
            billsReportSummary.totalDiscount = LightUtils.formatDouble(billsReportResponse.reportData.totalDiscount.sum(),2)
            billsReportSummary.totalSubtotal =  LightUtils.formatDouble(billsReportResponse.reportData.subTotal.sum(), 2)
            billsReportSummary.totalNetAmount = LightUtils.formatDouble(billsReportResponse.reportData.totalAmount.sum(), 2)
            billsReportSummary.totalBalance = LightUtils.formatDouble(billsReportResponse.reportData.balance.sum(), 2)
            billsReportSummary.totalTaxes = LightUtils.formatDouble(billsReportResponse.reportData.totalTaxes.sum(), 2)
            billsReportSummary.totalPayments = billsReportResponse.reportData.paymentsPerformed.sum()
            billsReportResponse.reportSummary = billsReportSummary

            formatBillReportAmounts(billsReportResponse.reportData)

            billsReportResponse

        }
        catch(Exception e){
            throw e;
        }
    }

    /*/
    This method will append to the HQL query the where conditions
     */
    def buildWhereClauseConditions(CustomerBillsReportReq pReq){
        def whereClauseUsed = false;
        def conditions = "";
        //add customerId filter
        if(pReq.customerIdentification != null && !pReq.customerIdentification.trim().isEmpty()){
            conditions +=  " where c.identification like :customerId";
            whereClauseUsed = true;
        }

        if(pReq.startDate != null && !pReq.startDate.trim().isEmpty() && pReq.endDate != null && !pReq.endDate.trim().isEmpty()){
            conditions +=  (whereClauseUsed == true ? " and" : " where") +  " b.billDate between :startDate and :endDate";
            whereClauseUsed = true;
        }

        if(pReq.isPaymentPendingReport){
            conditions +=  (whereClauseUsed == true ? " and" : " where") +  " (bs.code = " + BillStateType.FACTURA_VALIDADA +  " or bs.code =  " + BillStateType.FACTURA_PAGADA_PARCIAL + ") ";
        }
        conditions;
    }
}