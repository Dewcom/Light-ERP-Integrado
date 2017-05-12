package com.dewcom.light

/**
 * Created by Mauricio Fernández Mora on 08/09/16.
 */
class Constants {

    //Códigos para respuestas REST
    public static final String SUCCESS_RESPONSE = "0";
    public static final String ERROR_APLICACION_LIGHT = "50";
    public static final String ERROR_VALIDACION_DE_CAMPOS = "100";
    public static final String ERROR_VALIDACION_DE_CAMPOS_VACIOS = "101";
    public static final String ERROR_VALIDACION_DE_CAMPOS_BLANK = "102";
    public static final String ERROR_VALIDACION_DE_CAMPOS_MAX = "103";
    public static final String ERROR_VALIDACION_DE_CAMPOS_TAMANO_MAX = "104";
    public static final String ERROR_VALIDACION_DE_CAMPOS_EMAIL = "105";
    public static final String ERROR_VALIDACION_DE_CAMPOS_TAMANO_EXCEDIDO = "106";
    public static final String ERROR_VALIDACION_DE_CAMPOS_TAMANO_MIN = "107";
    public static final String ERROR_VALIDACION_DE_CAMPOS_NO_EN_LISTA = "108";
    public static final String ERROR_VALIDACION_DE_CAMPOS_VALOR_UNICO = "109";
    public static final String ERROR_UNDECLARED_EXCEPTION = "140"; //ESTE CODIGO PODRIA CAMBIAR LUEGO
    public static final String ERROR_RESPONSE_CON_ERRORES = "141"; //ESTE CODIGO PODRIA CAMBIAR LUEGO
    public static final String REGISTER_NOT_FOUND = "142"; //ESTE CODIGO PODRIA CAMBIAR LUEGO

    // Estados para borrado lógico
    public static final Byte ESTADO_ACTIVO = 1;
    public static final Byte ESTADO_INACTIVO = 0;

    //Codigos para el mapeo de errores desde el validate()
    public static final String ERROR_VALIDACION_DE_CAMPOS_VACIOS_ORIG = "nullable";
    public static final String ERROR_VALIDACION_DE_CAMPOS_BLANK_ORIG = "blank";
    public static final String ERROR_VALIDACION_DE_CAMPOS_MAX_ORIG = "max.exceeded";
    public static final String ERROR_VALIDACION_DE_CAMPOS_TAMANO_MAX_ORIG = "maxSize.exceeded";
    public static final String ERROR_VALIDACION_DE_CAMPOS_EMAIL_ORIG = "email.invalid";
    public static final String ERROR_VALIDACION_DE_CAMPOS_TAMANO_EXCEDIDO_ORIG = "size.toobig";
    public static final String ERROR_VALIDACION_DE_CAMPOS_TAMANO_MIN_ORIG = "minSize.notmet";
    public static final String ERROR_VALIDACION_DE_CAMPOS_NO_EN_LISTA_ORIG = "not.inList";
    public static final String ERROR_VALIDACION_DE_CAMPOS_VALOR_UNICO_ORIG = "unique";

    //Contantes de negocio
    public static final double SALES_TAX = 13;

    //codigo de estados facturas
    public static final Integer FACTURA_CREADA = 1;
    public static final Integer FACTURA_VALIDADA =2 ;
    public static final Integer FACTURA_PAGADA_PARCIAL =3;
    public static final Integer FACTURA_PAGADA =4 ;

    //codigos de tipos de monedas
    public static final Integer MONEDA_COLONES = 1;
    public static final Integer MONEDA_DOLARES = 2;

    //codigos de tipos de condiciones de credito
    public static final Integer CREDITO_TREINTA_DIAS = 1;

    //codigos de tipos de pago
    public static final Integer PAGO_CONTADO = 1;
    public static final Integer PAGO_CREDITO = 2;

    //codigos de tipos de impuestos
    public static final Integer IMPUESTO_VENTAS = 1;

    //codigos de tipos de impuestos
    public static final Integer TIPO_CAMBIO_DOLARES = 1;

    //codigos de tipos de calculos SUMATORIOS
    public static final Integer FACTURA_SUBTOTAL = 1;
    public static final Integer FACTURA_TOTAL = 2;
    public static final Integer FACTURA_TOTAL_DESCUENTOS = 3;
    public static final Integer FACTURA_TOTAL_IMPUESTOS = 4;

    //codigo config parametro
    public static final Integer CONFIG_CONSECUTIVO_FACTURA = 0;

    //tipos registro factura
    public static final Integer CREADA_BORRADOR = 0;
    public static final Integer CREADA_VALIDADA = 1;


}