let routes = function ($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider
        .state('login', {
            cache: false,
            url: '/login',
            templateUrl: 'pages/page/login.html',
            controller: 'loginCtrl',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
            }
        })
        .state('index', {
            cache: false,
            url: '/',
            templateUrl: 'pages/page/index.html',
            controller: 'indexCtrl'
        })
    $urlRouterProvider.otherwise(($injector, $location) => {
        let state = $injector.get('$state')
        let auth = $injector.get('AuthService')
        let USER_ROLES = $injector.get('USER_ROLES')
        if (auth.isAuthenticated()) {
            if (auth.getRole() === USER_ROLES.admin) {
                return state.go('index')
            }
            if (auth.getRole() === USER_ROLES.user) {
                return state.go('index')
            }
        } else {
            // window.location = '/auth.html'
        }
    })
}
export let router = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES', routes]
