// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.services',
            'app.pages',
            'app.core',
            'app.routes',
            'app.sidebar',
            //'app.navsearch',
            //'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            'app.tables',
            'app.forms',
            'app.adminConfig',
            'app.client',
            'app.product',
            'app.storehouse',
            'app.productLot',
            'app.warehouse',
            'app.user',
            'app.bill',
            'app.charts',
            'base64'

        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils'

        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.client', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.product', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.storehouse', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.warehouse', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.productLot', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.user', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.bill', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.charts', [
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.services', []);
})();

(function() {
    'use strict';

    angular
        .module('app.pages', []);
})();


(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();
(function() {
    'use strict';

    angular
        .module('app.tables', []);
})();
(function() {
    'use strict';

    angular
        .module('app.forms', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.notify', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
            'app.colors'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
            'primary':                '#5d9cec',
            'success':                '#27c24c',
            'info':                   '#23b7e5',
            'warning':                '#ff902b',
            'danger':                 '#f05050',
            'inverse':                '#131e26',
            'green':                  '#37bc9b',
            'pink':                   '#f532e5',
            'purple':                 '#7266ba',
            'dark':                   '#3a3f51',
            'yellow':                 '#fad732',
            'gray-darker':            '#232735',
            'gray-dark':              '#3a3f51',
            'gray':                   '#dde6e9',
            'gray-light':             '#e4eaec',
            'gray-lighter':           '#edf1f2'
        })
    ;
})();
(function() {
    'use strict';

    angular
        .module('app.adminConfig', []);
})();
(function() {
    'use strict';

    angular
        .module('app.client', []);
})();
(function() {
    'use strict';

    angular
        .module('app.user', []);
})();
(function() {
    'use strict';

    angular
        .module('app.bill', []);
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
            return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

        var core = angular.module('app.core');
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive  = $compileProvider.directive;
        core.filter     = $filterProvider.register;
        core.factory    = $provide.factory;
        core.service    = $provide.service;
        core.constant   = $provide.constant;
        core.value      = $provide.value;

        // Disables animation on items with class .ng-no-animation
        $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

        // Improve performance disabling debugging features
        // $compileProvider.debugInfoEnabled(false);

    }

})();

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    var provinces = [
        {
            "idProvince": 1,
            "name": "San José"
        },
        {
            "idProvince": 2,
            "name": "Alajuela"
        },
        {
            "idProvince": 3,
            "name": "Cartago"
        },
        {
            "idProvince": 4,
            "name": "Heredia"
        },
        {
            "idProvince": 5,
            "name": "Guanacaste"
        },
        {
            "idProvince": 6,
            "name": "Puntarenas"
        },
        {
            "idProvince": 7,
            "name": "Limón"
        }
    ];

    var cantons = [
        {
            "idProvince": "1",
            "idCanton": "1",
            "name": "San José"
        },
        {
            "idProvince": "1",
            "idCanton": "2",
            "name": "Escazú"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "name": "Desamparados"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "name": "Puriscal"
        },
        {
            "idProvince": "1",
            "idCanton": "5",
            "name": "Tarrazú"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "name": "Aserrí"
        },
        {
            "idProvince": "1",
            "idCanton": "7",
            "name": "Mora"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "name": "Goicoechea"
        },
        {
            "idProvince": "1",
            "idCanton": "9",
            "name": "Santa Ana"
        },
        {
            "idProvince": "1",
            "idCanton": "10",
            "name": "Alajuelita"
        },
        {
            "idProvince": "1",
            "idCanton": "11",
            "name": "Vázquez de Coronado"
        },
        {
            "idProvince": "1",
            "idCanton": "12",
            "name": "Acosta"
        },
        {
            "idProvince": "1",
            "idCanton": "13",
            "name": "Tibás"
        },
        {
            "idProvince": "1",
            "idCanton": "14",
            "name": "Moravia"
        },
        {
            "idProvince": "1",
            "idCanton": "15",
            "name": "Montes de Oca"
        },
        {
            "idProvince": "1",
            "idCanton": "16",
            "name": "Turrubares"
        },
        {
            "idProvince": "1",
            "idCanton": "17",
            "name": "Dota"
        },
        {
            "idProvince": "1",
            "idCanton": "18",
            "name": "Curridabat"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "name": "Perez Zeledón"
        },
        {
            "idProvince": "1",
            "idCanton": "20",
            "name": "León Cortés"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "name": "Alajuela"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "name": "Atenas"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "name": "Grecia"
        },
        {
            "idProvince": "2",
            "idCanton": "24",
            "name": "Guatuso"
        },
        {
            "idProvince": "2",
            "idCanton": "25",
            "name": "Los Chiles"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "name": "Naranjo"
        },
        {
            "idProvince": "2",
            "idCanton": "27",
            "name": "Orotina"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "name": "Palmares"
        },
        {
            "idProvince": "2",
            "idCanton": "29",
            "name": "Poás"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "name": "San Carlos"
        },
        {
            "idProvince": "2",
            "idCanton": "31",
            "name": "San Mateo"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "name": "San Ramón"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "name": "Upala"
        },
        {
            "idProvince": "2",
            "idCanton": "34",
            "name": "Valverde Vega"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "name": "Zarcero"
        },
        {
            "idProvince": "3",
            "idCanton": "36",
            "name": "Alvarado"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "name": "Cartago"
        },
        {
            "idProvince": "3",
            "idCanton": "38",
            "name": "El Guarco"
        },
        {
            "idProvince": "3",
            "idCanton": "39",
            "name": "Jimenez"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "name": "La Unión"
        },
        {
            "idProvince": "3",
            "idCanton": "41",
            "name": "Oreamuno"
        },
        {
            "idProvince": "3",
            "idCanton": "42",
            "name": "Paraiso"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "name": "Turrialba"
        },
        {
            "idProvince": "4",
            "idCanton": "44",
            "name": "Barva"
        },
        {
            "idProvince": "4",
            "idCanton": "45",
            "name": "Belén"
        },
        {
            "idProvince": "4",
            "idCanton": "46",
            "name": "Flores"
        },
        {
            "idProvince": "4",
            "idCanton": "47",
            "name": "Heredia"
        },
        {
            "idProvince": "4",
            "idCanton": "48",
            "name": "San Isidro"
        },
        {
            "idProvince": "4",
            "idCanton": "49",
            "name": "San Pablo"
        },
        {
            "idProvince": "4",
            "idCanton": "50",
            "name": "San Rafael"
        },
        {
            "idProvince": "4",
            "idCanton": "51",
            "name": "Santa Barbara"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "name": "Santo Domingo"
        },
        {
            "idProvince": "4",
            "idCanton": "53",
            "name": "Sarapiquí"
        },
        {
            "idProvince": "5",
            "idCanton": "54",
            "name": "Abangares"
        },
        {
            "idProvince": "5",
            "idCanton": "55",
            "name": "Bagaces"
        },
        {
            "idProvince": "5",
            "idCanton": "56",
            "name": "Carrillo"
        },
        {
            "idProvince": "5",
            "idCanton": "57",
            "name": "Cañas"
        },
        {
            "idProvince": "5",
            "idCanton": "58",
            "name": "Hojancha"
        },
        {
            "idProvince": "5",
            "idCanton": "59",
            "name": "La Cruz"
        },
        {
            "idProvince": "5",
            "idCanton": "60",
            "name": "Liberia"
        },
        {
            "idProvince": "5",
            "idCanton": "61",
            "name": "Nandayure"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "name": "Nicoya"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "name": "Santa Cruz"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "name": "Tilarán"
        },
        {
            "idProvince": "6",
            "idCanton": "65",
            "name": "Aguirre"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "name": "Buenos Aires"
        },
        {
            "idProvince": "6",
            "idCanton": "67",
            "name": "Corredores"
        },
        {
            "idProvince": "6",
            "idCanton": "68",
            "name": "Coto Brus"
        },
        {
            "idProvince": "6",
            "idCanton": "69",
            "name": "Esparza"
        },
        {
            "idProvince": "6",
            "idCanton": "70",
            "name": "Garabito"
        },
        {
            "idProvince": "6",
            "idCanton": "71",
            "name": "Golfito"
        },
        {
            "idProvince": "6",
            "idCanton": "72",
            "name": "Montes de Oro"
        },
        {
            "idProvince": "6",
            "idCanton": "73",
            "name": "Osa"
        },
        {
            "idProvince": "6",
            "idCanton": "74",
            "name": "Parrita"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "name": "Puntarenas"
        },
        {
            "idProvince": "7",
            "idCanton": "76",
            "name": "Guacimo"
        },
        {
            "idProvince": "7",
            "idCanton": "77",
            "name": "Limon"
        },
        {
            "idProvince": "7",
            "idCanton": "78",
            "name": "Matina"
        },
        {
            "idProvince": "7",
            "idCanton": "79",
            "name": "Pococí"
        },
        {
            "idProvince": "7",
            "idCanton": "80",
            "name": "Siquirres"
        },
        {
            "idProvince": "7",
            "idCanton": "81",
            "name": "Talamanca"
        }
    ];

    var districts = [
        {
            "idProvince": "1",
            "idCanton": "12",
            "idDistrict": "1",
            "name": "Cangrejal"
        },
        {
            "idProvince": "1",
            "idCanton": "12",
            "idDistrict": "2",
            "name": "Guaitíl"
        },
        {
            "idProvince": "1",
            "idCanton": "12",
            "idDistrict": "3",
            "name": "Palmichal"
        },
        {
            "idProvince": "1",
            "idCanton": "12",
            "idDistrict": "4",
            "name": "Sabanillas"
        },
        {
            "idProvince": "1",
            "idCanton": "12",
            "idDistrict": "5",
            "name": "San Ignacio"
        },
        {
            "idProvince": "1",
            "idCanton": "10",
            "idDistrict": "6",
            "name": "Alajuelita"
        },
        {
            "idProvince": "1",
            "idCanton": "10",
            "idDistrict": "7",
            "name": "Concepción"
        },
        {
            "idProvince": "1",
            "idCanton": "10",
            "idDistrict": "8",
            "name": "San Antonio"
        },
        {
            "idProvince": "1",
            "idCanton": "10",
            "idDistrict": "9",
            "name": "San Felipe"
        },
        {
            "idProvince": "1",
            "idCanton": "10",
            "idDistrict": "10",
            "name": "San Josecito"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "idDistrict": "11",
            "name": "Aserrí"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "idDistrict": "12",
            "name": "Legua"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "idDistrict": "13",
            "name": "Monterrey"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "idDistrict": "14",
            "name": "Salitrillos"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "idDistrict": "15",
            "name": "San Gabriel"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "idDistrict": "16",
            "name": "Tarbaca (Praga)"
        },
        {
            "idProvince": "1",
            "idCanton": "6",
            "idDistrict": "17",
            "name": "Vuelta de Jorco"
        },
        {
            "idProvince": "1",
            "idCanton": "18",
            "idDistrict": "18",
            "name": "Curridabat"
        },
        {
            "idProvince": "1",
            "idCanton": "18",
            "idDistrict": "19",
            "name": "Granadilla"
        },
        {
            "idProvince": "1",
            "idCanton": "18",
            "idDistrict": "20",
            "name": "Sánchez"
        },
        {
            "idProvince": "1",
            "idCanton": "18",
            "idDistrict": "21",
            "name": "Tirrases"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "22",
            "name": "Damas"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "23",
            "name": "Desamparados"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "24",
            "name": "Frailes"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "25",
            "name": "Gravilias"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "26",
            "name": "Los Guido"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "27",
            "name": "Patarrá"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "28",
            "name": "Rosario"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "29",
            "name": "San Antonio"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "30",
            "name": "San Cristóbal"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "31",
            "name": "San Juan de Dios"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "32",
            "name": "San Miguel"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "33",
            "name": "San Rafael"
        },
        {
            "idProvince": "1",
            "idCanton": "3",
            "idDistrict": "34",
            "name": "San Rafael Abajo"
        },
        {
            "idProvince": "1",
            "idCanton": "17",
            "idDistrict": "35",
            "name": "Copey"
        },
        {
            "idProvince": "1",
            "idCanton": "17",
            "idDistrict": "36",
            "name": "Jardin"
        },
        {
            "idProvince": "1",
            "idCanton": "17",
            "idDistrict": "37",
            "name": "Santa María"
        },
        {
            "idProvince": "1",
            "idCanton": "2",
            "idDistrict": "38",
            "name": "Escazú"
        },
        {
            "idProvince": "1",
            "idCanton": "2",
            "idDistrict": "39",
            "name": "San Antonio"
        },
        {
            "idProvince": "1",
            "idCanton": "2",
            "idDistrict": "40",
            "name": "San Rafael"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "idDistrict": "41",
            "name": "Calle Blancos"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "idDistrict": "42",
            "name": "Guadalupe"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "idDistrict": "43",
            "name": "Ipís"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "idDistrict": "44",
            "name": "Mata de Platano"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "idDistrict": "45",
            "name": "Purral"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "idDistrict": "46",
            "name": "Rancho Redondo"
        },
        {
            "idProvince": "1",
            "idCanton": "8",
            "idDistrict": "47",
            "name": "San Francisco"
        },
        {
            "idProvince": "1",
            "idCanton": "20",
            "idDistrict": "48",
            "name": "Llano Bonito"
        },
        {
            "idProvince": "1",
            "idCanton": "20",
            "idDistrict": "49",
            "name": "San Andrés"
        },
        {
            "idProvince": "1",
            "idCanton": "20",
            "idDistrict": "50",
            "name": "San Antonio"
        },
        {
            "idProvince": "1",
            "idCanton": "20",
            "idDistrict": "51",
            "name": "San Isidro"
        },
        {
            "idProvince": "1",
            "idCanton": "20",
            "idDistrict": "52",
            "name": "San Pablo"
        },
        {
            "idProvince": "1",
            "idCanton": "20",
            "idDistrict": "53",
            "name": "Santa Cruz"
        },
        {
            "idProvince": "1",
            "idCanton": "15",
            "idDistrict": "54",
            "name": "Mercedes (Betania)"
        },
        {
            "idProvince": "1",
            "idCanton": "15",
            "idDistrict": "55",
            "name": "Sabanilla"
        },
        {
            "idProvince": "1",
            "idCanton": "15",
            "idDistrict": "56",
            "name": "San Pedro"
        },
        {
            "idProvince": "1",
            "idCanton": "15",
            "idDistrict": "57",
            "name": "San Rafael"
        },
        {
            "idProvince": "1",
            "idCanton": "7",
            "idDistrict": "58",
            "name": "Colón"
        },
        {
            "idProvince": "1",
            "idCanton": "7",
            "idDistrict": "59",
            "name": "Guayabo"
        },
        {
            "idProvince": "1",
            "idCanton": "7",
            "idDistrict": "60",
            "name": "Picagres"
        },
        {
            "idProvince": "1",
            "idCanton": "7",
            "idDistrict": "61",
            "name": "Piedras Negras"
        },
        {
            "idProvince": "1",
            "idCanton": "7",
            "idDistrict": "62",
            "name": "Tabarcia"
        },
        {
            "idProvince": "1",
            "idCanton": "14",
            "idDistrict": "63",
            "name": "San Jerónimo"
        },
        {
            "idProvince": "1",
            "idCanton": "14",
            "idDistrict": "64",
            "name": "San Vicente"
        },
        {
            "idProvince": "1",
            "idCanton": "14",
            "idDistrict": "65",
            "name": "Trinidad"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "66",
            "name": "Barú"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "67",
            "name": "Cajón"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "68",
            "name": "Daniel Flores"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "69",
            "name": "General"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "70",
            "name": "Pejibaye"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "71",
            "name": "Platanares"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "72",
            "name": "Páramo"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "73",
            "name": "Rivas"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "74",
            "name": "Río Nuevo"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "75",
            "name": "San Isidro del General"
        },
        {
            "idProvince": "1",
            "idCanton": "19",
            "idDistrict": "76",
            "name": "San Pedro"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "77",
            "name": "Barbacoas"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "78",
            "name": "Candelaria"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "79",
            "name": "Chires"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "80",
            "name": "Desamparaditos"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "81",
            "name": "Grifo Alto"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "82",
            "name": "Mercedes Sur"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "83",
            "name": "San Antonio"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "84",
            "name": "San Rafael"
        },
        {
            "idProvince": "1",
            "idCanton": "4",
            "idDistrict": "85",
            "name": "Santiago"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "86",
            "name": "Catedral"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "87",
            "name": "El Carmen"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "88",
            "name": "Hatillo"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "89",
            "name": "Hospital"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "90",
            "name": "Mata Redonda"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "91",
            "name": "Merced"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "92",
            "name": "Pavas"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "93",
            "name": "San Francisco de Dos Rios"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "94",
            "name": "San Sebastián"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "95",
            "name": "Uruca"
        },
        {
            "idProvince": "1",
            "idCanton": "1",
            "idDistrict": "96",
            "name": "Zapote"
        },
        {
            "idProvince": "1",
            "idCanton": "9",
            "idDistrict": "97",
            "name": "Brasil"
        },
        {
            "idProvince": "1",
            "idCanton": "9",
            "idDistrict": "98",
            "name": "Piedades"
        },
        {
            "idProvince": "1",
            "idCanton": "9",
            "idDistrict": "99",
            "name": "Pozos (Concepción)"
        },
        {
            "idProvince": "1",
            "idCanton": "9",
            "idDistrict": "100",
            "name": "Salitral"
        },
        {
            "idProvince": "1",
            "idCanton": "9",
            "idDistrict": "101",
            "name": "Santa Ana"
        },
        {
            "idProvince": "1",
            "idCanton": "9",
            "idDistrict": "102",
            "name": "Uruca o San Joaquín"
        },
        {
            "idProvince": "1",
            "idCanton": "5",
            "idDistrict": "103",
            "name": "San Carlos"
        },
        {
            "idProvince": "1",
            "idCanton": "5",
            "idDistrict": "104",
            "name": "San Lorenzo"
        },
        {
            "idProvince": "1",
            "idCanton": "5",
            "idDistrict": "105",
            "name": "San Marcos"
        },
        {
            "idProvince": "1",
            "idCanton": "13",
            "idDistrict": "106",
            "name": "Anselmo Llorente"
        },
        {
            "idProvince": "1",
            "idCanton": "13",
            "idDistrict": "107",
            "name": "Cinco Esquinas"
        },
        {
            "idProvince": "1",
            "idCanton": "13",
            "idDistrict": "108",
            "name": "Colima"
        },
        {
            "idProvince": "1",
            "idCanton": "13",
            "idDistrict": "109",
            "name": "Leon XIII"
        },
        {
            "idProvince": "1",
            "idCanton": "13",
            "idDistrict": "110",
            "name": "San Juan"
        },
        {
            "idProvince": "1",
            "idCanton": "16",
            "idDistrict": "111",
            "name": "Cárara"
        },
        {
            "idProvince": "1",
            "idCanton": "16",
            "idDistrict": "112",
            "name": "San Juan de Mata"
        },
        {
            "idProvince": "1",
            "idCanton": "16",
            "idDistrict": "113",
            "name": "San Luis"
        },
        {
            "idProvince": "1",
            "idCanton": "16",
            "idDistrict": "114",
            "name": "San Pablo"
        },
        {
            "idProvince": "1",
            "idCanton": "16",
            "idDistrict": "115",
            "name": "San Pedro"
        },
        {
            "idProvince": "1",
            "idCanton": "11",
            "idDistrict": "116",
            "name": "Cascajal"
        },
        {
            "idProvince": "1",
            "idCanton": "11",
            "idDistrict": "117",
            "name": "Dulce Nombre de Jesús"
        },
        {
            "idProvince": "1",
            "idCanton": "11",
            "idDistrict": "118",
            "name": "Patalillo"
        },
        {
            "idProvince": "1",
            "idCanton": "11",
            "idDistrict": "119",
            "name": "San Isidro"
        },
        {
            "idProvince": "1",
            "idCanton": "11",
            "idDistrict": "120",
            "name": "San Rafael"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "121",
            "name": "Alajuela"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "122",
            "name": "Carrizal"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "123",
            "name": "Desamparados"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "124",
            "name": "Garita"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "125",
            "name": "Guácima"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "126",
            "name": "Río Segundo"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "127",
            "name": "Sabanilla"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "128",
            "name": "San Antonio"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "129",
            "name": "San Isidro"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "130",
            "name": "San Jose"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "131",
            "name": "San Rafael"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "132",
            "name": "Sarapiquí"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "133",
            "name": "Tambor"
        },
        {
            "idProvince": "2",
            "idCanton": "21",
            "idDistrict": "134",
            "name": "Turrúcares"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "135",
            "name": "Atenas"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "136",
            "name": "Concepción"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "137",
            "name": "Escobal"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "138",
            "name": "Jesús"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "139",
            "name": "Mercedes"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "140",
            "name": "San Isidro"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "141",
            "name": "San Jose"
        },
        {
            "idProvince": "2",
            "idCanton": "22",
            "idDistrict": "142",
            "name": "Santa Eulalia"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "143",
            "name": "Bolívar"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "144",
            "name": "Grecia"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "145",
            "name": "Puente de Piedra"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "146",
            "name": "Río Cuarto"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "147",
            "name": "San Isidro"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "148",
            "name": "San Jose"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "149",
            "name": "San Roque"
        },
        {
            "idProvince": "2",
            "idCanton": "23",
            "idDistrict": "150",
            "name": "Tacares"
        },
        {
            "idProvince": "2",
            "idCanton": "24",
            "idDistrict": "151",
            "name": "Buenavista"
        },
        {
            "idProvince": "2",
            "idCanton": "24",
            "idDistrict": "152",
            "name": "Cote"
        },
        {
            "idProvince": "2",
            "idCanton": "24",
            "idDistrict": "153",
            "name": "Katira"
        },
        {
            "idProvince": "2",
            "idCanton": "24",
            "idDistrict": "154",
            "name": "San Rafael"
        },
        {
            "idProvince": "2",
            "idCanton": "25",
            "idDistrict": "155",
            "name": "Caño Negro"
        },
        {
            "idProvince": "2",
            "idCanton": "25",
            "idDistrict": "156",
            "name": "El Amparo"
        },
        {
            "idProvince": "2",
            "idCanton": "25",
            "idDistrict": "157",
            "name": "Los Chiles"
        },
        {
            "idProvince": "2",
            "idCanton": "25",
            "idDistrict": "158",
            "name": "San Jorge"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "159",
            "name": "Cirrí Sur"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "160",
            "name": "Naranjo"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "161",
            "name": "Palmitos"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "162",
            "name": "Rosario"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "163",
            "name": "San Jerónimo"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "164",
            "name": "San Jose"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "165",
            "name": "San Juan"
        },
        {
            "idProvince": "2",
            "idCanton": "26",
            "idDistrict": "166",
            "name": "San Miguel"
        },
        {
            "idProvince": "2",
            "idCanton": "27",
            "idDistrict": "167",
            "name": "Ceiba"
        },
        {
            "idProvince": "2",
            "idCanton": "27",
            "idDistrict": "168",
            "name": "Coyolar"
        },
        {
            "idProvince": "2",
            "idCanton": "27",
            "idDistrict": "169",
            "name": "Hacienda Vieja"
        },
        {
            "idProvince": "2",
            "idCanton": "27",
            "idDistrict": "170",
            "name": "Mastate"
        },
        {
            "idProvince": "2",
            "idCanton": "27",
            "idDistrict": "171",
            "name": "Orotina"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "idDistrict": "172",
            "name": "Buenos Aires"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "idDistrict": "173",
            "name": "Candelaria"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "idDistrict": "174",
            "name": "Esquipulas"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "idDistrict": "175",
            "name": "Granja"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "idDistrict": "176",
            "name": "Palmares"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "idDistrict": "177",
            "name": "Santiago"
        },
        {
            "idProvince": "2",
            "idCanton": "28",
            "idDistrict": "178",
            "name": "Zaragoza"
        },
        {
            "idProvince": "2",
            "idCanton": "29",
            "idDistrict": "179",
            "name": "Carrillos"
        },
        {
            "idProvince": "2",
            "idCanton": "29",
            "idDistrict": "180",
            "name": "Sabana Redonda"
        },
        {
            "idProvince": "2",
            "idCanton": "29",
            "idDistrict": "181",
            "name": "San Juan"
        },
        {
            "idProvince": "2",
            "idCanton": "29",
            "idDistrict": "182",
            "name": "San Pedro"
        },
        {
            "idProvince": "2",
            "idCanton": "29",
            "idDistrict": "183",
            "name": "San Rafael"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "184",
            "name": "Aguas Zarcas"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "185",
            "name": "Buena Vista"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "186",
            "name": "Cutris"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "187",
            "name": "Florencia"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "188",
            "name": "Fortuna"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "189",
            "name": "Monterrey"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "190",
            "name": "Palmera"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "191",
            "name": "Pital"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "192",
            "name": "Pocosol"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "193",
            "name": "Quesada"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "194",
            "name": "Tigra"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "195",
            "name": "Venado"
        },
        {
            "idProvince": "2",
            "idCanton": "30",
            "idDistrict": "196",
            "name": "Venecia"
        },
        {
            "idProvince": "2",
            "idCanton": "31",
            "idDistrict": "197",
            "name": "Desmonte"
        },
        {
            "idProvince": "2",
            "idCanton": "31",
            "idDistrict": "198",
            "name": "Jesús María"
        },
        {
            "idProvince": "2",
            "idCanton": "31",
            "idDistrict": "199",
            "name": "San Mateo"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "200",
            "name": "Alfaro"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "201",
            "name": "Angeles"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "202",
            "name": "Concepción"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "203",
            "name": "Piedades Norte"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "204",
            "name": "Piedades Sur"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "205",
            "name": "San Isidro"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "206",
            "name": "San Isidro de Peñas Blancas"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "207",
            "name": "San Juan"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "208",
            "name": "San Rafael"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "209",
            "name": "San Ramón"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "210",
            "name": "Santiago"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "211",
            "name": "Volio"
        },
        {
            "idProvince": "2",
            "idCanton": "32",
            "idDistrict": "212",
            "name": "Zapotal"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "idDistrict": "213",
            "name": "Aguas Claras"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "idDistrict": "214",
            "name": "Bijagua"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "idDistrict": "215",
            "name": "Delicias"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "idDistrict": "216",
            "name": "Dos Ríos"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "idDistrict": "217",
            "name": "San José (Pizote)"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "idDistrict": "218",
            "name": "Upala"
        },
        {
            "idProvince": "2",
            "idCanton": "33",
            "idDistrict": "219",
            "name": "Yolillal"
        },
        {
            "idProvince": "2",
            "idCanton": "34",
            "idDistrict": "220",
            "name": "Rodríguez"
        },
        {
            "idProvince": "2",
            "idCanton": "34",
            "idDistrict": "221",
            "name": "San Pedro"
        },
        {
            "idProvince": "2",
            "idCanton": "34",
            "idDistrict": "222",
            "name": "Sarchí Norte"
        },
        {
            "idProvince": "2",
            "idCanton": "34",
            "idDistrict": "223",
            "name": "Sarchí Sur"
        },
        {
            "idProvince": "2",
            "idCanton": "34",
            "idDistrict": "224",
            "name": "Toro Amarillo"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "225",
            "name": "Guadalupe"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "226",
            "name": "Katira"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "227",
            "name": "Laguna"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "228",
            "name": "Las Brisas"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "229",
            "name": "Palmira"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "230",
            "name": "Tapezco"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "231",
            "name": "Zapote"
        },
        {
            "idProvince": "2",
            "idCanton": "35",
            "idDistrict": "232",
            "name": "Zarcero"
        },
        {
            "idProvince": "3",
            "idCanton": "36",
            "idDistrict": "233",
            "name": "Capellades"
        },
        {
            "idProvince": "3",
            "idCanton": "36",
            "idDistrict": "234",
            "name": "Cervantes"
        },
        {
            "idProvince": "3",
            "idCanton": "36",
            "idDistrict": "235",
            "name": "Pacayas"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "236",
            "name": "Aguacaliente o San Francisco"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "237",
            "name": "Carmen"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "238",
            "name": "Corralillo"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "239",
            "name": "Dulce Nombre"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "240",
            "name": "Guadalupe o Arenilla"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "241",
            "name": "Llano Grande"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "242",
            "name": "Occidental"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "243",
            "name": "Oriental"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "244",
            "name": "Quebradilla"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "245",
            "name": "San Nicolás"
        },
        {
            "idProvince": "3",
            "idCanton": "37",
            "idDistrict": "246",
            "name": "Tierra Blanca"
        },
        {
            "idProvince": "3",
            "idCanton": "38",
            "idDistrict": "247",
            "name": "El Tejar"
        },
        {
            "idProvince": "3",
            "idCanton": "38",
            "idDistrict": "248",
            "name": "Patio de Agua"
        },
        {
            "idProvince": "3",
            "idCanton": "38",
            "idDistrict": "249",
            "name": "San Isidro"
        },
        {
            "idProvince": "3",
            "idCanton": "38",
            "idDistrict": "250",
            "name": "Tobosí"
        },
        {
            "idProvince": "3",
            "idCanton": "39",
            "idDistrict": "251",
            "name": "Juan Viñas"
        },
        {
            "idProvince": "3",
            "idCanton": "39",
            "idDistrict": "252",
            "name": "Pejibaye"
        },
        {
            "idProvince": "3",
            "idCanton": "39",
            "idDistrict": "253",
            "name": "Tucurrique"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "254",
            "name": "Concepción"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "255",
            "name": "Dulce Nombre"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "256",
            "name": "Río Azul"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "257",
            "name": "San Diego"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "258",
            "name": "San Juan"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "259",
            "name": "San Rafael"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "260",
            "name": "San Ramón"
        },
        {
            "idProvince": "3",
            "idCanton": "40",
            "idDistrict": "261",
            "name": "Tres Ríos"
        },
        {
            "idProvince": "3",
            "idCanton": "41",
            "idDistrict": "262",
            "name": "Cipreses"
        },
        {
            "idProvince": "3",
            "idCanton": "41",
            "idDistrict": "263",
            "name": "Cot"
        },
        {
            "idProvince": "3",
            "idCanton": "41",
            "idDistrict": "264",
            "name": "Potrero Cerrado"
        },
        {
            "idProvince": "3",
            "idCanton": "41",
            "idDistrict": "265",
            "name": "San Rafael"
        },
        {
            "idProvince": "3",
            "idCanton": "41",
            "idDistrict": "266",
            "name": "Santa Rosa"
        },
        {
            "idProvince": "3",
            "idCanton": "42",
            "idDistrict": "267",
            "name": "Cachí"
        },
        {
            "idProvince": "3",
            "idCanton": "42",
            "idDistrict": "268",
            "name": "Llanos de Santa Lucia"
        },
        {
            "idProvince": "3",
            "idCanton": "42",
            "idDistrict": "269",
            "name": "Orosí"
        },
        {
            "idProvince": "3",
            "idCanton": "42",
            "idDistrict": "270",
            "name": "Paraíso"
        },
        {
            "idProvince": "3",
            "idCanton": "42",
            "idDistrict": "271",
            "name": "Santiago"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "272",
            "name": "Chirripo"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "273",
            "name": "La Isabel"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "274",
            "name": "La Suiza"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "275",
            "name": "Pavones"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "276",
            "name": "Peralta"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "277",
            "name": "Santa Cruz"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "278",
            "name": "Santa Rosa"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "279",
            "name": "Santa Teresita"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "280",
            "name": "Tayutic"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "281",
            "name": "Tres Equis"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "282",
            "name": "Tuis"
        },
        {
            "idProvince": "3",
            "idCanton": "43",
            "idDistrict": "283",
            "name": "Turrialba"
        },
        {
            "idProvince": "4",
            "idCanton": "44",
            "idDistrict": "284",
            "name": "Barva"
        },
        {
            "idProvince": "4",
            "idCanton": "44",
            "idDistrict": "285",
            "name": "San José de la Montaña"
        },
        {
            "idProvince": "4",
            "idCanton": "44",
            "idDistrict": "286",
            "name": "San Pablo"
        },
        {
            "idProvince": "4",
            "idCanton": "44",
            "idDistrict": "287",
            "name": "San Pedro"
        },
        {
            "idProvince": "4",
            "idCanton": "44",
            "idDistrict": "288",
            "name": "San Roque"
        },
        {
            "idProvince": "4",
            "idCanton": "44",
            "idDistrict": "289",
            "name": "Santa Lucía"
        },
        {
            "idProvince": "4",
            "idCanton": "45",
            "idDistrict": "290",
            "name": "Asunción"
        },
        {
            "idProvince": "4",
            "idCanton": "45",
            "idDistrict": "291",
            "name": "La Ribera"
        },
        {
            "idProvince": "4",
            "idCanton": "45",
            "idDistrict": "292",
            "name": "San Antonio"
        },
        {
            "idProvince": "4",
            "idCanton": "46",
            "idDistrict": "293",
            "name": "Barrantes"
        },
        {
            "idProvince": "4",
            "idCanton": "46",
            "idDistrict": "294",
            "name": "Llorente"
        },
        {
            "idProvince": "4",
            "idCanton": "46",
            "idDistrict": "295",
            "name": "San Joaquín"
        },
        {
            "idProvince": "4",
            "idCanton": "47",
            "idDistrict": "296",
            "name": "Heredia"
        },
        {
            "idProvince": "4",
            "idCanton": "47",
            "idDistrict": "297",
            "name": "Mercedes"
        },
        {
            "idProvince": "4",
            "idCanton": "47",
            "idDistrict": "298",
            "name": "San Francisco"
        },
        {
            "idProvince": "4",
            "idCanton": "47",
            "idDistrict": "299",
            "name": "Ulloa (Barreal)"
        },
        {
            "idProvince": "4",
            "idCanton": "47",
            "idDistrict": "300",
            "name": "VaraBlanca"
        },
        {
            "idProvince": "4",
            "idCanton": "48",
            "idDistrict": "301",
            "name": "Concepción"
        },
        {
            "idProvince": "4",
            "idCanton": "48",
            "idDistrict": "302",
            "name": "San Francisco"
        },
        {
            "idProvince": "4",
            "idCanton": "48",
            "idDistrict": "303",
            "name": "San Isidro"
        },
        {
            "idProvince": "4",
            "idCanton": "48",
            "idDistrict": "304",
            "name": "San Jose"
        },
        {
            "idProvince": "4",
            "idCanton": "49",
            "idDistrict": "305",
            "name": "Rincón de Sabanilla"
        },
        {
            "idProvince": "4",
            "idCanton": "49",
            "idDistrict": "306",
            "name": "San Pablo"
        },
        {
            "idProvince": "4",
            "idCanton": "50",
            "idDistrict": "307",
            "name": "Angeles"
        },
        {
            "idProvince": "4",
            "idCanton": "50",
            "idDistrict": "308",
            "name": "Concepción"
        },
        {
            "idProvince": "4",
            "idCanton": "50",
            "idDistrict": "309",
            "name": "San Josecito"
        },
        {
            "idProvince": "4",
            "idCanton": "50",
            "idDistrict": "310",
            "name": "San Rafael"
        },
        {
            "idProvince": "4",
            "idCanton": "50",
            "idDistrict": "311",
            "name": "Santiago"
        },
        {
            "idProvince": "4",
            "idCanton": "51",
            "idDistrict": "312",
            "name": "Jesús"
        },
        {
            "idProvince": "4",
            "idCanton": "51",
            "idDistrict": "313",
            "name": "Purabá"
        },
        {
            "idProvince": "4",
            "idCanton": "51",
            "idDistrict": "314",
            "name": "San Juan"
        },
        {
            "idProvince": "4",
            "idCanton": "51",
            "idDistrict": "315",
            "name": "San Pedro"
        },
        {
            "idProvince": "4",
            "idCanton": "51",
            "idDistrict": "316",
            "name": "Santa Bárbara"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "317",
            "name": "Santo Domingo"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "318",
            "name": "Paracito"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "319",
            "name": "Pará"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "320",
            "name": "San Miguel"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "321",
            "name": "San Vicente"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "322",
            "name": "Santa Rosa"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "323",
            "name": "Santo Domingo"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "324",
            "name": "Santo Tomás"
        },
        {
            "idProvince": "4",
            "idCanton": "52",
            "idDistrict": "325",
            "name": "Tures"
        },
        {
            "idProvince": "4",
            "idCanton": "53",
            "idDistrict": "326",
            "name": "Cureña"
        },
        {
            "idProvince": "4",
            "idCanton": "53",
            "idDistrict": "327",
            "name": "Horquetas"
        },
        {
            "idProvince": "4",
            "idCanton": "53",
            "idDistrict": "328",
            "name": "La Virgen"
        },
        {
            "idProvince": "4",
            "idCanton": "53",
            "idDistrict": "329",
            "name": "Llanuras del Gaspar"
        },
        {
            "idProvince": "4",
            "idCanton": "53",
            "idDistrict": "330",
            "name": "Puerto Viejo"
        },
        {
            "idProvince": "5",
            "idCanton": "54",
            "idDistrict": "331",
            "name": "Colorado"
        },
        {
            "idProvince": "5",
            "idCanton": "54",
            "idDistrict": "332",
            "name": "Juntas"
        },
        {
            "idProvince": "5",
            "idCanton": "54",
            "idDistrict": "333",
            "name": "San Juan"
        },
        {
            "idProvince": "5",
            "idCanton": "54",
            "idDistrict": "334",
            "name": "Sierra"
        },
        {
            "idProvince": "5",
            "idCanton": "55",
            "idDistrict": "335",
            "name": "Bagaces"
        },
        {
            "idProvince": "5",
            "idCanton": "55",
            "idDistrict": "336",
            "name": "Fortuna"
        },
        {
            "idProvince": "5",
            "idCanton": "55",
            "idDistrict": "337",
            "name": "Mogote"
        },
        {
            "idProvince": "5",
            "idCanton": "55",
            "idDistrict": "338",
            "name": "Rio Naranjo"
        },
        {
            "idProvince": "5",
            "idCanton": "56",
            "idDistrict": "339",
            "name": "Belén"
        },
        {
            "idProvince": "5",
            "idCanton": "56",
            "idDistrict": "340",
            "name": "Filadelfia"
        },
        {
            "idProvince": "5",
            "idCanton": "56",
            "idDistrict": "341",
            "name": "Palmira"
        },
        {
            "idProvince": "5",
            "idCanton": "56",
            "idDistrict": "342",
            "name": "Sardinal"
        },
        {
            "idProvince": "5",
            "idCanton": "57",
            "idDistrict": "343",
            "name": "Bebedero"
        },
        {
            "idProvince": "5",
            "idCanton": "57",
            "idDistrict": "344",
            "name": "Cañas"
        },
        {
            "idProvince": "5",
            "idCanton": "57",
            "idDistrict": "345",
            "name": "Palmira"
        },
        {
            "idProvince": "5",
            "idCanton": "57",
            "idDistrict": "346",
            "name": "Porozal"
        },
        {
            "idProvince": "5",
            "idCanton": "57",
            "idDistrict": "347",
            "name": "San Miguel"
        },
        {
            "idProvince": "5",
            "idCanton": "58",
            "idDistrict": "348",
            "name": "Hojancha"
        },
        {
            "idProvince": "5",
            "idCanton": "58",
            "idDistrict": "349",
            "name": "Huacas"
        },
        {
            "idProvince": "5",
            "idCanton": "58",
            "idDistrict": "350",
            "name": "Monte Romo"
        },
        {
            "idProvince": "5",
            "idCanton": "58",
            "idDistrict": "351",
            "name": "Puerto Carrillo"
        },
        {
            "idProvince": "5",
            "idCanton": "59",
            "idDistrict": "352",
            "name": "La Cruz"
        },
        {
            "idProvince": "5",
            "idCanton": "59",
            "idDistrict": "353",
            "name": "La Garita"
        },
        {
            "idProvince": "5",
            "idCanton": "59",
            "idDistrict": "354",
            "name": "Santa Cecilia"
        },
        {
            "idProvince": "5",
            "idCanton": "59",
            "idDistrict": "355",
            "name": "Santa Elena"
        },
        {
            "idProvince": "5",
            "idCanton": "60",
            "idDistrict": "356",
            "name": "Cañas Dulces"
        },
        {
            "idProvince": "5",
            "idCanton": "60",
            "idDistrict": "357",
            "name": "Curubandé"
        },
        {
            "idProvince": "5",
            "idCanton": "60",
            "idDistrict": "358",
            "name": "Liberia"
        },
        {
            "idProvince": "5",
            "idCanton": "60",
            "idDistrict": "359",
            "name": "Mayorca"
        },
        {
            "idProvince": "5",
            "idCanton": "60",
            "idDistrict": "360",
            "name": "Nacascolo"
        },
        {
            "idProvince": "5",
            "idCanton": "61",
            "idDistrict": "361",
            "name": "Bejuco"
        },
        {
            "idProvince": "5",
            "idCanton": "61",
            "idDistrict": "362",
            "name": "Carmona"
        },
        {
            "idProvince": "5",
            "idCanton": "61",
            "idDistrict": "363",
            "name": "Porvenir"
        },
        {
            "idProvince": "5",
            "idCanton": "61",
            "idDistrict": "364",
            "name": "San Pablo"
        },
        {
            "idProvince": "5",
            "idCanton": "61",
            "idDistrict": "365",
            "name": "Santa Rita"
        },
        {
            "idProvince": "5",
            "idCanton": "61",
            "idDistrict": "366",
            "name": "Zapotal"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "idDistrict": "367",
            "name": "Belén de Nosarita"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "idDistrict": "368",
            "name": "Mansión"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "idDistrict": "369",
            "name": "Nicoya"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "idDistrict": "370",
            "name": "Nosara"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "idDistrict": "371",
            "name": "Quebrada Honda"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "idDistrict": "372",
            "name": "San Antonio"
        },
        {
            "idProvince": "5",
            "idCanton": "62",
            "idDistrict": "373",
            "name": "Sámara"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "374",
            "name": "Bolsón"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "375",
            "name": "Cabo Velas"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "376",
            "name": "Cartagena"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "377",
            "name": "Cuajiniquil"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "378",
            "name": "Diriá"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "379",
            "name": "Santa Cruz"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "380",
            "name": "Tamarindo"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "381",
            "name": "Tempate"
        },
        {
            "idProvince": "5",
            "idCanton": "63",
            "idDistrict": "382",
            "name": "Veintisiete de Abril"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "idDistrict": "383",
            "name": "Arenal"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "idDistrict": "384",
            "name": "Líbano"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "idDistrict": "385",
            "name": "Quebrada Grande"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "idDistrict": "386",
            "name": "Santa Rosa"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "idDistrict": "387",
            "name": "Tierras Morenas"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "idDistrict": "388",
            "name": "Tilarán"
        },
        {
            "idProvince": "5",
            "idCanton": "64",
            "idDistrict": "389",
            "name": "Tronadora"
        },
        {
            "idProvince": "6",
            "idCanton": "65",
            "idDistrict": "390",
            "name": "Naranjito"
        },
        {
            "idProvince": "6",
            "idCanton": "65",
            "idDistrict": "391",
            "name": "Quepos"
        },
        {
            "idProvince": "6",
            "idCanton": "65",
            "idDistrict": "392",
            "name": "Savegre"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "393",
            "name": "Boruca"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "394",
            "name": "Briolley"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "395",
            "name": "Brunka"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "396",
            "name": "Buenos Aires"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "397",
            "name": "Changena"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "398",
            "name": "Colinas o Bajos de Maíz"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "399",
            "name": "Pilas"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "400",
            "name": "Potrero Grande"
        },
        {
            "idProvince": "6",
            "idCanton": "66",
            "idDistrict": "401",
            "name": "Volcán"
        },
        {
            "idProvince": "6",
            "idCanton": "67",
            "idDistrict": "402",
            "name": "Canoas"
        },
        {
            "idProvince": "6",
            "idCanton": "67",
            "idDistrict": "403",
            "name": "Corredor"
        },
        {
            "idProvince": "6",
            "idCanton": "67",
            "idDistrict": "404",
            "name": "La Cuesta"
        },
        {
            "idProvince": "6",
            "idCanton": "67",
            "idDistrict": "405",
            "name": "Laurel"
        },
        {
            "idProvince": "6",
            "idCanton": "68",
            "idDistrict": "406",
            "name": "Aguabuena"
        },
        {
            "idProvince": "6",
            "idCanton": "68",
            "idDistrict": "407",
            "name": "Limoncito"
        },
        {
            "idProvince": "6",
            "idCanton": "68",
            "idDistrict": "408",
            "name": "Pittier"
        },
        {
            "idProvince": "6",
            "idCanton": "68",
            "idDistrict": "409",
            "name": "Sabalito"
        },
        {
            "idProvince": "6",
            "idCanton": "68",
            "idDistrict": "410",
            "name": "San Vito"
        },
        {
            "idProvince": "6",
            "idCanton": "69",
            "idDistrict": "411",
            "name": "Espíritu Santo"
        },
        {
            "idProvince": "6",
            "idCanton": "69",
            "idDistrict": "412",
            "name": "Macacona"
        },
        {
            "idProvince": "6",
            "idCanton": "69",
            "idDistrict": "413",
            "name": "San Jerónimo"
        },
        {
            "idProvince": "6",
            "idCanton": "69",
            "idDistrict": "414",
            "name": "San Juan Grande"
        },
        {
            "idProvince": "6",
            "idCanton": "69",
            "idDistrict": "415",
            "name": "San Rafael"
        },
        {
            "idProvince": "6",
            "idCanton": "70",
            "idDistrict": "416",
            "name": "Jacó"
        },
        {
            "idProvince": "6",
            "idCanton": "70",
            "idDistrict": "417",
            "name": "Tárcoles"
        },
        {
            "idProvince": "6",
            "idCanton": "71",
            "idDistrict": "418",
            "name": "Golfito"
        },
        {
            "idProvince": "6",
            "idCanton": "71",
            "idDistrict": "419",
            "name": "Guaycará"
        },
        {
            "idProvince": "6",
            "idCanton": "71",
            "idDistrict": "420",
            "name": "Jiménez"
        },
        {
            "idProvince": "6",
            "idCanton": "71",
            "idDistrict": "421",
            "name": "Pavon"
        },
        {
            "idProvince": "6",
            "idCanton": "72",
            "idDistrict": "422",
            "name": "Miramar"
        },
        {
            "idProvince": "6",
            "idCanton": "72",
            "idDistrict": "423",
            "name": "San Isidro"
        },
        {
            "idProvince": "6",
            "idCanton": "72",
            "idDistrict": "424",
            "name": "Unión"
        },
        {
            "idProvince": "6",
            "idCanton": "73",
            "idDistrict": "425",
            "name": "Bahía Ballena"
        },
        {
            "idProvince": "6",
            "idCanton": "73",
            "idDistrict": "426",
            "name": "Cortés"
        },
        {
            "idProvince": "6",
            "idCanton": "73",
            "idDistrict": "427",
            "name": "Palmar"
        },
        {
            "idProvince": "6",
            "idCanton": "73",
            "idDistrict": "428",
            "name": "Piedras Blancas"
        },
        {
            "idProvince": "6",
            "idCanton": "73",
            "idDistrict": "429",
            "name": "Sierpe"
        },
        {
            "idProvince": "6",
            "idCanton": "74",
            "idDistrict": "430",
            "name": "Parrita"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "431",
            "name": "Acapulco"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "432",
            "name": "Arancibia"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "433",
            "name": "Barranca"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "434",
            "name": "Chacarita"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "435",
            "name": "Chira"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "436",
            "name": "Chomes"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "437",
            "name": "Cóbano"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "438",
            "name": "El Roble"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "439",
            "name": "Guacimal"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "440",
            "name": "Isla del Coco"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "441",
            "name": "Lepanto"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "442",
            "name": "Manzanillo"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "443",
            "name": "Monte Verde"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "444",
            "name": "Paquera"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "445",
            "name": "Pitahaya"
        },
        {
            "idProvince": "6",
            "idCanton": "75",
            "idDistrict": "446",
            "name": "Puntarenas"
        },
        {
            "idProvince": "7",
            "idCanton": "76",
            "idDistrict": "447",
            "name": "Duacarí"
        },
        {
            "idProvince": "7",
            "idCanton": "76",
            "idDistrict": "448",
            "name": "Guácimo"
        },
        {
            "idProvince": "7",
            "idCanton": "76",
            "idDistrict": "449",
            "name": "Mercedes"
        },
        {
            "idProvince": "7",
            "idCanton": "76",
            "idDistrict": "450",
            "name": "Pocora"
        },
        {
            "idProvince": "7",
            "idCanton": "76",
            "idDistrict": "451",
            "name": "Río Jiménez"
        },
        {
            "idProvince": "7",
            "idCanton": "77",
            "idDistrict": "452",
            "name": "Limón"
        },
        {
            "idProvince": "7",
            "idCanton": "77",
            "idDistrict": "453",
            "name": "Matama"
        },
        {
            "idProvince": "7",
            "idCanton": "77",
            "idDistrict": "454",
            "name": "Río Blanco"
        },
        {
            "idProvince": "7",
            "idCanton": "77",
            "idDistrict": "455",
            "name": "Valle La Estrella"
        },
        {
            "idProvince": "7",
            "idCanton": "78",
            "idDistrict": "456",
            "name": "Batán"
        },
        {
            "idProvince": "7",
            "idCanton": "78",
            "idDistrict": "457",
            "name": "Carrandí"
        },
        {
            "idProvince": "7",
            "idCanton": "78",
            "idDistrict": "458",
            "name": "Matina"
        },
        {
            "idProvince": "7",
            "idCanton": "79",
            "idDistrict": "459",
            "name": "Cariari"
        },
        {
            "idProvince": "7",
            "idCanton": "79",
            "idDistrict": "460",
            "name": "Colorado"
        },
        {
            "idProvince": "7",
            "idCanton": "79",
            "idDistrict": "461",
            "name": "Guápiles"
        },
        {
            "idProvince": "7",
            "idCanton": "79",
            "idDistrict": "462",
            "name": "Jiménez"
        },
        {
            "idProvince": "7",
            "idCanton": "79",
            "idDistrict": "463",
            "name": "Rita"
        },
        {
            "idProvince": "7",
            "idCanton": "79",
            "idDistrict": "464",
            "name": "Roxana"
        },
        {
            "idProvince": "7",
            "idCanton": "80",
            "idDistrict": "465",
            "name": "Alegria"
        },
        {
            "idProvince": "7",
            "idCanton": "80",
            "idDistrict": "466",
            "name": "Cairo"
        },
        {
            "idProvince": "7",
            "idCanton": "80",
            "idDistrict": "467",
            "name": "Florida"
        },
        {
            "idProvince": "7",
            "idCanton": "80",
            "idDistrict": "468",
            "name": "Germania"
        },
        {
            "idProvince": "7",
            "idCanton": "80",
            "idDistrict": "469",
            "name": "Pacuarito"
        },
        {
            "idProvince": "7",
            "idCanton": "80",
            "idDistrict": "470",
            "name": "Siquirres"
        },
        {
            "idProvince": "7",
            "idCanton": "81",
            "idDistrict": "471",
            "name": "Bratsi"
        },
        {
            "idProvince": "7",
            "idCanton": "81",
            "idDistrict": "472",
            "name": "Cahuita"
        },
        {
            "idProvince": "7",
            "idCanton": "81",
            "idDistrict": "473",
            "name": "Sixaola"
        },
        {
            "idProvince": "7",
            "idCanton": "81",
            "idDistrict": "474",
            "name": "Telire"
        }
    ];

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
            'desktopLG':             1200,
            'desktop':                992,
            'tablet':                 768,
            'mobile':                 480
        })
        .constant('LOCATION', {
            'provinces': provinces,
            'cantons': cantons,
            'districts': districts
        })
        .constant('APP_CONSTANTS', {
            'appURL':             'http://localhost:8080/api/',
            'BILL_DRAFT_STATE_CODE' : 1,
            'BILL_NUMBER_CONFIG_CODE' : 0,
            'TIPO_CAMBIO_DOLAR': 1,
            'BILL_VALIDATED_STATE_CODE':2,
            'BILL_PARTIALLY_PAID_STATE_CODE':3,
            'BILL_PAID_STATE_CODE':4,
            'BILL_VOID_STATE_CODE':5,
            'BILL_PRE_BILL_STATE_CODE':6,
            'CURRENCY_COLONES_CODE':1,
            'CURRENCY_DOLLARS_CODE':2,
            'EXCHANGE_RATE_DOLLARS_CODE':1,
            'CUSTOMER_IDENT_TYPE_PHYSICAL':1,
            'CUSTOMER_IDENT_TYPE_JURIDICAL':2,
            'CUSTOMER_IDENT_TYPE_PASSPORT':3,
            'PAYMENT_TYPE_CASH_CODE':1,
            'PAYMENT_TYPE_CREDIT_CODE':2,
            'LOCAL_EXCHANGE_RATE_VALUE':1,
            'WAREHOUSE_ORDER_DRAFT_STATE' : 1,
            'WAREHOUSE_ORDER_VALIDATED_STATE' : 2,
            'WAREHOUSE_ORDER_REJECTED_STATE' : 3,
            'WAREHOUSE_ORDER_MOVEMENT_PRODUCTION' : 1,
            'WAREHOUSE_ORDER_MOVEMENT_SALE' : 2,
            'WAREHOUSE_ORDER_MOVEMENT_BETWEEN_STOREHOUSES' : 3,
            'logo': 'data:image/png;base64,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'
        })
    ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {

        // Hook into ocLazyLoad to setup AngularGrid before inject into the app
        // See "Creating the AngularJS Module" at
        // https://www.ag-grid.com/best-angularjs-data-grid/index.php
        var offevent = $rootScope.$on('ocLazyLoad.fileLoaded', function(e, file) {
            if (file.indexOf('ag-grid.js') > -1) {
                agGrid.initialiseAgGridWithAngular1(angular);
                offevent();
            }
        });

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
         if (typeof(toState) !== 'undefined'){
         $templateCache.remove(toState.templateUrl);
         }
         });*/

        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $rootScope.colorByName = Colors.byName;

        // cancel click event easily
        $rootScope.cancel = function($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // -----------------------------------

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function(event, unfoundState/*, fromState, fromParams*/) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });
        // Hook error
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error){
                console.log(error);
            });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function(/*event, toState, toParams, fromState, fromParams*/) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                $rootScope.currTitle = $state.current.title;
            });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            var requireLogin = toState.data != undefined ? toState.data.requireLogin : false;
            var userInfo =  $window.sessionStorage["userInfo"];
            if (requireLogin && typeof userInfo === 'undefined') {
                $state.go("page.login");
                event.preventDefault();

            }
        });

        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function() {
            var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };

    }

})();


(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

    }
})();
(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'modernizr': ['bower_components/modernizr/modernizr.custom.js'],
                'icons': ['bower_components/fontawesome/css/font-awesome.min.css',
                        'bower_components/simple-line-icons/css/simple-line-icons.css'],
                'flot-chart':         ['vendor/Flot/jquery.flot.js'],
                'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                        'vendor/Flot/jquery.flot.resize.js',
                                        'vendor/Flot/jquery.flot.pie.js',
                                        'vendor/Flot/jquery.flot.time.js',
                                        'vendor/Flot/jquery.flot.categories.js',
                                        'vendor/flot-spline/js/jquery.flot.spline.min.js']
            },
            // Angular based script (use the right module name)
            modules: [
                {
                    name: 'datatables', files: ['vendor/datatables/media/css/jquery.dataTables.css',
                    'vendor/datatables/media/js/jquery.dataTables.js',
                    'vendor/angular-datatables/dist/angular-datatables.js'], serie: true
                },
                {
                    name: 'ngDialog', files: ['bower_components/ng-dialog/js/ngDialog.min.js',
                    'bower_components/ng-dialog/css/ngDialog.min.css',
                    'bower_components/ng-dialog/css/ngDialog-theme-default.min.css']
                },
                {
                    name: 'toaster', files: ['bower_components/AngularJS-Toaster/toaster.js',
                    'bower_components/AngularJS-Toaster/toaster.css']
                },
                {
                    name: 'ui.select', files: ['bower_components/angular-ui-select/dist/select.js',
                    'bower_components/angular-ui-select/dist/select.css']
                },
                {
                    name: 'infinite-scroll', files: ['bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js']
                },
                {
                    name: 'angular-spinner',
                    files: ['bower_components/angular-spinner/dist/angular-spinner.min.js']
                },
                {name: 'angularGrid', files: ['bower_components/ag-grid/dist/styles/ag-grid.css',
                    'bower_components/ag-grid/dist/ag-grid.js',
                    'bower_components/ag-grid/dist/styles/theme-dark.css',
                    'bower_components/ag-grid/dist/styles/theme-fresh.css']},
                {name: 'xeditable', files: ['bower_components/angular-xeditable/dist/js/xeditable.js',
                    'bower_components/angular-xeditable/dist/css/xeditable.css']},
            ]
        })
    ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
    ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 500;
        cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
    ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

        // Loading bar transition
        // -----------------------------------
        var thBar;
        $rootScope.$on('$stateChangeStart', function() {
            if($('.wrapper > section').length) // check if bar container exists
                thBar = $timeout(function() {
                    cfpLoadingBar.start();
                }, 0); // sets a latency Threshold
        });
        $rootScope.$on('$stateChangeSuccess', function(event) {
            event.targetScope.$watch('$viewContentLoaded', function () {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });

    }

})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    //

    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;

    }

    //
    // Controller definition
    //

    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
        $element
            .on('click', function (e) { e.stopPropagation(); })
            .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {

        var inputSelector = '.navbar-form input[type="text"]';

        $(inputSelector)
            .on('click', function (e) { e.stopPropagation(); })
            .on('keyup', function(e) {
                if (e.keyCode === 27) // ESC
                    NavSearch.dismiss();
            });

        // click anywhere closes the search
        $(document).on('click', NavSearch.dismiss);
        // dismissable options
        $element
            .on('click', function (e) { e.stopPropagation(); })
            .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
            var navbarForm = $(navbarFormSelector);

            navbarForm.toggleClass('open');

            var isOpen = navbarForm.hasClass('open');

            navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
            $(navbarFormSelector)
                .removeClass('open') // Close control
                .find('input[type="text"]').blur() // remove focus
            // .val('') // Empty input
            ;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template:
            '<div class="preloader-progress">' +
            '<div class="preloader-progress-bar" ' +
            'ng-style="{width: loadCounter + \'%\'}"></div>' +
            '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

            scope.loadCounter = 0;

            var counter  = 0,
                timeout;

            // disables scrollbar
            angular.element('body').css('overflow', 'hidden');
            // ensure class is present for styling
            el.addClass('preloader');

            appReady().then(endCounter);

            timeout = $timeout(startCounter);

            ///////

            function startCounter() {

                var remaining = 100 - counter;
                counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

                scope.loadCounter = parseInt(counter, 10);

                timeout = $timeout(startCounter, 20);
            }

            function endCounter() {

                $timeout.cancel(timeout);

                scope.loadCounter = 100;

                $timeout(function(){
                    // animate preloader hiding
                    $animate.addClass(el, 'preloader-hidden');
                    // retore scrollbar
                    angular.element('body').css('overflow', '');
                }, 300);
            }

            function appReady() {
                var deferred = $q.defer();
                var viewsLoaded = 0;
                // if this doesn't sync with the real app ready
                // a custom event must be used instead
                var off = scope.$on('$viewContentLoaded', function () {
                    viewsLoaded ++;
                    // we know there are at least two views to be loaded
                    // before the app is ready (1-index.html 2-app*.html)
                    if ( viewsLoaded === 2) {
                        // with resolve this fires only once
                        $timeout(function(){
                            deferred.resolve();
                        }, 3000);

                        off();
                    }

                });

                return deferred.promise;
            }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
    ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

        /* jshint validthis:true */
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            // controller access level
            $get: function() {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return 'app/views/' + uri;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for(var i=0, len=_args.length; i < len; i ++){
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if(typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function() {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise
                                return $ocLL.load( whatToLoad );
                            });
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (APP_REQUIRES.modules)
                            for(var m in APP_REQUIRES.modules)
                                if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]};
        } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to login
        $urlRouterProvider.otherwise('/app/dashboard');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('modernizr', 'icons', 'toaster'),
                data: {
                    requireLogin: true // this property will apply to all children of 'app'
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                templateUrl: helper.basepath('dashboard.html')
            })
            .state('app.thirdPartyMain', {
                url: '/thirdPartyMain',
                title: 'Clientes',
                templateUrl: helper.basepath('thirdparty/third-party-main.html'),
                resolve: helper.resolveFor('datatables', 'ngDialog', 'infinite-scroll', 'angular-spinner')
            })
            .state('app.customerDetail', {
                url: '/customerDetail',
                title: 'Detalle cliente',
                templateUrl: helper.basepath('thirdparty/customer-detail.html'),
                params : { customerId: null }
            })
            .state('app.commerce', {
                url: '/commerce',
                title: 'Comercial',
                templateUrl: helper.basepath('commerce.html')
            })
            .state('app.billingMain', {
                url: '/billing',
                title: 'Facturas',
                templateUrl: helper.basepath('billing/billing-main.html'),
                controller: 'BillController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('datatables', 'ngDialog', 'ui.select',
                    'flot-chart', 'flot-chart-plugins', 'infinite-scroll', 'angular-spinner'),
                params : { tabIndex: 0 }
            })
            .state('app.customerReports', {
                url: '/customerReports',
                title: 'Reportes Cliente',
                templateUrl: helper.basepath('reports/customer-reports.html'),
                resolve: helper.resolveFor('ui.select',
                    'angular-spinner', 'angularGrid'),
                params : { tabIndex: 0 }
            })
            .state('app.billsReports', {
                url: '/billsReports',
                title: 'Reportes Facturas',
                templateUrl: helper.basepath('reports/bills-reports.html'),
                resolve: helper.resolveFor('ui.select',
                   'angular-spinner','angularGrid')
            })
            .state('app.warehouseReports', {
                url: '/warehouseReports',
                title: 'Reportes de almacén',
                templateUrl: helper.basepath('reports/warehouse-reports.html'),
                controller: 'WarehouseReportsController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog', 'ui.select',
                    'flot-chart', 'flot-chart-plugins','angular-spinner', 'infinite-scroll', 'angularGrid')
            })
            .state('app.billDetail', {
                url: '/billDetail',
                title: 'Detalle factura',
                templateUrl: helper.basepath('billing/bill-detail.html'),
                controller: 'BillDetailController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog'),
                params : { billId: null , tabIndex: 0}
            })
            .state('app.newBill', {
                url: '/new-bill',
                title: 'Nueva factura',
                templateUrl: helper.basepath('billing/new-bill.html'),
                controller: 'BillController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog')
            })
            .state('app.updateBill', {
                url: '/update-bill',
                title: 'Modificar factura',
                templateUrl: helper.basepath('billing/update-bill.html'),
                controller: 'UpdateBillController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog'),
                params : { billId: null }
            })
            .state('app.usersMain', {
                url: '/usersMain',
                title: 'Usuarios',
                templateUrl: helper.basepath('user/users-main.html'),
                controller: 'UserController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('datatables', 'ngDialog')
            })
            .state('app.warehouseMain', {
                url: '/warehouseMain',
                title: 'Almacén',
                templateUrl: helper.basepath('warehouse/warehouse-main.html'),
                controller: 'StorehouseController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('datatables', 'ngDialog', 'infinite-scroll', 'angular-spinner'),
                params : {tabIndex: 0}
            })
            .state('app.storehouseDetail', {
                url: '/storehouseDetail',
                title: 'Detalle bodega',
                templateUrl: helper.basepath('warehouse/storehouse-detail.html'),
                controller: 'StorehouseDetailController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog', 'ui.select'),
                params : {storehouseId: null, tabIndex: 0}
            })
            .state('app.newWarehouseOrder', {
                url: '/newWarehouseOrder',
                title: 'Orden de salida de bodega',
                templateUrl: helper.basepath('warehouse/new-warehouse-order.html'),
                controller: 'WarehouseOrderController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog')
            })
            .state('app.updateWarehouseOrder', {
                url: '/updateWarehouseOrder',
                title: 'Modificar orden de salida de bodega',
                templateUrl: helper.basepath('warehouse/update-warehouse-order.html'),
                controller: 'UpdateWarehouseOrderController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog'),
                params : {warehouseOrderId: null, tabIndex: 0}
            })
            .state('app.productLotDetail', {
                url: '/productLotDetail',
                title: 'Lote',
                templateUrl: helper.basepath('warehouse/product-lot-detail.html'),
                controller: 'ProductLotController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('datatables', 'ngDialog', 'infinite-scroll', 'angular-spinner'),
                params : {filteredProductLotList: null, storehouseId : null}
            })
            .state('app.warehouseOrderDetail', {
                url: '/warehouseOrderDetail',
                title: 'Detalle de orden de salida',
                templateUrl: helper.basepath('warehouse/warehouse-order-detail.html'),
                controller: 'WarehouseOrderDetailController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog'),
                params : { warehouseOrderId: null}
            })
            .state('app.configuration', {
                url: '/configuration',
                title: 'Configuración',
                templateUrl: helper.basepath('configuration/configuration.html'),
                resolve: helper.resolveFor('datatables', 'xeditable')
            })
            .state('app.reports', {
                url: '/reports',
                title: 'Reportes',
                templateUrl: helper.basepath('reports/reports-dashboard.html')
            })
            //
            // Single Page Routes
            // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: 'app/pages/page.html',
                resolve: helper.resolveFor('modernizr', 'icons'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: 'app/pages/login.html'
            })
        //
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // -----------------------------------
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;

    } // routesConfig

})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){


        // User Settings
        // -----------------------------------
        $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'app/img/user/02.jpg'
        };

        // Hides/show user avatar on sidebar from any element
        $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
        };

        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'Light-ERP',
            description: 'Sistema administrativo',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: null,
                asideScrollbar: false,
                isCollapsedText: false
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

        // Setup the layout mode
        $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

        // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
        // if( angular.isDefined($localStorage.layout) )
        //   $rootScope.app.layout = $localStorage.layout;
        // else
        //   $localStorage.layout = $rootScope.app.layout;
        //
        // $rootScope.$watch('app.layout', function () {
        //   $localStorage.layout = $rootScope.app.layout;
        // }, true);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
            if( newValue === false )
                $rootScope.$broadcast('closeSidebarMenu');
        });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
            var collapseList = [];

            // demo: when switch from collapse to hover, close all items
            var watchOff1 = $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
                if ( newVal === false && oldVal === true) {
                    closeAllBut(-1);
                }
            });


            // Load menu from json file
            // -----------------------------------

            SidebarLoader.getMenu(sidebarReady);

            function sidebarReady(items) {
                $scope.menuItems = items;
            }

            // Handle sidebar and collapse items
            // ----------------------------------

            $scope.getMenuItemPropClasses = function(item) {
                return (item.heading ? 'nav-heading' : '') +
                    (isActive(item) ? ' active' : '') ;
            };

            $scope.addCollapse = function($index, item) {
                collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
            };

            $scope.isCollapse = function($index) {
                return (collapseList[$index]);
            };

            $scope.toggleCollapse = function($index, isParentItem) {

                // collapsed sidebar doesn't toggle drodopwn
                if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

                // make sure the item index exists
                if( angular.isDefined( collapseList[$index] ) ) {
                    if ( ! $scope.lastEventFromChild ) {
                        collapseList[$index] = !collapseList[$index];
                        closeAllBut($index);
                    }
                }
                else if ( isParentItem ) {
                    closeAllBut(-1);
                }

                $scope.lastEventFromChild = isChild($index);

                return true;

            };

            // Controller helpers
            // -----------------------------------

            // Check item and children active state
            function isActive(item) {

                if(!item) return;

                if( !item.sref || item.sref === '#') {
                    var foundActive = false;
                    angular.forEach(item.submenu, function(value) {
                        if(isActive(value)) foundActive = true;
                    });
                    return foundActive;
                }
                else
                    return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
                index += '';
                for(var i in collapseList) {
                    if(index < 0 || index.indexOf(i) < 0)
                        collapseList[i] = true;
                }
            }

            function isChild($index) {
                /*jshint -W018*/
                return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function() {
                watchOff1();
            });

        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

            var currentState = $rootScope.$state.current.name;
            var $sidebar = element;

            var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
            var subNav = $();

            $sidebar.on( eventName, '.nav > li', function() {

                if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

                    subNav.trigger('mouseleave');
                    subNav = toggleMenuItem( $(this), $sidebar);

                    // Used to detect click and touch events outside the sidebar
                    sidebarAddBackdrop();

                }

            });

            var eventOff1 = scope.$on('closeSidebarMenu', function() {
                removeFloatingNav();
            });

            // Normalize state when resize to mobile
            $win.on('resize.sidebar', function() {
                if( ! Utils.isMobile() )
                    asideToggleOff();
            });

            // Adjustment on route changes
            var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
                currentState = toState.name;
                // Hide sidebar automatically on mobile
                asideToggleOff();

                $rootScope.$broadcast('closeSidebarMenu');
            });

            // Autoclose when click outside the sidebar
            if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

                var wrapper = $('.wrapper');
                var sbclickEvent = 'click.sidebar';

                var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

            }

            //////

            function watchExternalClicks(newVal) {
                // if sidebar becomes visible
                if ( newVal === true ) {
                    $timeout(function(){ // render after current digest cycle
                        wrapper.on(sbclickEvent, function(e){
                            // if not child of sidebar
                            if( ! $(e.target).parents('.aside').length ) {
                                asideToggleOff();
                            }
                        });
                    });
                }
                else {
                    // dettach event
                    wrapper.off(sbclickEvent);
                }
            }

            function asideToggleOff() {
                $rootScope.app.asideToggled = false;
                if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
            }

            scope.$on('$destroy', function() {
                // detach scope events
                eventOff1();
                eventOff2();
                watchOff1();
                // detach dom events
                $sidebar.off(eventName);
                $win.off('resize.sidebar');
                wrapper.off(sbclickEvent);
            });

        }

        ///////

        function sidebarAddBackdrop() {
            var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
            $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
                removeFloatingNav();
            });
        }

        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element){
            $element
                .siblings('li')
                .removeClass('open')
                .end()
                .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {

            removeFloatingNav();

            var ul = $listItem.children('ul');

            if( !ul.length ) return $();
            if( $listItem.hasClass('open') ) {
                toggleTouchItem($listItem);
                return $();
            }

            var $aside = $('.aside');
            var $asideInner = $('.aside-inner'); // for top offset calculation
            // float aside uses extra padding on aside
            var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
            var subNav = ul.clone().appendTo( $aside );

            toggleTouchItem($listItem);

            var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
            var vwHeight = $win.height();

            subNav
                .addClass('nav-floating')
                .css({
                    position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
                    top:      itemTop,
                    bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
                });

            subNav.on('mouseleave', function() {
                toggleTouchItem($listItem);
                subNav.remove();
            });

            return subNav;
        }

        function removeFloatingNav() {
            $('.dropdown-backdrop').remove();
            $('.sidebar-subnav.nav-floating').remove();
            $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
            var menuJson = 'server/sidebar-menu.json',
                menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache

            onError = onError || function() { alert('Failure loading menu'); };

            $http
                .get(menuURL)
                .success(onReady)
                .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope'];
    function UserBlockController($scope) {

        activate();

        ////////////////

        function activate() {

            $scope.userBlockVisible = true;

            var detach = $scope.$on('toggleUserBlock', function(/*event, args*/) {

                $scope.userBlockVisible = ! $scope.userBlockVisible;

            });

            $scope.$on('$destroy', detach);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
    ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

        $translateProvider.useStaticFilesLoader({
            prefix : 'app/i18n/',
            suffix : '.json'
        });

        $translateProvider.preferredLanguage('es');
        $translateProvider.useLocalStorage();
        $translateProvider.usePostCompiling(true);
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
    ;
    translateRun.$inject = ['$rootScope', '$translate'];

    function translateRun($rootScope, $translate){

        // Internationalization
        // ----------------------

        $rootScope.language = {
            // Handles language dropdown
            listIsOpen: false,
            // list of available languages
            available: {
                'en':       'English',
                'es_AR':    'Español'
            },
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
                $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
            },
            set: function (localeId) {
                // Set the new idiom
                $translate.use(localeId);
                // save a reference for the current language
                $rootScope.language.selected = $rootScope.language.available[localeId];
                // finally toggle dropdown
                $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
            }
        };

        $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.animateEnabled, scope);
            }, function (newValue) {
                $animate.enabled(!!newValue, element);
            });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
        return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
            element.on('click', function (e) {
                e.preventDefault();

                if(scope.resetKey) {
                    delete $localStorage[scope.resetKey];
                    $state.go($state.current, {}, {reload: true});
                }
                else {
                    $.error('No storage key specified for reset.');
                }
            });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            // Not supported under IE
            if( Browser.msie ) {
                element.addClass('hide');
            }
            else {
                element.on('click', function (e) {
                    e.preventDefault();

                    if (screenfull.enabled) {

                        screenfull.toggle();

                        // Switch icon indicator
                        if(screenfull.isFullscreen)
                            $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                        else
                            $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                    } else {
                        $.error('Fullscreen not enabled');
                    }

                });
            }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function (e) {
                if(element.is('a')) e.preventDefault();
                var uri = attrs.loadCss,
                    link;

                if(uri) {
                    link = createLink(uri);
                    if ( !link ) {
                        $.error('Error creating stylesheet link element.');
                    }
                }
                else {
                    $.error('No stylesheet location defined.');
                }

            });
        }

        function createLink(uri) {
            var linkId = 'autoloaded-stylesheet',
                oldLink = $('#'+linkId).attr('id', linkId + '-old');

            $('head').append($('<link/>').attr({
                'id':   linkId,
                'rel':  'stylesheet',
                'href': uri
            }));

            if( oldLink.length ) {
                oldLink.remove();
            }

            return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var format = attrs.format;

            function updateTime() {
                var dt = dateFilter(new Date(), format);
                element.text(dt);
            }

            updateTime();
            var intervalPromise = $interval(updateTime, 1000);

            scope.$on('$destroy', function(){
                $interval.cancel(intervalPromise);
            });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            element.on('change', function() {
                var $this = $(this),
                    index= $this.index() + 1,
                    checkbox = $this.find('input[type="checkbox"]'),
                    table = $this.parents('table');
                // Make sure to affect only the correct checkbox column
                table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
                    .prop('checked', checkbox[0].checked);

            });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
            element.on('click', function(){
                $timeout(function(){
                    // all IE friendly dispatchEvent
                    var evt = document.createEvent('UIEvents');
                    evt.initUIEvent('resize', true, false, $window, 0);
                    $window.dispatchEvent(evt);
                    // modern dispatchEvent way
                    // $window.dispatchEvent(new Event('resize'));
                }, attributes.triggerResize || 300);
            });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
            // DETECTION
            support: {
                transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
                animation: (function() {

                    var animationEnd = (function() {

                        var element = document.body || document.documentElement,
                            animEndEventNames = {
                                WebkitAnimation: 'webkitAnimationEnd',
                                MozAnimation: 'animationend',
                                OAnimation: 'oAnimationEnd oanimationend',
                                animation: 'animationend'
                            }, name;

                        for (name in animEndEventNames) {
                            if (element.style[name] !== undefined) return animEndEventNames[name];
                        }
                    }());

                    return animationEnd && { end: animationEnd };
                })(),
                requestAnimationFrame: window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function(callback){ window.setTimeout(callback, 1000/60); },
                /*jshint -W069*/
                touch: (
                    ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                    (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                    (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                    (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                    false
                ),
                mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
            },
            // UTILITIES
            isInView: function(element, options) {
                /*jshint -W106*/
                var $element = $(element);

                if (!$element.is(':visible')) {
                    return false;
                }

                var window_left = $win.scrollLeft(),
                    window_top  = $win.scrollTop(),
                    offset      = $element.offset(),
                    left        = offset.left,
                    top         = offset.top;

                options = $.extend({topoffset:0, leftoffset:0}, options);

                if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                    left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                    return true;
                } else {
                    return false;
                }
            },

            langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

            isTouch: function () {
                return $html.hasClass('touch');
            },

            isSidebarCollapsed: function () {
                return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
            },

            isSidebarToggled: function () {
                return $body.hasClass('aside-toggled');
            },

            isMobile: function () {
                return $win.width() < APP_MEDIAQUERY.tablet;
            }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
            $log.log('I\'m a line from custom.js');
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.tables')
        .service('ngTableDataService', ngTableDataService);

    function ngTableDataService() {
        /* jshint validthis:true */
        var self = this;
        this.cache = null;
        this.getData = getData;

        ////////////////

        function getData($defer, params, api) {
            // if no cache, request data and filter
            if ( ! self.cache ) {
                if ( api ) {
                    api.get(function(data){
                        self.cache = data;
                        filterdata($defer, params);
                    });
                }
            }
            else {
                filterdata($defer, params);
            }

            function filterdata($defer, params) {
                var from = (params.page() - 1) * params.count();
                var to = params.page() * params.count();
                var filteredData = self.cache.result.slice(from, to);

                params.total(self.cache.total);
                $defer.resolve(filteredData);
            }

        }
    }
})();