const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

app.listen(process.env.PORT || 8080);

const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

    fs.writeFile(f, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});