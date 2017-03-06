package com.dewcom.light

/**
 * Created by chen on 12/02/17.
 * Esta clase va contener todos aquellos metodos utilitarios
 */
class LightUtils {

    /**
     *Metodo usado para generar un Long aleatorio
     * @return Devuelve el numero aleatorio
     */

    public static int randInt() {
        Random rand = new Random();
        int randomNum = rand.nextInt((999999 - 1 ) + 1) + 1;
        return randomNum;
    }
}
