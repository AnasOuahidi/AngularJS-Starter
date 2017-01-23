export function Factory() {
    var factory = {
        token: null,
        role: null,
        dns: 'http://localhost:8888',
        url(url) {
            if (url === '/auth') {
                return `${this.dns}${url}`
            } else {
                return `${this.dns}/api${url}?token=${this.token}`
            }
        }
    }
    return factory
}
