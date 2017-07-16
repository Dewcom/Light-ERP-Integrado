'use strict';

angular
    .module('app.services')
    .factory("printService", function ( APP_CONSTANTS, $filter) {

        var printService = {};

        printService.createDocDefinition = function (bill) {
            console.log(bill);
            var vm = this;
            var billNumber = "0";
            var billDate = $filter('date')(bill.billDate, "MM-dd-yyyy");
            var dueDate = $filter('date')(bill.dueDate, "MM-dd-yyyy");
            var customerName = bill.customer.name;
            var identificationType = 'Cédula jurídica: ';
            var completeAddress = bill.address.district.name + ', ' + bill.address.canton.name +
                ', ' + bill.address.province.name + ', ' + bill.address.address;
            var paymentCondition = bill.billPaymentType != null ? bill.billPaymentType.description : "factura sin condición de crédito";
            var pdfSubTotal = bill.subTotalAmount != null ? bill.subTotalAmount.toFixed(2) : "";
            var pdfTotalDiscount = bill.totalDiscount != null ? bill.totalDiscount.toFixed(2) : "";
            var pdfTotalTax = bill.totalTaxAmount != null ? bill.totalTaxAmount.toFixed(2) : "";
            var pdfTotalAmount = bill.totalAmount != null ? bill.totalAmount.toFixed(2) : "";
            var currencySymbol = '\u00A2';

            var zerosNeeded = 0;

            if(bill != undefined){
                if(bill.billNumber != null){
                    zerosNeeded = 5 - parseInt(bill.billNumber.toString().length);

                    for (var i = 0; i < zerosNeeded; i++) {
                        billNumber = billNumber.concat("0");
                    }

                    billNumber = billNumber.concat(bill.billNumber);
                }else{
                    zerosNeeded = 4 - parseInt(bill.id.toString().length);

                    for (var i = 0; i < zerosNeeded; i++) {
                        billNumber = billNumber.concat("0");
                    }
                    billNumber = billNumber.concat("B");
                    billNumber = billNumber.concat(bill.id);
                }
            }

            if(bill.currency.currencyCode == APP_CONSTANTS.CURRENCY_DOLLARS_CODE){
                currencySymbol = '\u0024';
            }

            if(bill.billPaymentType != null && bill.billPaymentType.code == APP_CONSTANTS.PAYMENT_TYPE_CREDIT_CODE){
                paymentCondition = 'Pago a ' + bill.creditCondition.description;
            }

            if(billNumber == null){
                billNumber = 'B' + bill.id;
            }

            if(bill.customer.firstLastName != null){
                customerName += ' ' + bill.customer.firstLastName + ' ' + bill.customer.secondLastName;
            }

            if(bill.customer.identificationType.code == 1){
                identificationType = 'Cédula: '
            }

            var productList = [];

            var totalSize = (11 - parseInt(bill.billDetails.length));

            // Hack para completar de celdas vacias la factura
            var fillingRowsList = [];
            // Hack para completar de celdas vacias la factura
            var emptyList = Array.apply(null, Array(totalSize)).map(function () {});

            angular.forEach(bill.billDetails, function(value, key) {
                productList.push({productName: value.product.name, taxAmount: value.totalTaxAmount.toFixed(2), discountAmount : value.totalDiscount.toFixed(2),
                    price: value.linePrice.toFixed(2), quantity: value.quantity, subtotal: value.total.toFixed(2)});
            });

            var items = productList.map(function(item) {
                return [{text: item.productName, alignment: 'left'}, currencySymbol + item.taxAmount, currencySymbol + item.discountAmount,
                    currencySymbol + item.price, item.quantity, currencySymbol + item.subtotal ];
            });

            //
            angular.forEach(emptyList, function(value, key) {
                fillingRowsList.push({vacio: null });
            });

            var fillingItems = fillingRowsList.map(function(item) {
                return [{
                    border: [true, false, true, false],
                    text: [
                        {text: ' ', bold: true, fontSize : 9}
                    ]
                }];
            });


            var docDefinition = {
                pageSize: 'A4',
                content: [
                    {
                        style: 'headerTable',
                        table: {
                            widths: ['65%', '35%'],
                            height: [50],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        image :APP_CONSTANTS.logo, width: 150, height: 46
                                    },
                                    {
                                        border: [false, false, false, false],
                                        style: 'headerTableBillSection',
                                        text: [
                                            { text: 'Factura No ' + billNumber + '\n', fontSize: 10, bold: true },
                                            'Fecha de facturación: ' + billDate + '\n',
                                            'Fecha de vencimiento: ' + dueDate + '\n'
                                        ]
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: ' Espyco Inc. S.A' + '\n', fontSize: 10, bold: true},
                                            'Cédula jurídica: 3-101-341066-17\n',
                                            'Moravia, San Jeronimo, Costado Sur del Parque\n',
                                            '+506 2292 4141\n',
                                            'info@espyco.com\n',
                                            'www.espyco.com'
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        fillColor: '#dddddd',
                                        text: [
                                            {text: customerName + '\n', fontSize: 10, bold: true},
                                            identificationType + bill.customer.identification + '\n',
                                            'Teléfono: ' + + bill.customer.phoneNumber1 + '\n',
                                            'Dirección: ' + completeAddress
                                        ]
                                    }
                                ]
                            ]
                        },
                        layout: {
                            defaultBorder: false,
                        }
                    },
                    {
                        style: 'bodyTable',
                        table: {
                            widths: ['45%', '10%', '11%', '12%', '11%', '11%'],
                            body: [
                                [
                                    {
                                        border: [false, false, false, true],
                                        text: [
                                            {text: 'Descripción', alignment: 'left', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, true],
                                        text: [
                                            {text: 'IVA', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, true],
                                        text: [
                                            {text: 'Descuento', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, true],
                                        text: [
                                            {text: 'P.U.', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, true],
                                        text: [
                                            {text: 'Cantidad', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, true],
                                        text: [
                                            {text: 'Subtotal', bold: true, fontSize : 9}
                                        ]
                                    }
                                ]
                            ].concat(items)
                        },
                        layout: {
                            defaultBorder: true
                        }
                    },
                    {
                        table: {
                            widths: ['100%'],
                            body: [
                            ].concat(fillingItems)
                        },
                        layout: {
                            defaultBorder: false
                        }
                    },
                    {
                        style: 'footerTable',
                        table: {
                            widths: ['66%', '23%', '11%'],
                            body: [
                                [
                                    {
                                        border: [false, true, false, false],
                                        text: [
                                            'Condición de pago: ' + paymentCondition
                                        ]
                                    },
                                    {
                                        border: [false, true, false, false],
                                        text: [
                                            'Subtotal: '
                                        ],
                                        fillColor: '#dddddd'
                                    },
                                    {
                                        border: [false, true, false, false],
                                        text: [
                                            {text: currencySymbol + pdfSubTotal, alignment: 'right'}
                                        ],
                                        fillColor: '#dddddd'
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: 'Autorizado mediante oficio N 4521000004272 del día 20/07/2009 de la dirección general de tributación directa.', bold: false, fontSize : 6}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            'Total de descuentos:'
                                        ],
                                        fillColor: '#dddddd'
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: currencySymbol + pdfTotalDiscount, alignment: 'right'}
                                        ],
                                        fillColor: '#dddddd'
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            ''
                                        ],
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            'Total de impuestos:'
                                        ],
                                        fillColor: '#dddddd'
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: currencySymbol + pdfTotalTax, alignment: 'right'}
                                        ],
                                        fillColor: '#dddddd'
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            ''
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            'Total:'
                                        ],
                                        fillColor: '#dddddd'
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: currencySymbol + pdfTotalAmount, alignment: 'right'}
                                        ],
                                        fillColor: '#dddddd'
                                    }
                                ]
                            ]
                        },
                        layout: {
                            defaultBorder: false
                        }
                    }
                ],
                styles: {
                    headerTable: {
                        fontSize: 8,
                        bold: false,
                        margin: [0, 0, 0, 20]
                    },
                    headerTableBillSection: {
                        alignment: 'right',
                        fontSize: 8,
                        bold: false
                    },
                    bodyTable: {
                        alignment: 'center',
                        fontSize: 7,
                        bold: false
                    },
                    footerTable: {
                        fontSize: 8,
                        bold: false
                    }
                }
            };

            return docDefinition;
        };

        return printService;
    });