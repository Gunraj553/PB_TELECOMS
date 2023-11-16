jQuery(document).ready(function ($) {
    // $("#owl-demo").owlCarousel({
    //     navigation: true,
    //     slideSpeed: 300,
    //     paginationSpeed: 500,
    //     items: 1,
    //     singleItem: true,
    //     autoPlay: 4000
    // });
    $(".all-banner-slide").owlCarousel({
        // items: 1,
        // smartSpeed: 1000,
        // autoplay: true,
        // lazyLoad: true,
        // dots: true,
        // autoplayTimeout: 3000,
        // singleItem: true,
        // navigation:true
        dots: true,
        slideSpeed: 300,
        paginationSpeed: 500,
        items: 1,
        singleItem: true,
        autoPlay: 2000
    });

});