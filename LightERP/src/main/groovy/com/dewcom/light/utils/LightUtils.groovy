package com.dewcom.light.utils

import java.math.RoundingMode
import java.text.DecimalFormat
import java.text.NumberFormat
import java.text.ParseException
import java.text.SimpleDateFormat
import java.time.Instant
import java.time.LocalDate
import java.time.Period
import java.time.ZoneId
import java.time.temporal.ChronoUnit

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
     * @return fecha con dias sumados
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
     * Metodo usado para ver diferencias entre fechas
     * @return Devuelve cantidad de dias
     */
    public static Long daysBetweenDates(Date startDate, Date endDate) {
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Instant startInstant = startDate.toInstant();
        Instant endInstant = endDate.toInstant();
        LocalDate localStartDate = startInstant.atZone(defaultZoneId).toLocalDate();
        LocalDate localEndDate = endInstant.atZone(defaultZoneId).toLocalDate();

        return ChronoUnit.DAYS.between(localStartDate, localEndDate);

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

    /**
     * Metodo usado para formatear un decimal a un numero deseado de decimales
     * @return Devuelve el numero aleatorio
     */
    public static String formatDouble(Double argDouble, int zeros) {
        def result= "0"
        if(argDouble != null){
        String pattern = "0.";
        for(int i = 0; i< zeros; i++ ){
            pattern += "0";
        }

        Locale costaRicaLocale = new Locale("es", "CR");
        NumberFormat nf = NumberFormat.getNumberInstance(costaRicaLocale);
        DecimalFormat df = (DecimalFormat)nf;
        df.setRoundingMode(RoundingMode.HALF_EVEN);
        df.applyPattern(pattern);
            result = df.format(argDouble)
        }

        return  result
    }
}