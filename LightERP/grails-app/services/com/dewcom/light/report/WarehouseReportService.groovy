package com.dewcom.light.report

import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.report.warehouse.request.ProductLotHistoryRequest
import com.dewcom.light.rest.report.warehouse.request.WarehouseMovementsReportRequest
import com.dewcom.light.rest.report.warehouse.response.WarehouseMovementsReportDto
import com.dewcom.light.rest.report.warehouse.response.WarehouseMovementsReportResponse
import com.dewcom.light.utils.LightUtils
import com.dewcom.light.warehouse.MeasureUnit
import grails.transaction.Transactional

@Transactional
class WarehouseReportService {
    def messageSource
    def sessionFactory

    def getProductLotHistory(ProductLotHistoryRequest request) {
        log.info "====== Getting product lot history from DB ======"
        try {

            Date startDate = LightUtils.stringToDate(request.startDate, "yyyy-MM-dd")
            Date endDate = LightUtils.stringToDate(request.endDate, "yyyy-MM-dd")

            // Se suma un dia mas ya que la consulta en hql no es inclusiva
            endDate = LightUtils.plusDaysToDate(endDate, 1)

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

    def getWarehouseMovements(WarehouseMovementsReportRequest request){
        log.info "====== Getting warehouse order movement types from DB ======"

        WarehouseMovementsReportResponse response = new WarehouseMovementsReportResponse()

        try {

            String hqlQuery = "SELECT new map (a.action as action, a.actionDate as actionDate, a.details as details, " +
                    "a.domain as domain, a.itemId as productLotId, a.modifiedItemCode as productLotCode, " +
                    "a.username as username, pl.product as productId, pl.quantity as quantity, " +
                    "p.name as productName, p.productCode as productCode, p.measureUnit as measureUnit) " +
                    "FROM ActionBinnacleLog as a, ProductLot as pl, Product as p " +
                    "WHERE a.modifiedItemCode = pl.lotNumber " +
                    "AND pl.product = p.id " +
                    "AND a.actionDate between :startDate and :endDate "


            if(request.lotNumber != null && !request.lotNumber.isEmpty()){
                hqlQuery += "AND a.modifiedItemCode LIKE '" + request.lotNumber.trim()+"'"
            }

            if(request.productCode != null && !request.productCode.isEmpty()){
                hqlQuery += "AND p.productCode LIKE'" + request.productCode.trim()+"'"
            }


            Date tmpStartDate = LightUtils.stringToDate(request.startDate, "yyyy-MM-dd") ?: null
            Date tmpEndDate = LightUtils.stringToDate(request.endDate, "yyyy-MM-dd") ?: null

            def session = sessionFactory.currentSession
            def query = session.createQuery(hqlQuery)

            query.setParameter("startDate", tmpStartDate)
            query.setParameter("endDate", tmpEndDate)

            def results = query.list()
            log.info(results)

            response.reportData = buildWarehouseMovementsReportDtoObjects(results)

            return response

        } catch (Exception e) {
            log.error(e)
            throw new LightRuntimeException(messageSource.getMessage("product.lot.history.report.error", null, Locale.default))
        }
    }

    def buildWarehouseMovementsReportDtoObjects(def pDomainObjects){
        def List<WarehouseMovementsReportDto> results = new ArrayList<>()
        if(pDomainObjects != null) {
            pDomainObjects.each { it ->
                def tmpReportObj = new WarehouseMovementsReportDto()
                tmpReportObj.movementDate = LightUtils.dateToString(it.actionDate, "dd-MM-yyyy")
                tmpReportObj.productCode = it.productCode
                tmpReportObj.productName = it.productName
                tmpReportObj.lotCode = it.productLotCode
                tmpReportObj.quantity = it.quantity
                tmpReportObj.movementType = it.action
                tmpReportObj.details = it.details
                tmpReportObj.username = it.username

                MeasureUnit tmpMeasureUnit = MeasureUnit.findById(it.measureUnit.id)
                tmpReportObj.measureUnit = tmpMeasureUnit.symbol

                results.add(tmpReportObj)
            }
        }
        results
    }
}
