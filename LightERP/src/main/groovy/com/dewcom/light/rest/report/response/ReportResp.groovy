package com.dewcom.light.rest.report.response

import com.dewcom.light.rest.report.warehouse.response.WarehouseProductLegacyReportSummary

/**
 * Created by lchen on 9/4/17.
 */
class ReportResp {
    def reportHeader
    List reportData = []
    def reportSummary = new WarehouseProductLegacyReportSummary()
}
