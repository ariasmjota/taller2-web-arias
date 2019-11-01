const assert = require('assert');

function createRoutes (app, db) {
    var products = db.collection('products');

    // todas las funciones que interactuen con la base de datos van aquí
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');
    });

    //Ruta a la tienda
    app.get('/store', function(request, response) {

    //Mongo: buscar documentos (Paso 3)
  
    products.find()
	        .toArray(function(err, allProducts) {
              
        var contexto = {
            productsList: allProducts,
        };
        response.render('store',contexto);
    });
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
//Ruta filtros Man - Woman - Kids
app.get('/store/category/:category', function(request, response) {
    
    console.log('Entro al filtro hombre');
    
    var category= request.params.category;

    products.find( { category: category } )
	        .toArray(function(err, filter) {
                console.log(menDoc);
        var contexto = {
            productsList: filter,
           
        };
        response.render('store',contexto);
    });

//Ruta filtros
app.get('/:filter', function(request, response) {

    products.find({ $or: [ { category: request.params.filter }, { type: request.params.filter } , { color: request.params.filter },{ size: request.params.filter }]})
	        .toArray(function(err, docs) {
        var contexto = {
            productos: docs,
           
        };
        response.render('store',contexto);
    });

    
   
});

//Ruta al carrito
app.get('/carrito', function(req, res) {
    var contexto = {
       
    };
    res.render('carrito',contexto);
});
   
});

}

module.exports = createRoutes;
