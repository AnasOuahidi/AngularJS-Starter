let Auth = function($q, $http, USER_ROLES, $localStorage, Factory) {
    let token
    let type
    let role
    let isAuthenticated = false
    useCredentials()

    function storeUserCredentials(token, type) {
        $localStorage.token = token
        $localStorage.role = type
        useCredentials()
    }

    function useCredentials() {
        token = $localStorage.token
        type = $localStorage.role
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

    let login = function(login, password) {
        return $q(function(resolve, reject) {
            $http.post(Factory.url('/auth'), {login, password}).then((response) => {
                if (response.data.token && response.data.role) {
                    storeUserCredentials(response.data.token, response.data.role)
                } else {
                    reject(response)
                }
                resolve(response.data)
            }, (error) => {
                reject(error)
            })
        })
    }

    let logout = function() {
        destroyUserCredentials()
    }

    let isAuthorized = function(authorizedRoles) {
        if (!window.angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles]
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1)
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
    }
}
export let AuthService = ['$q', '$http', 'USER_ROLES', '$localStorage', 'Factory', Auth]
