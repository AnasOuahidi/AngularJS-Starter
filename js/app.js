require('./Libraries/imports')

import {indexCtrl} from '../pages/index/indexCtrl'
import {loginCtrl} from '../pages/login/loginCtrl'
import {appCtrl} from './Controller/appCtrl'
import {ucfirst} from './Filters/ucfirst'
import {Factory} from './Services/Factory'
import {Interceptor} from './Services/Interceptor'
import {AuthInterceptor} from './Services/AuthInterceptor'
import {AuthService} from './Services/AuthService'
import {AUTH_EVENTS, USER_ROLES} from './Configuration/Constants'
import {authListener} from './Configuration/AuthListener'
import {router} from './Configuration/Router'

window.angular.module('starter', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngStorage',
    'angularValidator'
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
