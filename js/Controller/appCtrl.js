export let appCtrl = ['$scope', '$state', '$uibModal', '$http', 'AuthService', 'Factory', 'AUTH_EVENTS', app]
class app {
    constructor($scope, $state, $uibModal, $http, AuthService, Factory, AUTH_EVENTS) {
        this.AuthService = AuthService
        this.State = $state
        this.Http = $http
        this.Factory = Factory

        if (!this.AuthService.isAuthenticated()) {
            $uibModal.open({
                animation: true,
                templateUrl: 'modals/notAuthenticated.html',
                size: 'md'
            })
            window.location = '/auth.html'
        }

        $scope.$on(AUTH_EVENTS.notAuthorized, (event, args) => {
            if (args.data === 'Administrateur') {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'modals/notAuthorized.html',
                    size: 'md'
                })
                $state.go('index', {}, {reload: true})
            }
        })
        $scope.$on(AUTH_EVENTS.notAuthenticated, (event) => {
            AuthService.logout()
            $uibModal.open({
                animation: true,
                templateUrl: 'modals/notAuthenticated.html',
                size: 'md'
            })
            window.location = '/auth.html'
        })
        $scope.$on('addProject', (event, args) => {
            this.projects.push({id: args.id, titre: args.titre})
        })
        $scope.$on('removeProject', (event, args) => {
            window._.remove(this.projects, function(project) {
                return project.id.toString() === args.id.toString()
            })
        })

        this.Http.get(this.Factory.url('/admin/projects')).then((response) => {
            this.projects = response.data.projects
        }, (error) => {
            console.log(error)
        })
    }

    logout() {
        this.AuthService.logout()
        window.location = '/auth.html'
    }

    validateInteger(number) {
        return _.isInteger(number)
    }

    validateAlphanumerique(text) {
        let textString = text + ''
        let str = textString.replace(/\s+/g, '')
        if (validator.isAlphanumeric(str)) {
            return true
        }
        return false
    }

    validateEmail(text) {
        if (text) {
            let filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
            if (filter.test(text)) {
                return true
            }
        }
        return false
    }

    validateLogin(text) {
        var textString = text + ''
        if (textString.length > 3) {
            return true
        }
        return false
    }

    validateLoginNew(text, users) {
        if (this.validateLogin(text)) {
            if (_.find(users, {login: text})) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    validateEmailNew(text, users) {
        if (this.validateEmail(text)) {
            if (_.find(users, {email: text})) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    validateTitreNew(text, titres) {
        if (_.find(titres, {titre: text})) {
            return false
        } else {
            return true
        }
    }

    validateTitreOld(text, titre, titres) {
        if (text === titre) {
            return true
        } else {
            if (_.find(titres, {titre: text})) {
                return false
            } else {
                return true
            }
        }
    }

    validateLoginOld(text, login, users) {
        if (text === login) {
            return true
        } else {
            if (this.validateLogin(text)) {
                if (_.find(users, {login: text})) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        }
    }

    validateEmailOld(text, email, users) {
        if (text === email) {
            return true
        } else {
            if (this.validateEmail(text)) {
                if (_.find(users, {email: text})) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        }
    }

    validatePassword(password, confirmation) {
        if (!this.validateLogin(password) || !this.validateLogin(confirmation)) {
            return false
        } else {
            if (password === confirmation) {
                return true
            } else {
                return false
            }
        }
    }

    validateRole(role) {
        if (role === 'admin' || role === 'user' || role === 'contrib') {
            return true
        } else {
            return false
        }
    }
}
