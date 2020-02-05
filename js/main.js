$(document).ready(function(){

    $("#header").load("header.html"); 
    $("#footer").load("footer.html"); 


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
        return true;
    });

    // only show navbar when scrolling up
    var previousScrollTime = 0;
    var previousScroll = 0;

    // fade in .navbar
    $(function () {
        $(window).scroll(function () {
            
            var currentScroll = $(this).scrollTop();

            if (currentScroll > 100){

                if (currentScroll > previousScroll){
                    $('.main-menu').fadeOut(700);
                } else {
                    $('.main-menu').fadeIn();
                }
            } else {
                $('.main-menu').fadeIn();
            }
            
            previousScroll = currentScroll;
            previousScrollTime = new Date().getSeconds();
        });
    });

            
    setInterval(function() {
        if (new Date().getSeconds() - previousScrollTime > 10) {
            $('.main-menu').fadeIn(1500);
        }
      }, 500);
 

});

$('#animationToggle').ready(function(){
    $("#rain-sketch").load("rain-sketch.html"); 
});
