const assert = require('assert');

function createRoutes (app, db) {
//Ruta inicial
app.get('/',function(request, response){
    response.sendFile(__dirname+'/public/home.html');
    // seleccionamos la colección que necesitamos
    const products = clientdb.collection('products');

    // buscamos todos los productos
    products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que no hay error
            assert.equal(null, err);

            //
            console.log(result);
        });

});


//Ruta a la tienda
app.get('/store/', function(request, response) {

    //Mongo: buscar documentos (Paso 3)
    var productos = clientdb.collection('productos');
    productos.find()
	        .toArray(function(err, docs) {
        var contexto = {
            listaProductos: docs,
           
        };
        response.render('store',contexto);
    });

});

//Ruta de los filtros
} module.exports=createRoutes;
