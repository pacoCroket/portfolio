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
        return false;
    });

    // only show navbar when scrolling up

    var previousScroll = 0;

        // fade in .navbar
        $(function () {
            $(window).scroll(function () {
                
                var currentScroll = $(this).scrollTop();

                if (currentScroll > 100 && currentScroll < $(document).height() - $(window).height()){
 
                    if (currentScroll > previousScroll){
                        $('.main-menu').fadeOut(700);
                    } else {
                        $('.main-menu').fadeIn();
                    }
                } else {
                    $('.main-menu').fadeIn();
                }
                
                previousScroll = currentScroll;
            });
        });
 

});

$('#animationToggle').ready(function(){
    $("#rain-sketch").load("rain-sketch.html"); 
});
