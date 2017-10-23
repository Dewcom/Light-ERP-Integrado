package com.dewcom.light

import java.text.ParseException
import java.text.SimpleDateFormat
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

/**
 * Created by chen on 12/02/17.
 * Esta clase va contener todos aquellos metodos utilitarios
 */
class LightUtils {

    /**
     * Metodo usado para generar un Long aleatorio
     * @return Devuelve el numero aleatorio
     */

    public static int randInt() {
        Random rand = new Random();
        int randomNum = rand.nextInt((999999 - 1) + 1) + 1;
        return randomNum;
    }

    /**
     * Metodo usado para sumarle dias a una fecha especifica
     * @return Devuelve el numero aleatorio
     */
    public static Date plusDaysToDate(Date argDate, Long days) {
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Instant instant = argDate.toInstant();
        LocalDate localDate = instant.atZone(defaultZoneId).toLocalDate();
        Date newDate = Date.from(localDate.plusDays(days).atStartOfDay(defaultZoneId).toInstant());
        return newDate
    }

    /**
     * Metodo usado para parsear fecha en string a objeto Date
     * @return Devuelve el numero aleatorio
     */
    public static Date stringToDate(String argStringDate, String datePattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(datePattern);
        Date tmpDate;
        try {
            if(argStringDate != null && argStringDate.length() > 0){
                 tmpDate = formatter.parse(argStringDate);
            }
            return tmpDate
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
    /**
     * Metodo usado para parsear fecha en date a objeto String
     * @return Devuelve la fecha formateada
     */
    public static String dateToString(Date argDate, String datePattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(datePattern);
        String tmpDate;
        try {
            if(argDate != null){
                tmpDate = formatter.format(argDate);
            }
            return tmpDate
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    /**
     * Metodo usado para revisar si un string no es blank ni nulo
     * @return Devuelve la fecha formateada
     */
    public static boolean isNotBlank(String pStringToCheck) {
      if(pStringToCheck == null || pStringToCheck.length() == 0){
          return false
      }
         return true
    }
}