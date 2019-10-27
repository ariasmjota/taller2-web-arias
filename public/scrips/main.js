var input = document.querySelector('.input');

input.addEventListener('change', (event) => {  

    var filtro = event.target.value;
    console.log(filtro);

    window.location = `?f=${filtro}`;

});