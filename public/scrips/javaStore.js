function handleLoad() {
    var listaCarrito= [];

    if(localStorage.getItem('listaCarrito')!=null){
        listaCarrito = JSON.parse(localStorage.getItem('listaCarrito'));
    }
   var num_compra=document.querySelector('.shopping-bag');
   num_compra.innerHTML = listaCarrito.length;
}window.addEventListener('load', handleLoad);
