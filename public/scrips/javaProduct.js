//------Para galeria de imagenes del producto-----

//variables de la galeria
    var images = document.querySelectorAll('.gallery__mini');
    var banner = document.querySelector('.gallery__photos');
   
    // reviso el error para saber si estan en nulo    
    if (images != null && banner != null) {

        //Recorro las imagenes
        function loadImages(img, index) {
            function clickImage(event) {
                var background = img.style.backgroundImage;
                var url = background.replace('url(', '').replace(')', '');
                console.log(url);
                banner.style.backgroundImage = 'url(' + url + ')';
            }

            function imgActive(event) {
                for (let index = 0; index < images.length; index++) {
                    const img = images[index];
                    img.classList.remove('active');

                }
                img.classList.add('active');

            }

            if (index === 0) {
                clickImage();
                imgActive();
            }

            img.addEventListener('click', clickImage);
            img.addEventListener('click', imgActive);
        }
        images.forEach(loadImages);

    }
