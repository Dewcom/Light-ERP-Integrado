package com.dewcom.light.report

import com.dewcom.light.billing.ExchangeRate
import com.dewcom.light.configuration.ActionBinnacleLog
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.report.response.ReportResp
import com.dewcom.light.rest.report.warehouse.request.ProductLotHistoryRequest
import com.dewcom.light.rest.report.warehouse.response.WarehouseProductLegacyReport
import com.dewcom.light.rest.report.warehouse.response.WarehouseProductLegacyReportDto
import com.dewcom.light.rest.report.warehouse.response.WarehouseProductLegacyReportSummary
import com.dewcom.light.utils.Constants
import com.dewcom.light.utils.LightUtils
import grails.transaction.Transactional

import java.text.SimpleDateFormat

@Transactional
class WarehouseReportService {
    def messageSource
    def sessionFactory
    def adminService

    def getProductLotHistory(ProductLotHistoryRequest request) {
        log.info "====== Getting product lot history from DB ======"
        try {

            Date startDate = LightUtils.stringToDate(request.startDate, "yyyy-MM-dd")
            Date endDate = LightUtils.stringToDate(request.endDate, "yyyy-MM-dd")

            // Se suma un dia mas ya que la consulta en hql no es inclusiva
            endDate = LightUtils.plusDaysToDate(endDate, 1);

            String hqlQuery = "FROM ActionBinnacleLog WHERE modifiedItemCode = '" + request.lotNumber + "' AND domain = 'ProductLot'" +
                    " AND actionDate BETWEEN :startDate and :endDate  "

            def session = sessionFactory.currentSession
            def query = session.createQuery(hqlQuery)

            query.setParameter("startDate", startDate)
            query.setParameter("endDate", endDate)

            def results = query.list()

            return results
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("product.lot.history.report.error", null, Locale.default))
        }

    }

    def getProductLegacyReport(def productCode) {
        log.info "====== Getting product legacy report from DB ======"
        try {

            String hqlQuery = "select new map (sum(productLot.quantity) as stock, p.productCode as productCode, p.name as productName, p.cost as productCost, ms.symbol as symbol)"+
                    " from Product p  join p.measureUnit ms join p.productLot as productLot"

            if(productCode){
                hqlQuery+= " where p.productCode like :pcode"
            }

            hqlQuery+=  " group by p";

            def session = sessionFactory.currentSession
            def query = session.createQuery(hqlQuery)

            if(productCode){
                query.setParameter("pcode", productCode)
            }

            def results = query.list()
            def warehouseProductLegacyReportResponse = new ReportResp()
        if(results) {
            def warehouseProductLegacyReportSummary = new WarehouseProductLegacyReportSummary()
            warehouseProductLegacyReportResponse.reportData = buildProductLegacyReportDtos(LightUtils.buildReportDomainObjects(results, WarehouseProductLegacyReport.getName()))
            warehouseProductLegacyReportSummary.totalDollarsCost = LightUtils.formatDouble(warehouseProductLegacyReportResponse.reportData.dollarsCost.sum(), 2)
            warehouseProductLegacyReportSummary.totalStock = warehouseProductLegacyReportResponse.reportData.stock.sum()
            warehouseProductLegacyReportSummary.totalColonesCost = LightUtils.formatDouble(warehouseProductLegacyReportResponse.reportData.colonesCost.sum(), 2)
            warehouseProductLegacyReportSummary.totalColonesCostAmount = LightUtils.formatDouble(warehouseProductLegacyReportResponse.reportData.totalColonesCost.sum(), 2)
            warehouseProductLegacyReportSummary.totalDollarsCostAmount = LightUtils.formatDouble(warehouseProductLegacyReportResponse.reportData.totalDollarsCost.sum(), 2)
            warehouseProductLegacyReportResponse.reportSummary = warehouseProductLegacyReportSummary
            formatProductLegacyReportAmounts(warehouseProductLegacyReportResponse.reportData)
        }
            return warehouseProductLegacyReportResponse
        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("product.legacy.report.error", null, Locale.default))
        }
    }


    //builds purchases report dto objects
    def buildProductLegacyReportDtos(def pDomainObjects){
        def List<WarehouseProductLegacyReportDto> results = new ArrayList<>()
        def exchangeRate = adminService.getExchangeRateByCode(ExchangeRate.TIPO_CAMBIO_DOLARES)
        if(pDomainObjects != null) {
            pDomainObjects.each { it ->
                def tmpReportObj = new WarehouseProductLegacyReportDto()
                tmpReportObj.productName = it.productName
                tmpReportObj.productCode = it.productCode
                tmpReportObj.colonesCost = it.productCost
                tmpReportObj.dollarsCost = it.productCost / exchangeRate.value
                tmpReportObj.totalColonesCost = tmpReportObj.colonesCost * it.stock
                tmpReportObj.totalDollarsCost = tmpReportObj.dollarsCost * it.stock
                tmpReportObj.stock = it.stock
                tmpReportObj.exchangeRate = exchangeRate.value
                tmpReportObj.symbol = it.symbol
                results.add(tmpReportObj)
            }
        }
        results
    }

    def formatProductLegacyReportAmounts(def productLegacyData){
        productLegacyData.each { it ->
            it.totalColonesCost = LightUtils.formatDouble(it.totalColonesCost, 2)
            it.totalDollarsCost = LightUtils.formatDouble(it.totalDollarsCost, 2)
            it.colonesCost = LightUtils.formatDouble(it.colonesCost, 2)
            it.dollarsCost = LightUtils.formatDouble(it.dollarsCost, 2)
        }
    }
}
