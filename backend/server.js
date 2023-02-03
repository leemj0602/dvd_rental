/*
Name: Lee Mun Jun
Admin No.: p2227762
Class: DIT/1B/03
*/

const app = require('./controller/app.js');
const serveStatic = require('serve-static');
let port = 8081
app.use(serveStatic(__dirname + '/public'));
const server = app.listen(port, function () {
    console.log('Web App Hosted at http://localhost:%s', port);
});