export let AuthService = ['$http', 'USER_ROLES', '$localStorage', 'Factory', Auth]
class Auth {
    constructor($http, USER_ROLES, $localStorage, Factory) {
        this.$http = $http
        this.USER_ROLES = USER_ROLES
        this.localStorage = $localStorage
        this.Factory = Factory
        this.authenticated = false
        if (!this.localStorage.token && window.localStorage.authToken) {
            this.localStorage.token = window.localStorage.authToken
            delete window.localStorage.authToken
        }
        if (!this.localStorage.role && window.localStorage.role) {
            this.localStorage.role = window.localStorage.role
            delete window.localStorage.role
        }
        var token = this.localStorage.token
        var type = this.localStorage.role
        if (token) {
            if (type) {
                this.type = type
            } else {
                this.type = 'user'
            }
            this.role = this.USER_ROLES[this.type]
            this.authenticated = true
            this.authToken = token
            this.Factory.token = this.authToken
            this.Factory.role = this.role
        }
    }

    logout() {
        this.authenticated = false
        this.authToken = undefined
        this.role = undefined
        delete this.localStorage.token
        delete this.localStorage.role
        this.Factory.token = null
        this.Factory.role = null
    }

    isAuthorized(authorizedRoles) {
        if (!window.angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles]
        }
        return (this.authenticated && authorizedRoles.indexOf(this.role) !== -1)
    }

    isAuthenticated() {
        return this.authenticated
    }

    getToken() {
        return this.authToken
    }

    getType() {
        return this.type
    }

    getRole() {
        return this.role
    }
}
