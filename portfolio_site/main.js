$("#home-btn").click(function() {
    $('html,body').animate({
        scrollTop: 0},
    'slow');
});

$("#projects-btn").click(function() {
    $('html,body').animate({
        scrollTop: $("#projects-target").offset().top},
    'slow');
});

$("#contact-btn").click(function() {
    $('html,body').animate({
        scrollTop: $("#contact-target").offset().top},
    'slow');
});