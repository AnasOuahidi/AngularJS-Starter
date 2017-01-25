let name = process.argv[2]
const fs = require('fs-extra')
const mkdirp = require('mkdirp')
let path = './pages/' + name
let htmlFileName = path + '/' + name + '.html'
let htmlFileContent = '<h1>' + name + ' is created!</h1>'
let jsFileName = path + '/' + name + 'Ctrl.js'
let jsFileContent = `export let ${name}Ctrl = ['$scope', function($scope) {
    $('title').html('${name}')
}]
`
let appJsFileImport = `import {${name}Ctrl} from '../pages/${name}/${name}Ctrl'`
let appJsFileCtrl = `    .controller('${name}Ctrl', ${name}Ctrl)`
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
        let appFile = fs.readFileSync('./js/app.js').toString().split("\n")
        appFile.splice(2, 0, appJsFileImport)
        appFile.splice(appFile.length - 1, 0, appJsFileCtrl)
        let text = appFile.join("\n")
        fs.writeFile('./js/app.js', text, function(err) {
            if (err) return console.log(err)
            console.log('app.js was configured successfully !')
        })
    })
} else {
    console.log(path + ' already exists !')
}
