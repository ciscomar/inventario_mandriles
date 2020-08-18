// const express = require('express');
// const http = require('http')
// const path = require('path')
// const reload = require('reload')
// const bodyParser = require('body-parser');


// const app = express();

// const publicFolder = path.join(__dirname,'public')
// const node_modules = path.join(__dirname,'node_modules')

// app.set('port', process.env.PORT || 3000);
// app.set('views',__dirname + '/views');
// app.set('view_engine', 'ejs');


// app.use(express.static(publicFolder));
// app.use(express.static(node_modules));
// app.use(bodyParser.urlencoded({ extended: true}));


// const routes = require('./routes/routes');


// app.use(routes);
// var server = http.createServer(app)



// reload(app).then(function (reloadReturned) {

//   server.listen(app.get('port'), function () {
//     console.log('Web server listening on port ' + app.get('port'))
//   })
// }).catch(function (err) {
//   console.error('Reload could not start, could not start server/sample app', err)
// })




// const express = require('express');
// const bodyParser = require('body-parser');
// const http = require('http');
// //var multer = require('multer');

// const app = express();
// // var fileupload = require("express-fileupload");
// // app.use(fileupload());
// //Declarando y adquiriendo nodesspi e informacion de usuario
// // app.use(function (req, res, next) {
// //   var nodeSSPI = require('node-sspi')
// //   var nodeSSPIObj = new nodeSSPI({
// //     retrieveGroups: true
// //   })
// //   nodeSSPIObj.authenticate(req, res, function(err){
// //     res.finished || next()
// //   })
// // })
// //Carpeta view y visor ejs
// app.set('views',__dirname + '/views');
// app.set('view_engine', 'ejs');

// //Carpeta publica
// app.use(express.static('public')); 


// //Requiriendo rutas
// const routes = require('./routes/routes');
// app.use(express.static('node_modules'))
// //Declarando body parser y sus funciones
// app.use(bodyParser.urlencoded({extended:true}));

// //Declarando rutas de express
// app.use(routes);


// //Declarando puertos a utilizarse
// app.set('port', process.env.PORT || 3006)
// //Encendiendo el servidor 
// var server = http.createServer(app)
//     server.listen(app.get('port'), function () {
//       console.log('Servidor encendido en el puerto ' + app.get('port'))
//     })



const express = require('express');
const app = express();
const db = require('./public/db/conn');
const bodyParser = require('body-parser');
const mailer = require('express-mailer');
//require('dotenv').config();

app.set('views',__dirname + '/views');
app.set('view_engine', 'ejs');


app.use(express.static('public'));
app.use(express.static('node_modules'));
//Requiriendo rutas
const routes = require('./routes/routes');


app.get(db);
app.use(bodyParser.urlencoded({extended:true}));
app.use(routes);

app.set('port', process.env.PORT || 3004);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
  console.log('Express server connected as '+ process.env.enviroment + " enviroment");
});
  module.exports= mailer;