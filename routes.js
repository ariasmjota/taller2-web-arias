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
	        .toArray(function(err, allProducts) {
              
        var contexto = {
            productsList: allProducts,
        };
        response.render('store',contexto);
    });

    app.get('/store/:name',(request, response) =>{
        console.log('Entro a un producto');

        var name = request.params.name;

        products.find({name: name})
	        .toArray(function(err, OneProduct) {
               
        var contexto = {
            individual: OneProduct[0],
           
        };
        response.render('individual',contexto);
      
      
    });
});
});

}

module.exports = createRoutes;
