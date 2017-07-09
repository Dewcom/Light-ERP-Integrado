'use strict';

angular
    .module('app.services')
    .factory("printService", function ( APP_CONSTANTS, $filter) {

        var printService = {};

        printService.createDocDefinition = function (bill) {
            console.log(bill);
            var vm = this;
            var billNumber = bill.billNumber;
            var billDate = $filter('date')(bill.billDate, "MM-dd-yyyy");
            var dueDate = $filter('date')(bill.dueDate, "MM-dd-yyyy");
            var customerName = bill.customer.name;
            var identificationType = 'Cédula jurídica: ';
            var completeAddress = bill.address.district.name + ', ' + bill.address.canton.name +
                ', ' + bill.address.province.name + ', ' + bill.address.address;

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
                productList.push({productName: value.product.name, taxAmount: value.totalTaxAmount, discountAmount : value.totalDiscount,
                    price: value.product.price, quantity: value.quantity, subtotal: value.total});
            });

            var items = productList.map(function(item) {
                return [{text: item.productName, alignment: 'left'}, item.taxAmount, item.discountAmount, item.price, item.quantity, item.subtotal ];
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
                                            'Fecha de vencimiento: ' + dueDate + '\n',
                                            'Código de cliente: CU' + bill.customer.id + '\n'
                                        ]
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: 'EMPRESA' + '\n', fontSize: 10, bold: true},
                                            'CEDULA\n',
                                            'DIRECCION\n',
                                            'TELEFONO\n',
                                            'CORREO\n',
                                            'WEBSITE'
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        fillColor: '#dddddd',
                                        text: [
                                            {text: customerName + '\n', fontSize: 10, bold: true},
                                            identificationType + bill.customer.identification + '\n',
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
                            widths: ['70%', '6%', '6%', '6%', '6%', '6%'],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: 'Descripción', alignment: 'left', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: 'IVA', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: 'Desc.', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: 'P.U.', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: 'Cant.', bold: true, fontSize : 9}
                                        ]
                                    },
                                    {
                                        border: [false, false, false, false],
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
                                            'Condición de pago: '
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
                                            {text: bill.subTotalAmount, alignment: 'right'}
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
                                            'Total de descuentos:'
                                        ],
                                        fillColor: '#dddddd'
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: bill.totalDiscount, alignment: 'right'}
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
                                            'Total de impuestos:'
                                        ],
                                        fillColor: '#dddddd'
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: [
                                            {text: bill.totalTaxAmount, alignment: 'right'}
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
                                            {text: bill.totalAmount, alignment: 'right'}
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