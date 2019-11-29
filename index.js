//1. Importar librerias
var express = require('express');
var exphbs = require('express-handlebars');

//1. Crear app de express
var app = express();

//1. Registro de handlebars
app.engine('handlebars', exphbs());
//1.Establecer handlebars como el motor de render
app.set('view engine', 'handlebars');

//1. Establecer la carpeta public como estatica
app.use(express.static('public'));
//Para funcionamiento POST
app.use(express.urlencoded({ extended: true }));

//7. conectar base de datos de mongo
//Mongo: crear variables (Paso 1)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'tienda';
const client = new MongoClient(url, { useNewUrlParser: true });
var clientdb = null;
//Para usar Mongo: conectar (Paso 2)

MongoClient.connect(`mongodb+srv:/nike-ri6ya.mongodb.net/tienda?retryWrites=true&w=majority`,
  {
    auth: {
      user: 'mariar_13',
      password: '03132000'

    }
  },

  function (err, client) {
    if (err) throw err;
    clientdb = client.db('tienda');
    createRoutes(app, clientdb);
    //Iniciar servidor
    app.listen(process.env.PORT || 3000);}
);

