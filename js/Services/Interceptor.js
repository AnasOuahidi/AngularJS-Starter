export function Interceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
}
