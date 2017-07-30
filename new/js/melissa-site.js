// Parallax scrolling hero
window.addEventListener('scroll', function(event) {
        var depth, i, layer, layers, len, movement, topDistance, translate3d;
        topDistance = this.pageYOffset;
        layers = document.querySelectorAll("[data-type='parallax']");
        for (i = 0, len = layers.length; i < len; i++) {
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
    });

// // Highlight Project
// var colors = document.getElementById('colorrrs');
// colors.addEventListener('click', function(event){
//     var element = document.getElementById('colors-overlay');
//     var display = window.getComputedStyle(element).getPropertyValue('visibility');
//     console.log(display);
//
//     if (display === 'visible') {
//         element.style.visibility = "hidden";
//         document.getElementById("colors-info").style.visbility = "visible";
//         document.getElementById("colors-info").style.display = "block";
//         // var newElement = document.createElement('h1');
//         // var title = document.createTextNode("COLORRRS COPY");
//         // colors.appendChild(newElement.appendChild(title));
//         //
//         // var newDescription = document.createElement('p');
//         // var text = document.createTextNode("This is a paragraph.");
//         // colors.appendChild(newDescription.appendChild(text));
//     } else {
//
//     }
// });

$page_bg = '#2D122A';
$title_color = 'ghostwhite';
// $('h1').css('color', $title_color);
$('#footer').css('background', $page_bg);

$('button.alt1').on('mouseenter',function(){
	$('#footer').css('background', '#F9485A');
});

$('button.alt2').on('mouseenter',function(){
	$('#footer').css('background', '#B5F5F6');
	// $('h1').css('color', '#2D122A');
});
$('button.alt3').on('mouseenter',function(){
	$('#footer').css('background', 'orange');
});

$('button.alt4').on('mouseenter',function(){
	$('#footer').css('background', 'limegreen');

});


$('button.alt1').on('mouseleave',function(){
	$('#footer').css('background', $page_bg);
});
$('button.alt2').on('mouseleave',function(){
	$('#footer').css('background', $page_bg);
});
$('button.alt3').on('mouseleave',function(){
	$('#footer').css('background', $page_bg);
});
$('button.alt4').on('mouseleave',function(){
	$('#footer').css('background', $page_bg);
});


$("#resume").hover(function(){
    $('#r-text').addClass('animated tada');
});
$("#resume").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){
    $('#r-text').removeClass('animated tada');
});
