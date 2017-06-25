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
        .module('app.product', []);
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
            'BILL_SAVED_STATE_CODE' : 1,
            'BILL_VALIDATED_STATE_CODE':2,
            'BILL_PARTIALLY_PAID_STATE_CODE':3,
            'BILL_PAID_STATE_CODE':4,
            'BILL_VOID_STATE_CODE':5,
            'CURRENCY_COLONES_CODE':1,
            'CURRENCY_DOLLARS_CODE':2,
            'EXCHANGE_RATE_DOLLARS_CODE':1,
            'CUSTOMER_IDENT_TYPE_PHYSICAL':1,
            'CUSTOMER_IDENT_TYPE_JURIDICAL':2,
            'CUSTOMER_IDENT_TYPE_PASSPORT':3,
            'PAYMENT_TYPE_CASH_CODE':1,
            'PAYMENT_TYPE_CREDIT_CODE':2,
            'LOCAL_EXCHANGE_RATE_VALUE':1,
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
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                        'vendor/simple-line-icons/css/simple-line-icons.css'],
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
                    name: 'ngDialog', files: ['vendor/ngDialog/js/ngDialog.min.js',
                    'vendor/ngDialog/css/ngDialog.min.css',
                    'vendor/ngDialog/css/ngDialog-theme-default.min.css']
                },
                {
                    name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js',
                    'vendor/angularjs-toaster/toaster.css']
                },
                {
                    name: 'ui.select', files: ['vendor/angular-ui-select/dist/select.js',
                    'vendor/angular-ui-select/dist/select.css']
                }

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
                templateUrl: helper.basepath('third-party-main.html'),
                resolve: helper.resolveFor('datatables', 'ngDialog')
            })
            .state('app.customerDetail', {
                url: '/customerDetail',
                title: 'Detalle cliente',
                templateUrl: helper.basepath('customer-detail.html'),
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
                templateUrl: helper.basepath('billing-main.html'),
                controller: 'BillController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('datatables', 'ngDialog', 'ui.select', 'flot-chart', 'flot-chart-plugins'),
                params : { tabIndex: 0 }
            })
            .state('app.billDetail', {
                url: '/billDetail',
                title: 'Detalle factura',
                templateUrl: helper.basepath('bill-detail.html'),
                controller: 'BillDetailController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog'),
                params : { billId: null }
            })
            .state('app.newBill', {
                url: '/new-bill',
                title: 'Nueva factura',
                templateUrl: helper.basepath('new-bill.html'),
                controller: 'BillController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog')
            })
            .state('app.updateBill', {
                url: '/update-bill',
                title: 'Modificar factura',
                templateUrl: helper.basepath('update-bill.html'),
                controller: 'UpdateBillController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('ngDialog'),
                params : { billId: null }
            })
            .state('app.usersMain', {
                url: '/usersMain',
                title: 'Usuarios',
                templateUrl: helper.basepath('users-main.html'),
                controller: 'UserController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('datatables', 'ngDialog')
            })
            .state('app.warehouseMain', {
                url: '/warehouseMain',
                title: 'Almacén',
                templateUrl: helper.basepath('warehouse-main.html'),
                controller: 'ProductController',
                controllerAs: 'controller',
                resolve: helper.resolveFor('datatables', 'ngDialog')
            })
            .state('app.configuration', {
                url: '/configuration',
                title: 'Configuración',
                templateUrl: helper.basepath('configuration.html'),
                resolve: helper.resolveFor('datatables')
            })
            .state('app.agent', {
                url: '/agent',
                title: 'Agentes',
                templateUrl: helper.basepath('agent.html')
            })
            .state('app.supplier', {
                url: '/supplier',
                title: 'Proveedores',
                templateUrl: helper.basepath('supplier.html')
            })
            .state('app.contact', {
                url: '/contact',
                title: 'Contactos',
                templateUrl: helper.basepath('contact.html')
            })
            .state('app.submenu', {
                url: '/submenu',
                title: 'Submenu',
                templateUrl: helper.basepath('submenu.html')
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