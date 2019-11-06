
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
     //Ruta filtros colores
     app.get('/store/colors/:colors', function (request, response) {

        console.log('Entro al filtro type');

        var colors = request.params.colors;

        products.find({ colors: colors })
            .toArray(function (err, filter) {
                var contexto = {
                    productsList: filter,

                };
                response.render('store', contexto);
            });
    });

     //Ruta orden precio
     app.get('/store/sort/price', function (request, response) {

        console.log('Entro al sort price');

        var price = request.params.price;

        products.find().sort({ price: -1 })
            .toArray(function (err, filter) {
                var contexto = {
                    productsList: filter,

                };
                response.render('store', contexto);
            });
    });

    //Ruta orden precio
    app.get('/store/sort/size', function (request, response) {

        console.log('Entro al sort size');

        var price = request.params.price;

        products.find().sort({ size: 1 })
            .toArray(function (err, filter) {
                console.log(filter);
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
       email:request.body.correo,
       phone:request.body.telefono,
       firstName:request.body.nombre,
       lastName:request.body.apellido,
       address:request.body.direccion,
       country:request.body.pais,
       state:request.body.estado,
       city:request.body.ciudad,
       zip:request.body.zip,
       card:request.body.tarjeta,
       year:request.body.fecha,
       month:request.body.mes,
       cvv:request.body.cvv,
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
