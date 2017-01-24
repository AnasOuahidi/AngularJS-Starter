let Auth = function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: (response) => {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[response.status], response)
            return $q.reject(response)
        }
    }
}
export let AuthInterceptor = ['$rootScope', '$q', 'AUTH_EVENTS', Auth]
