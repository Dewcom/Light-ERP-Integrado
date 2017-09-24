package com.dewcom.light.billing

import com.dewcom.light.thirdparty.Customer

/**
 * Created by chen on 16/01/17.
 */
class Order {
    Date dueDate
    Customer customer
    static belongsTo = [Customer]
}
