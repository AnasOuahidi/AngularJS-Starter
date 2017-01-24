let Auth = function($http, USER_ROLES, $localStorage, Factory) {
    let token = $localStorage.token
    let type = $localStorage.role
    let isAuthenticated = false
    let role = ''

    if (token && type) {
        useCredentials()
    }

    function storeUserCredentials(token) {
        $localStorage.token = token
        $localStorage.role = type
        useCredentials()
    }

    function useCredentials() {
        isAuthenticated = true
        if (type === 'admin') {
            role = USER_ROLES.admin
        }
        if (type === 'user') {
            role = USER_ROLES.user
        }
        Factory.token = token
        Factory.role = role
        // Set the token as header for your requests!
        // $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
        token = undefined
        type = ''
        role = ''
        isAuthenticated = false
        // $http.defaults.headers.common['X-Auth-Token'] = undefined
        delete $localStorage.token
        delete $localStorage.role
        Factory.token = null
        Factory.role = null
    }

    var login = function(login, password) {
        $http.post(Factory.url('/auth'), {login, password}).then((response) => {
            console.log(response.data)
        }, (error) => {
            console.log(error)
        })
    }

    var logout = function() {
        destroyUserCredentials()
    };

    var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    }

    return {
        login: login,
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {
            return isAuthenticated
        },
        getRole: function() {
            return role
        }
    };
}
export let AuthService = ['$http', 'USER_ROLES', '$localStorage', 'Factory', Auth]
