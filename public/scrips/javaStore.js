function handleLoad() {
    var carList= [];

    if(localStorage.getItem('carList')!=null){
        carList = JSON.parse(localStorage.getItem('carList'));
    }
   var num_compra=document.querySelector('.shopping-bag');
   num_compra.innerHTML = carList.length;
}window.addEventListener('load', handleLoad);
