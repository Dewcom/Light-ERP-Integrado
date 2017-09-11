package com.dewcom.light.report

import com.dewcom.light.*
import com.dewcom.light.rest.*
import com.dewcom.light.rest.report.customer.request.CustomerPurchasesReportReq
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReport
import com.dewcom.light.rest.report.customer.response.CustomerPurchasesReportResp
import com.dewcom.light.rest.report.customer.response.PurchasesReportHeader
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
                    "d.total as totalAmount,  c.name as customerName, " +
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


            purchasesReportResponse.reportHeader = reportHeader
            purchasesReportResponse.reportData = buildPurchasesReportResults(query.list())

            purchasesReportResponse

        }
        catch(Exception e){
            throw e;
        }
    }

    //builds report data objects
    def buildPurchasesReportResults(def pQueryResults){
        def List<CustomerPurchasesReport> results = new ArrayList<>();
        if(pQueryResults != null) {
            pQueryResults.each { it ->
                results.add(new CustomerPurchasesReport(it))
            }
        }
        results
    }
}
