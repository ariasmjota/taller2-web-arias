    var btnsAdd = document.querySelectorAll('.product__bag_ind');
    var cartT = document.querySelector('.header__bag');

    btnsAdd.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            console.log("holaaaaaa");

            event.preventDefault();
            var id = btn.getAttribute('data-name');

            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cartT.innerText = data.cartSize;
                });

        });

    });