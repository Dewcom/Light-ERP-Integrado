package com.dewcom.light

/**
 * Created by Mauricio Fernández Mora on 08/09/16.
 */
class LightRuntimeException extends RuntimeException {

    //Datos del sistema que origina el error
    private String systemCode;
    private String systemMessage;
    private Integer system;

    //Datos para presentar al cliente
    private String key;
    private Object[] arguments;

    public SacRuntimeException(String psystemCode, String psystemMessage, Object[] parguments, Integer psystem) {
        super
        this.systemCode = psystemCode;
        this.systemMessage = psystemMessage;
        this.arguments = parguments;
        this.system = psystem;
    }

    public SacRuntimeException(String psystemMessage) {
        super
        this.systemMessage = psystemMessage;
    }

}
