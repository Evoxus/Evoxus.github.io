'use strict';

function smoothScroll() {
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, 1000, "easeInOutExpo");
              return false;
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

function menuToggle() {
  $('button').on('click', function(e){
    $('nav').children('ul').slideToggle(500);
  })
}

$(function() {
  // document.cookie = 'cross-site-cookie=http://cloudflare.com/; SameSite=None; Secure';
  smoothScroll();
  scrollToTop();
  menuToggle();
});