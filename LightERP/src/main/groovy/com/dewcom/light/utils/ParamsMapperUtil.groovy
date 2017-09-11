package com.dewcom.light.utils

import com.dewcom.light.rest.report.customer.request.CustomerPurchasesReportReq

/**
 * Created by lchen on 9/8/17.
 */
class ParamsMapperUtil {

    def static buildReportDtoFromParams(def pTargetObject, def pOriginParams){
        def returnObject;

        switch (pTargetObject){
            case CustomerPurchasesReportReq :
                returnObject = buildCustomerPurchasesReportDto(pOriginParams, pTargetObject)
            break

            default:
                returnObject = null
                break
        }
        returnObject
    }

    def static buildCustomerPurchasesReportDto(def params,  CustomerPurchasesReportReq pReq ){
        pReq.customerIdentification = params.customerIdentification;
        pReq.startDate = params.startDate;
        pReq.productCode = params.productCode;
        pReq.endDate = params.endDate;
        pReq
    }
}
