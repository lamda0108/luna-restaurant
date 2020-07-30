$(function () {
    /* =========================================
               superslides
============================================ */
    $('#slides').superslides({
        animation: 'fade',
        play: 4000,
        pagination: false

    });

    /* =========================================
                  typed js
    ============================================ */
    var typed = new Typed(".typed", {
        strings: ["Homestyle food.", "Fast, fresh, delicious.", "Drive through window.", "Reserve a table online."],
        typeSpeed: 70,
        loop: true,
        startDelay: 500,
        showCursor: false
    });

    /* =========================================
                   preloader
    ============================================ */
    window.addEventListener('load', function () {
        document.querySelector('.preloader').style.display = "none";
    });
    
    /* =========================================
                   wow js
    ============================================ */
    new WOW().init();
    
    window.addEventListener('load', function(){
        document.querySelector('.title-img').classList.add("animated", "swing");
         document.querySelector('.welcome').classList.add("animated", "zoomIn");
    });
});

