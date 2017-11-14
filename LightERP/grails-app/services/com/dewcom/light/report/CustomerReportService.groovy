package com.dewcom.light.report

import com.dewcom.light.billing.BillStateType
import com.dewcom.light.rest.report.customer.request.CustomerBillsReportReq
import com.dewcom.light.rest.report.customer.request.CustomerPurchasesReportReq
import com.dewcom.light.rest.report.customer.response.BillsReportSummary
import com.dewcom.light.rest.report.customer.response.CustomerBillsReport
import com.dewcom.light.rest.report.customer.response.CustomerBillsReportDto
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReport
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReportDto
import com.dewcom.light.rest.report.customer.response.CustomerReportResp
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
            CustomerReportResp purchasesReportResponse = new CustomerReportResp()
            //TODO THIS SHOULD BE REFACTORED BY USING STORED PROCEDURES, LEO
            String hqlQuery = "select new map (b.billNumber as billNumber, c.identification as customerId, b.billDate as buyDate," +
                    " p.productCode as productCode, p.name as productName, d.subTotal as buyPrice, " +
                    "d.total as totalAmount, c.name as customerName, " +
                    "c.firstLastName as customerFirstLastName, c.secondLastName as customerSecondLastName , " +
                    "d.quantity as quantity, bs.description as billState)" +
                    " from BillDetail d join  d.bill b  " +
                    "join b.customer c  " +
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

            def session = sessionFactory.currentSession
            def query = session.createQuery(hqlQuery)

            query.setParameter("startDate", tmpStartDate)
            query.setParameter("endDate", tmpEndDate)

            def results = query.list()

            purchasesReportResponse.reportHeader = reportHeader
            def purchasesReportSummary = new PurchasesReportSummary()
            purchasesReportResponse.reportData = buildPurchasesReportDtoObjects(buildReportDomainObjects(results, CustomerPurchasesReport.getName()))
            purchasesReportSummary.totalGrossPrice = LightUtils.formatDouble(purchasesReportResponse.reportData.buyPrice.sum(),1)
            purchasesReportSummary.totalQuantity = purchasesReportResponse.reportData.quantity.sum()
            purchasesReportSummary.totalNetPrice = LightUtils.formatDouble(purchasesReportResponse.reportData.totalAmount.sum(),1)
            purchasesReportResponse.reportSummary = purchasesReportSummary

            CustomerBillsReport

            purchasesReportResponse

        }
        catch(Exception e){
            throw e;
        }
    }

    //builds dinamically report domain objects
    def buildReportDomainObjects(def pQueryResults, def targetDomainClass ){
        def List results = new ArrayList<>()
        if(pQueryResults != null) {
            pQueryResults.each { it ->
                def tmpReportObj =  Class.forName(targetDomainClass).newInstance(it)
                results.add(tmpReportObj)
            }
        }
        results
    }


    //builds purchases report dto objects
    def buildPurchasesReportDtoObjects(def pDomainObjects){
        def List<CustomerPurchasesReportDto> results = new ArrayList<>()
        if(pDomainObjects != null) {
            pDomainObjects.each { it ->
                def tmpReportObj = new CustomerPurchasesReportDto()
                tmpReportObj.customerFullName = tmpReportObj.nullSafeSetCustomerFullName(it)
                tmpReportObj.buyDate = LightUtils.dateToString(it.buyDate, "dd-MM-yyyy")
                tmpReportObj.buyPrice = it.buyPrice
                tmpReportObj.customerId = it.customerId
                tmpReportObj.totalAmount = it.totalAmount
                tmpReportObj.productCode = it.productCode
                tmpReportObj.productName = it.productName
                tmpReportObj.billState = it.billState
                tmpReportObj.billNumber = formatBillNumber(6, it.billNumber)
                tmpReportObj.quantity = it.quantity
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
                tmpReportObj.totalAmount = it.totalAmount
                tmpReportObj.totalDiscount = it.totalDiscount
                tmpReportObj.subTotal = it.subTotal
                tmpReportObj.billStateDesc = it.billStateDesc
                tmpReportObj.billNumber = formatBillNumber(6, it.billNumber)
                tmpReportObj.totalTaxes = it.totalTaxes
                tmpReportObj.paymentsPerformed = it.totalPayments == null ? 0 : it.totalPayments
                tmpReportObj.balance = it.paymentsTotalAmount == null ? tmpReportObj.totalAmount : (tmpReportObj.totalAmount - it.paymentsTotalAmount)

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


    def getCustomerBills(CustomerBillsReportReq pReq){
        try{
             def billsReportResponse = new CustomerReportResp()
            //TODO IF POSSIBLE THIS SHOULD BE REFACTORED BY USING STORED PROCEDURES, LEO
            String test = "select b.billNumber, sum(payment.amount), count(payment)  from Bill b left  join b.payments as payment";

            String selectProjections = "select new map (sum(payment.amount) as paymentsTotalAmount, count(payment) as totalPayments, b.billNumber as billNumber, " +
                    "c.identification as customerId, b.billDate as buyDate, c.name as customerName, " +
                    "c.firstLastName as customerFirstLastName, c.secondLastName as customerSecondLastName, " +
                    "b.subTotalAmount as subTotal, b.totalTaxAmount as totalTaxes, b.totalAmount as totalAmount, " +
                    "b.totalDiscount as totalDiscount, bs.description as billStateDesc) from Bill b ";

            String joins = " join b.customer c join b.billState bs left  join b.payments as payment ";

            String hqlQuery = selectProjections + joins + buildWhereClauseConditions(pReq) + " group by b";
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
            billsReportResponse.reportData = buildBillsReportDtoObjects(buildReportDomainObjects(results, CustomerBillsReport.getName()))
            billsReportSummary.totalDiscount = LightUtils.formatDouble(billsReportResponse.reportData.totalDiscount.sum(),1)
            billsReportSummary.totalSubtotal =  LightUtils.formatDouble(billsReportResponse.reportData.subTotal.sum(), 1)
            billsReportSummary.totalNetAmount = LightUtils.formatDouble(billsReportResponse.reportData.totalAmount.sum(), 1)
            billsReportSummary.totalBalance = LightUtils.formatDouble(billsReportResponse.reportData.balance.sum(), 1)
            billsReportSummary.totalTaxes = LightUtils.formatDouble(billsReportResponse.reportData.totalTaxes.sum(), 1)
            billsReportSummary.totalPayments = billsReportResponse.reportData.paymentsPerformed.sum()
            billsReportResponse.reportSummary = billsReportSummary

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
        }

        if(pReq.isPaymentPendingReport){
            conditions +=  (whereClauseUsed == true ? " and" : " where") +  " (bs.code = " + BillStateType.FACTURA_VALIDADA +  " or bs.code =  " + BillStateType.FACTURA_PAGADA_PARCIAL + ") ";
        }
        conditions;
    }
}
