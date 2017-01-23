export let authListener = ['$rootScope', '$state', 'Factory', 'AuthService', 'AUTH_EVENTS', auth]
function auth($rootScope, $state, Factory, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', (event, next, nextParams, fromState) => {
        if (!AuthService.isAuthenticated()) {
            // window.location = '/auth.html'
        }
    })
}
