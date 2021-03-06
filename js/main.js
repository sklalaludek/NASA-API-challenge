$(function() {
    var nasaUrl = 'https://api.nasa.gov/planetary/apod',
        marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000',
        key = '&api_key=X0F091rbxFo3yIow6XjUAGwwZG7MZop99Ov1wDhi',
        logo = $('#welcome__logo'),
        galleryItem = $('.gallery__item'),
        title = $('.title'),
        date = $('.date'),
        gridWrapper = $('.grid'),
        galleryMarsItems = $('.gallery_mars__item'),
        btn = $('button');

    /*random integer*/
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*random date*/
    var year = getRandomInt(2011, 2016),
        month = getRandomInt(1, 12),
        day = getRandomInt(1, 28),
        randomDate = year + '-' + month + '-' + day;

    /*creating Ajax request for a picture in the gallery section*/
    function getRandomPic() {
        $.ajax({
            url: nasaUrl + '?date=' + randomDate + key,
            type: 'GET',
            dataType: 'json'
        }).done(function(r) {
            showRandomPic(r);
        }).fail(function(error) {
            console.error(error);
        });
    }

    /*creating Ajax requests for Mars pictures*/
    function getMarsPic() {
            $.ajax({
                url: marsUrl + key,
                type: 'GET',
                dataType: 'json'
            }).done(function(r) {
                showMarsGallery(r);
            }).fail(function(error) {
                console.error(error);
            });
    }

    /*display elements in the gallery section*/
    function showRandomPic(data) {
        galleryItem.css("background-image", 'url("' + data.url + '")');
        title.text(data.title).hide();
        date.text(data.date).hide();
    }

    /*display elements in the Mars gallery section*/
    function showMarsGallery(data) {
        if (data && document.readyState === "complete") {
            var marsPhotos = data.photos;
            var galleryMarsItemsHidden = $('.gallery_mars__item___hide');

            galleryMarsItems.each(function(){
                $(this).css("background-image", 'url("' + marsPhotos[Math.floor(Math.random() * (850 - 0 + 1)) + 0].img_src + '")');
            });
            galleryMarsItemsHidden.each(function(){
                $(this).css("background-image", 'url("' + marsPhotos[Math.floor(Math.random() * (850 - 0 + 1)) + 0].img_src + '")');
            });
        }
    }

    function debounce(func, wait) {
        var timeout,
            immediate = true,
            wait = arguments[1] !== (void 0) ? arguments[1] : 20;

        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /*animate title*/
    function intro(e) {
        $('.animation-fly-in').removeClass('hidden');
    }

    /*show content*/
    function checkContent(e) {
        if ($(this).scrollTop() > $('.animation-fly-in').offset().top) {
            title.slideDown(1000);
            date.delay(2000).slideDown(1000);
            logo.fadeIn(1000);
        } else if ($(this).scrollTop() < $('.animation-fly-in').offset().top) {
            logo.fadeOut(1000);
        }
    }

    /*create items in Mars gallery section*/
    function createItems() {
        for (var i = 0; i <= 5; i++) {
            gridWrapper.append('<div class="gallery_mars__item___hide"></div>');
        }
    }

    function showMorePics(e) {
        e.stopPropagation();
        $('.gallery_mars__item___hide').each(function(){
            $(this).css("display", "block");
        });
        $(this).hide();
    }

    /*back to the top*/
    function scrollUp() {
        $('html,body').animate({
            scrollTop: $('#main').offset().top + 'px'
        }, 1000);
    }

    $(window).on('load', intro());
    $(window).on('load', createItems());
    $(window).on('scroll', debounce(checkContent, 10));
    logo.on('click', scrollUp);
    btn.on('click', showMorePics);
    getRandomPic();
    getMarsPic();
});
