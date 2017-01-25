export let appCtrl = ['$scope', '$state', '$uibModal', 'AuthService', 'Factory', 'AUTH_EVENTS', function($scope, $state, $uibModal, AuthService, Factory, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthorized, (event, args) => {
        $uibModal.open({
            animation: true,
            template: require('./../../modals/notAuthorized.html'),
            size: 'md'
        })
        $state.go('index', {}, {reload: true})
    })

    $scope.$on(AUTH_EVENTS.notAuthenticated, (event) => {
        AuthService.logout()
        $uibModal.open({
            animation: true,
            template: require('./../../modals/notAuthenticated.html'),
            size: 'md'
        })
        $state.go('login', {}, {reload: true})
    })

    $scope.logout = () => {
        AuthService.logout()
        $state.go('login', {}, {reload: true})
    }

    $scope.validateInteger = (number) => {
        return window._.isInteger(number)
    }

    $scope.validateAlphanumerique = (text) => {
        let textString = text + ''
        let str = textString.replace(/\s+/g, '')
        if (window.validator.isAlphanumeric(str)) {
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
        if (!$scope.validateAlphanumerique(password) || !$scope.validateAlphanumerique(confirmation)) {
            return false
        } else {
            if (password === confirmation) {
                return true
            } else {
                return false
            }
        }
    }
}]
