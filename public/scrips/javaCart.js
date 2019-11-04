//------------------------Carrito de compras-------------------------------   

var buyButton = document.querySelectorAll('.buy__btn');
var num__buy = document.querySelector('.header_bag');
var res_compra = document.querySelector('.car__abstract');
var total__buy = document.querySelector('.abstract__num-total');
var subtotal= document.querySelector('.abstract__sub');
var carList = [];
var comp = document.querySelector('.products__list');

if (localStorage.getItem('carList') != null) {
    carList = JSON.parse(localStorage.getItem('carList'));
}


function actualizarCarrito() {
    var suma = 0;
    var cantidad=1;

    //Numero de elementos del carrito
    num__buy.innerHTML = carList.length;

    //Numero de productos en el resumen
    if (res_compra != null) {
        res_compra.innerHTML = carList.length + " PRODUCTS";
    }
    if(comp!=null){
        comp.innerHTML="";
    }
    


    carList.forEach(function (product, index) {

        //Crear un contenedor por cada producto en el carrito
        
        var contNuevo = document.createElement('section');
        var imgNuevo = document.createElement('div');
        var nombreNuevo = document.createElement('h1');
        var btnNuevo = document.createElement('button');
        var cantNuevo = document.createElement('p');
        var btnNuevo2 = document.createElement('button');
        var precioNuevo = document.createElement('p');
        var eliminarNuevo = document.createElement('i');

        if (comp != null) {

            comp.appendChild(contNuevo);
            contNuevo.appendChild(imgNuevo);
            contNuevo.appendChild(nombreNuevo);
            contNuevo.appendChild(btnNuevo);
            contNuevo.appendChild(cantNuevo);
            contNuevo.appendChild(btnNuevo2);
            contNuevo.appendChild(precioNuevo);
            contNuevo.appendChild(eliminarNuevo);

        }
        contNuevo.className = 'lista-productos__item';
        imgNuevo.className = 'item-carro__img';
        nombreNuevo.className = 'item-carro__nombre';
        btnNuevo.className = 'item-carro__btn';
        cantNuevo.className = 'item-carro__cantidad';
        btnNuevo2.className = 'item-carro__btn2';
        precioNuevo.className = 'item-carro__precio';
        eliminarNuevo.className = 'item-carro__eliminar fas fa-trash';

        imgNuevo.style.backgroundImage = 'url(' + producto.imagen + ')';
        nombreNuevo.innerHTML = product.nombre;
        precioNuevo.innerHTML = product.precio;
        cantNuevo.innerHTML = ""+cantidad;
        btnNuevo.innerHTML = '-';
        btnNuevo2.innerHTML = '+';

        



        //Total de la compra
            var temp = new String();
            for (let i = 1; i < product.precio.length; i++) {
                temp += product.precio[i];
            }
            suma += parseInt(temp);
            
       /*Sumar cantidad    */
       btnNuevo2.addEventListener('click', function () {
          // cantidad=1;
        console.log("click-btn");
        cantidad++;
        console.log(cantidad);
        cantNuevo.innerHTML=""+cantidad;
        carList.push(product);
        localStorage.setItem('carList', JSON.stringify(carList));
        num__buy.innerHTML = carList.length;
        var temp = new String();
            for (let i = 1; i < product.precio.length; i++) {
                temp += producto.precio[i];
            }
            suma += parseInt(temp);
            total__buy.innerHTML = "$" + suma;   
            //actualizarCarrito();
    });



        //Eliminar elemento del carrito
        eliminarNuevo.addEventListener('click', function () {
            
            carList.splice(index, 1);
            contNuevo.remove();
            localStorage.setItem('carList', JSON.stringify(carList));
            num__buy.innerHTML = carList.length;
            actualizarCarrito();
        });
    });

    if (total__buy != null) {
        total__buy.innerHTML = "$" + suma;  
        subtotal.innerHTML="$"+ suma; 
    }

}
actualizarCarrito();

function recorrerBtnProductos(btn) {

    function agregarCarritoProductos() {
        var padre = btn.parentNode.parentNode.parentNode;
        var nombre = padre.querySelector('.producto__nombre').innerText;
        var precio = padre.querySelector('.producto__precio').innerText;
        var src = padre.querySelector('.producto__banner').style.backgroundImage;
        var imagen = src.replace('url(', '').replace(')', '');

        console.log("se agrega");

        var productoN = {
            nombre: nombre,
            precio: precio,
            imagen: imagen
        }
        carList.push(productoN);
        actualizarCarrito();
        localStorage.setItem('carList', JSON.stringify(carList));
    }

    btn.addEventListener('click', agregarCarritoProductos);

}
if (botonesProducto != null) {
    botonesProducto.forEach(recorrerBtnProductos);
}

function recorrerBtnPestana(btn) {

    function agregarCarritoPestana() {
        var nombre = document.querySelector('.producto__nombre').innerText;
        var precio = document.querySelector('.producto__precio').innerText;
        var src = document.querySelector('.galeria__fotos').style.backgroundImage;
        var imagen = src.replace('url(', '').replace(')', '');

        console.log(imagen);

        var productoN = {
            nombre: nombre,
            precio: precio,
            imagen: imagen
        }
        carList.push(productoN);
        actualizarCarrito();
        localStorage.setItem('carList', JSON.stringify(carList));
    }

    btn.addEventListener('click', agregarCarritoPestana);

}
if (buyButton != null) {
    buyButton.forEach(recorrerBtnPestana);
}

//----------Enviar lista de productos a base de datos---------
var form=document.querySelector('.pago__formularios');
function enviarProductos(event){
//event.preventDefault();
//   console.log("holiii")
var input= document.querySelector('.formularios__productos');
input.value=localStorage.getItem('carList');
localStorage.removeItem('carList');
}
function enviarTotal(event){
//event.preventDefault();
//   console.log("holiii")
var input= document.querySelector('.formularios__total');
input.value=total__buy.innerHTML;
console.log(input.value);
}
if(form!=null){
form.addEventListener('submit',enviarProductos);
form.addEventListener('submit',enviarTotal);
};

