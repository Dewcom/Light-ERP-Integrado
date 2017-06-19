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
           // 'add.notify'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.product', [
            //'add.notify'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.user', [
            //'add.notify'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.bill', [
            //'add.notify'
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
                    'vendor/simple-line-icons/css/simple-line-icons.css']

            },
            // Angular based script (use the right module name)
            modules: [
                // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
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
                resolve: helper.resolveFor('datatables', 'ngDialog', 'ui.select')
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