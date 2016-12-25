package com.dewcom.light

import grails.transaction.Transactional

@Transactional
class ProductService {

    def messageSource

    def createProduct(Product pproduct) {
        try {
            pproduct.save(flush: true, failOnError: true)
        } catch (Exception e) {
            log.error(e);
            throw new LightRuntimeException(messageSource.getMessage("create.product.error", null, Locale.default));
        }
    }
}
