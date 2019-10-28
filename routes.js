const assert = require('assert');

function createRoutes (app, db) {
    
    // todas las funciones que interactuen con la base de datos van aquí
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');


    });

    //Ruta a la tienda
    app.get('/store', function(request, response) {

    //Mongo: buscar documentos (Paso 3)
    var products = db.collection('products');
    products.find()
	        .toArray(function(err, docs) {
        var contexto = {
            productsList: docs,
           
        };
        response.render('store',contexto);
    });

});

}

module.exports = createRoutes;

