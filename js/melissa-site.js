$(function(){
    $(".element1").typed({
        strings: ["MELELLO", "MELISSA LOPEZ"],
        typeSpeed: 50,
        startDelay: 0,
        showCursor: false,
    });
});
$(function(){
    $(".element2").typed({
        strings: ["var melello; ", "RÉSUMÉ"],
        typeSpeed: 50,
        startDelay: 3500,
        showCursor: false,
    });
});
$(function(){
    $(".element3").typed({
        strings: ["showWork();", "PORTFOLIO"],
        typeSpeed: 50,
        startDelay: 6500,
        showCursor: false,
    });
});
$(function(){
    $(".element4").typed({
        strings: ["?getInTouch=yes", "CONTACT"],
        typeSpeed: 50,
        startDelay: 9500,
        showCursor: false
    });
});
$(function(){
  $(".element5").typed({
    // strings: ["Hi, I'm Melissa.", "I'm an aspiring software engineer, passionate about student leadership and making people's lives a little easier.",
    // "I live in New York City, but I still miss the Californian sunsets I grew up with.","My full name is Melissa Eileen Lopez, that's where MELELLO comes from.",
    // "Thanks for stopping by. Hope you'll enjoy learning more.", ""],
    strings: ["Hi, I'm Melissa.", "Thanks for stopping by, Hope you'll enjoy learning more.",""],
    typeSpeed: 0,
    startDelay: 13100,
    showCursor: false,
  });
});

// Toggles nav button style
$('.navBtn').click(function() {
    $(this).toggleClass('active');
});

// Closes the sidebar menu
$('#menu-close').click(function(e) {
    e.preventDefault();
    $('#sidebar-wrapper').toggleClass('active');
});
// Opens the sidebar menu
$('#menu-toggle').click(function(e) {
    e.preventDefault();
    $('#sidebar-wrapper').toggleClass('active');
});
// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 45 // offset for the header
                }, 1000);
                return false;
            }
        }
    });
});

(function() {
  window.addEventListener('scroll', function(event) {
    var depth, i, layer, layers, len, movement, topDistance, translate3d;
    topDistance = this.pageYOffset;
    layers = document.querySelectorAll("[data-type='parallax']");
    for (i = 0, len = layers.length; i < len; i++) {if (window.CP.shouldStopExecution(1)){break;}
      layer = layers[i];
      depth = layer.getAttribute('data-depth');
      movement = -(topDistance * depth);
      translate3d = 'translate3d(0, ' + movement + 'px, 0)';
      layer.style['-webkit-transform'] = translate3d;
      layer.style['-moz-transform'] = translate3d;
      layer.style['-ms-transform'] = translate3d;
      layer.style['-o-transform'] = translate3d;
      layer.style.transform = translate3d;
    }
window.CP.exitedLoop(1);

  });

}).call(this);
