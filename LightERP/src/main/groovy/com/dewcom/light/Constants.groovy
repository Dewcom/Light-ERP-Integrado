package com.dewcom.light

/**
 * Created by Mauricio Fernández Mora on 08/09/16.
 */
class Constants {

    public static String CREATE_CAMPAIGN_STARTDATE_AND_ENDDATE_PATTERN = "YYYY-MM-dd";

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
}