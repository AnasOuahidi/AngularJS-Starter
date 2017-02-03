const fss = require('fs')
const path = require('path')
const fs = require('fs-extra')
const mkdirp = require('mkdirp')
const readline = require('readline')
function getDirectories(srcpath) {
    return fss.readdirSync(srcpath)
        .filter(file => fss.statSync(path.join(srcpath, file)).isDirectory())
}
Array.prototype.contains = function(element) {
    return this.indexOf(element) > -1
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question('What\'s your page\'s name ? \n', (name) => {
    rl.close()
    if (!name) {
        console.log(`The page name is required, please make sure to enter one!`)
    } else if (getDirectories('./pages').contains(name)) {
        console.log(`The ${pageName} page name is already used, try another one!`)
    } else {
        let path = './pages/' + name
        let htmlFileName = path + '/' + name + '.html'
        let htmlFileContent = '<h1>' + name + ' is created!</h1>'
        let jsFileName = path + '/' + name + 'Ctrl.js'
        let jsFileContent = `export let ${name}Ctrl = ['$scope', function($scope) {` +
        `    $('title').html('${name}')` +
        `}]` +
        ``
        let appJsFileImport = `import {${name}Ctrl} from '../pages/${name}/${name}Ctrl'`
        let appJsFileCtrl = `    .controller('${name}Ctrl', ${name}Ctrl)`
        const rl2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl2.question('What\'s your page\'s url ? (/' + name + ') \n', (url) => {
            url = !url ? '/' + name : url
            rl2.close()
            if (url.substring(0, 1) != '/') {
                console.log('The url must start with a /')
            } else {
                let routeJsFileContentArray = [
                    `        .state('${name}', {`,
                    `            cache: false,`,
                    `            url: '${url}',`,
                    `            template: require('./../../pages/${name}/${name}.html'),`,
                    `            controller: '${name}Ctrl'`,
                    `            // data: {`,
                    `            //     authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]`,
                    `            // }`,
                    `        })`
                ]
                if (!fs.existsSync(path)) {
                    mkdirp(path, function(err) {
                        if (err) return console.log(err)
                        fs.writeFile(htmlFileName, htmlFileContent, function(err) {
                            if (err) return console.log(err)
                            console.log(htmlFileName + ' was generated successfully !')
                        })
                        fs.writeFile(jsFileName, jsFileContent, function(err) {
                            if (err) return console.log(err)
                            console.log(jsFileName + ' was generated successfully !')
                        })
                        let appFile = fs.readFileSync('./js/app.js').toString().split('\n')
                        appFile.splice(2, 0, appJsFileImport)
                        appFile.splice(appFile.length - 1, 0, appJsFileCtrl)
                        let text = appFile.join('\n')
                        fs.writeFile('./js/app.js', text, function(err) {
                            if (err) return console.log(err)
                            console.log('app.js was configured successfully !')
                        })
                        let RouteJsFile = fs.readFileSync('./js/Configuration/Router.js').toString().split('\n')
                        RouteJsFile.splice.apply(RouteJsFile, [2, 0].concat(routeJsFileContentArray))
                        let textRouteJsFile = RouteJsFile.join('\n')
                        fs.writeFile('./js/Configuration/Router.js', textRouteJsFile, function(err) {
                            if (err) return console.log(err)
                            console.log('Router.js was configured successfully !')
                        })
                        setTimeout(function() { console.log('\n \nCheck the #' + url + ' url to see the result') }, 700)
                    })
                } else {
                    console.log(path + ' already exists !')
                }
            }
        })
    }
})
