window.$ = window.jQuery = require('jquery')
require('./../node_modules/pickadate/lib/picker')
require('./../node_modules/pickadate/lib/picker.date')
require('./../node_modules/pickadate/lib/picker.time')
require('./../node_modules/pickadate/lib/translations/fr_FR')
require('bootstrap')
window._ = require('lodash')
window.moment = require('moment')
window.moment.locale('fr')
window.validator = require('validator')
window.angular = require('angular')
require('angular-ui-router')
require('ui-select')
require('angular-ui-bootstrap')
require('angular-sanitize')
require('ngstorage')
require('ng-table')
require('angular-validator')
require('angular-file-upload')
require('./../node_modules/perfect-scrollbar/dist/js/perfect-scrollbar.jquery')
require('angular-perfect-scrollbar')

import {router} from './Configuration/Router'
import {authListener} from './Configuration/AuthListener'
import {AUTH_EVENTS, USER_ROLES} from './Configuration/Constants'
import {AuthService} from './Services/AuthService'
import {AuthInterceptor} from './Services/AuthInterceptor'
import {Interceptor} from './Services/Interceptor'
import {Factory} from './Services/Factory'
import {ucfirst} from './Filters/ucfirst'
import {appCtrl} from './Controller/appCtrl'
import {indexCtrl} from '../pages/index/indexCtrl'

window.angular.module('starter', [
    // 'ui.router',
    // 'ui.bootstrap',
    // 'ngSanitize',
    // 'ngStorage',
    // 'angularValidator',
])
    .config(router)
    .run(authListener)
    .constant('AUTH_EVENTS', AUTH_EVENTS)
    .constant('USER_ROLES', USER_ROLES)
    .service('AuthService', AuthService)
    .factory('AuthInterceptor', AuthInterceptor)
    .config(['$httpProvider', Interceptor])
    .factory('Factory', Factory)
    .filter('ucfirst', ucfirst)
    .controller('appCtrl', appCtrl)
    .controller('indexCtrl', indexCtrl)
