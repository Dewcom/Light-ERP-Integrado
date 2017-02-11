package com.dewcom.light

/**
 * Created by chen on 16/01/17.
 */
class Order {
    Date dueDate
    Customer customer
    static belongsTo = [Customer]
}
