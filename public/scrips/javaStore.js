function handleLoad() {

    var btnFilter = document.querySelector('.header__filter');
    var filter = document.querySelector('.store__filter');

    function handleClick(){
        filter.classList.toggle('store__filter--active');
        console.log('funciona el cambio');
    }
    btnFilter.addEventListener('click', handleClick);
    
}window.addEventListener('load', handleLoad);
