let app = function($scope, $state, $uibModal, AuthService, Factory, AUTH_EVENTS) {

    $scope.$on(AUTH_EVENTS.notAuthorized, (event, args) => {
        $uibModal.open({
            animation: true,
            templateUrl: 'modals/notAuthorized.html',
            size: 'md'
        })
        $state.go('index', {}, {reload: true})
    })

    $scope.$on(AUTH_EVENTS.notAuthenticated, (event) => {
        AuthService.logout()
        $uibModal.open({
            animation: true,
            templateUrl: 'modals/notAuthenticated.html',
            size: 'md'
        })
        $state.go('login', {}, {reload: true})
    })

    $scope.logout = () => {
        this.AuthService.logout()
        $state.go('login', {}, {reload: true})
    }

    $scope.validateInteger = (number) => {
        return _.isInteger(number)
    }

    $scope.validateAlphanumerique = (text) => {
        let textString = text + ''
        let str = textString.replace(/\s+/g, '')
        if (validator.isAlphanumeric(str)) {
            return true
        }
        return false
    }

    $scope.validateEmail = (text) => {
        if (text) {
            let filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
            if (filter.test(text)) {
                return true
            }
        }
        return false
    }

    $scope.validatePassword = (password, confirmation) => {
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
}
export let appCtrl = ['$scope', '$state', '$uibModal', 'AuthService', 'Factory', 'AUTH_EVENTS', app]
