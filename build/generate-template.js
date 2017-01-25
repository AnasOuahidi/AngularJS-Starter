const fs = require('fs')
fs.readFile('./index.html', 'utf8', function (err,data) {
    if (err) return console.log(err)
    let result = data.replace(/<script src="http:\/\/localhost:3003\/assets\/app.js"><\/script>/g, '')
    result= result.replace(/<link rel="icon" type="image\/png" href="img\/favicon.png"\/>/g, '')
    fs.writeFile('./template.html', result, 'utf8', function (err) {if (err) return console.log(err)})
})