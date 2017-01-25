export let loginCtrl = ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
    $('title').html('Login Page!')
    $scope.login = (data) => {
        AuthService.login(data.username, data.password).then((data) => {
            console.log(data)
            $state.go('index', {}, {reload: true})
        }, function(err) {
            console.log(err)
        })
    }
}]
