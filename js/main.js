$(document).ready(function(){

    // initialize isotope
    $('.project-area .grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'masonry'
      });

    let $btns = $('.project-area .button-group button');
    $btns.click(function(e){

        $('.project-area .button-group button').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.project-area .grid').isotope({
            filter: selector
        })
        return false;
    });

    // let nav_offset_top = $('.header-area').height();

    // // don't show p5.js if device is smaller than 600px width
    // if($(window).width() < 600) {
    //     $("#p5js-sketch").remove();
    // } else {
    //     // setHeight($(window).width()-nav_offset_top)
    // }

    // sticky navigation menu

    // function navbarFixed() {
    //     if ($('.header-area').length) {
    //         $(window).scroll(function() {
    //             let scroll = $(window).scrollTop();
    //             if (scroll >= nav_offset_top+50) {
    //                 $('.header-area .main-menu').addClass('navbar-fixed');
    //             } else {
    //                 $('.header-area .main-menu').removeClass('navbar-fixed');
    //             }
    //         });
    //     }
    // }

    // navbarFixed();

    // $('.site-main .p5js-sketch').attr('height', nav_offset_top-150);

    // document.addEventListener("keydown", function (e) {
    //     if([37,38,39,40].indexOf(e.keyCode) > -1){
    //     e.preventDefault();
    //     // Do whatever else you want with the keydown event (i.e. your navigation).
    //     }
    // }, false);

});