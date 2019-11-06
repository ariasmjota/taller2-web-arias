
// todas las funciones que interactuen con la base de datos van aquí
const assert = require('assert');

function createRoutes(app, db) {
    var products = db.collection('products');


    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');
    });

    //Ruta a la tienda
    app.get('/store', function (request, response) {

        //Mongo: buscar documentos (Paso 3)

        products.find()
            .toArray(function (err, allProducts) {

                var contexto = {
                    productsList: allProducts,
                };
                response.render('store', contexto);
            });
    });
    app.get('/store/:name', (request, response) => {
        console.log('Entro a un producto');

        var name = request.params.name;

        products.find({ name: name })
            .toArray(function (err, OneProduct) {

                var contexto = {
                    individual: OneProduct[0],

                };

                if(contexto == null){
                    response.send('Page not found: '+req.params.pestana);
                }else{
                    response.render('individual', contexto);

                }

            });
    });
    //Ruta filtros Man - Woman - Kids
    app.get('/store/category/:category', function (request, response) {

        console.log('Entro al filtro hombre');

        var category = request.params.category;

        products.find({ category: category })
            .toArray(function (err, filter) {
                var contexto = {
                    productsList: filter,

                };
                response.render('store', contexto);
            });
    });
     //Ruta filtros Jordan - Skate - Bascketball
     app.get('/store/type/:type', function (request, response) {

        console.log('Entro al filtro type');

        var type = request.params.type;

        products.find({ type: type })
            .toArray(function (err, filter) {
                var contexto = {
                    productsList: filter,

                };
                response.render('store', contexto);
            });
    });


    //Ruta al carrito
    
    app.get('/shopping', function (request, response) {
        var contexto = {

        };
        response.render('cart', contexto);
    });
    //Ruta al carrito
    app.get('/pay', function(request, response) {
    
        var contexto = {
        
        };
        response.render('pay',contexto);
    });

//Ruta al checkout
app.post('/checkout', function(request, response) {
    
    var order = {
       correo:request.body.correo,
       telefono:request.body.telefono,
       nombre:request.body.nombre,
       apellido:request.body.apellido,
       direccion:request.body.direccion,
       pais:request.body.pais,
       estado:request.body.estado,
       ciudad:request.body.ciudad,
       zip:request.body.zip,
       tarjeta:request.body.tarjeta,
       fecha:request.body.fecha,
       mes:request.body.mes,
       cvv:request.body.cvv,
       nombre__tarjeta:request.body.nombre__tarjeta,
       //products:JSON.parse(request.body.products),
       total:request.body.total
       
    };

    var collection =db.collection('orders');
    collection.insertOne(order,function(err){
        assert.equal(err,null);
        console.log("Pedido Guardado");

    });
    response.redirect('/store');
});


}

module.exports = createRoutes;
