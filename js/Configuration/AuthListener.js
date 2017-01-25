export let authListener = ['$rootScope', '$state', 'Factory', 'AuthService', 'AUTH_EVENTS', function($rootScope, $state, Factory, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', (event, next, nextParams, fromState) => {
        if ('data' in next && 'authorizedRoles' in next.data) {
            var authorizedRoles = next.data.authorizedRoles
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault()
                $state.go($state.current)
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized)
            }
        }

        if (!AuthService.isAuthenticated()) {
            if (next.name !== 'login') {
                event.preventDefault()
                $state.go('login')
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated)
            }
        }
    })
}]
