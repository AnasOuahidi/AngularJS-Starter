require('./Libraries/imports')

import {router} from './Configuration/Router'
import {authListener} from './Configuration/AuthListener'
import {AUTH_EVENTS, USER_ROLES} from './Configuration/Constants'
import {AuthService} from './Services/AuthService'
import {AuthInterceptor} from './Services/AuthInterceptor'
import {Interceptor} from './Services/Interceptor'
import {Factory} from './Services/Factory'
import {ucfirst} from './Filters/ucfirst'
import {appCtrl} from './Controller/appCtrl'
import {loginCtrl} from '../pages/login/loginCtrl'
import {indexCtrl} from '../pages/index/indexCtrl'

window.angular.module('starter', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngStorage',
    'angularValidator',
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
    .controller('loginCtrl', loginCtrl)
    .controller('indexCtrl', indexCtrl)
