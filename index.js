'use strict';

function smoothScroll() {
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function (e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              e.preventDefault();
              
              // Close mobile menu immediately
              $('#menu-toggle').prop('checked', false);
              
              // Start scrolling right away
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, 400, "easeInOutExpo");
          }
      }
  });
}

function scrollToTop() {
  $(document).scroll(function () {
    let scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
  });
}

$(function() {
  smoothScroll();
  scrollToTop();
});