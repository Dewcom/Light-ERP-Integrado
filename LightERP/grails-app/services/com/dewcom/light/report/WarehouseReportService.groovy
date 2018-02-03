package com.dewcom.light.report

import com.dewcom.light.configuration.ActionBinnacleLog
import com.dewcom.light.exception.LightRuntimeException
import com.dewcom.light.rest.report.warehouse.request.ProductLotHistoryRequest
import com.dewcom.light.utils.LightUtils
import grails.transaction.Transactional

import java.text.SimpleDateFormat

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
}
