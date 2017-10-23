package com.dewcom.light.report

import com.dewcom.light.rest.report.customer.request.CustomerPurchasesReportReq
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReport
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReportDto
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReportResp
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
            CustomerPurchasesReportResp purchasesReportResponse = new CustomerPurchasesReportResp()
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
            purchasesReportResponse.reportData = buildPurchasesReportDtoObjects(buildPurchasesReportDomainObjects(results))
            purchasesReportSummary.totalGrossPrice = purchasesReportResponse.reportData.buyPrice.sum()
            purchasesReportSummary.totalQuantity = purchasesReportResponse.reportData.quantity.sum()
            purchasesReportSummary.totalNetPrice = purchasesReportResponse.reportData.totalAmount.sum()
            purchasesReportResponse.reportSummary = purchasesReportSummary

            purchasesReportResponse

        }
        catch(Exception e){
            throw e;
        }
    }

    //builds report domain objects
    def buildPurchasesReportDomainObjects(def pQueryResults){
        def List<CustomerPurchasesReport> results = new ArrayList<>()
        if(pQueryResults != null) {
            pQueryResults.each { it ->
                def tmpReportObj = new CustomerPurchasesReport(it)
                results.add(tmpReportObj)
            }
        }
        results
    }


    //builds report dto objects
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
                tmpReportObj.billNumber = formatBillNumber(6, it.billNumber.toString())
                tmpReportObj.quantity = it.quantity
                results.add(tmpReportObj)
            }
        }
        results
    }

    def formatBillNumber(Integer pCantidadZeros, String pBillNumber){
        int zeros = pCantidadZeros - (pBillNumber.length())
        def result = "";
        String zerosToConcat = "";
        for(int i = 1; i <= zeros;i++){
            zerosToConcat = zerosToConcat.concat("0")
        }
        //return
        result =  (zerosToConcat + pBillNumber)
        result
    }
}
