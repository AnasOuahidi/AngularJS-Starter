export let router = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider
        .state('login', {
            cache: false,
            url: '/login',
            template: require('./../../pages/login/login.html'),
            controller: 'loginCtrl'
        })
        .state('index', {
            cache: false,
            url: '/',
            template: require('./../../pages/index/index.html'),
            controller: 'indexCtrl',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
            }
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
            state.go('login')
        }
    })
}]
