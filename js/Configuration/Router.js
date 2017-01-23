export let router = ['$stateProvider', '$urlRouterProvider', 'USER_ROLES', routes]
function routes($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider
        .state('index', {
            cache: false,
            url: '/',
            templateUrl: 'pages/page/index.html',
            controller: 'indexCtrl as Index',
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
            // window.location = '/auth.html'
        }
    })
}
