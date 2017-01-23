export function ucfirst() {
    return (input, arg) => {
        if (input) {
            input = input.toLowerCase()
            return input.replace(/(?:^|\s)\S/g, (a) => {
                return a.toUpperCase()
            })
        } else {
            return input
        }
    }
}
