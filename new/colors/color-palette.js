var c = document.getElementById("can");
var g = c.getContext("2d");

brightColors = [  '#f1385c', // red
                '#ff7f50', // orange
                '#fff000', // yellow
                '#00ff67', // green
                '#22ffcc', //mint
                '#00d3ef', // light blue
                '#326fd3', // dark blue
                '#a65ed1', //purple
];
secondColors = [  '#ed6e8c', // red
                '#ef8d6a', // orange
                '#baf42c', // yellow
                '#6ef9a6', // green
                '#62efca', //mint
                '#73e7ef', // light blue
                '#629cef', // dark blue
];
darkerColors = [  '#af1439', // red
                '#c1481e', // orange
                '#86c622', // green
                '#61d8b4', //mint
                '#2c6e93', // light blue
                '#103351', // dark blue
                '#531e8c', //purple
];

colors = [brightColors, secondColors];

var xstart = 0;
var origin = 0;
for(var i = 0; i < colors.length; i++){
    var ystart = 0;
    xstart = origin;
    for (color = 0; color < colors[i].length; color++){
        g.fillStyle = colors[i][color];
        g.beginPath();
        g.moveTo(xstart,ystart);
        g.lineTo(xstart+50,ystart);
        g.lineTo(xstart+50,ystart+50);
        g.lineTo(xstart,ystart+50);
        g.lineTo(xstart,ystart);
        g.fill();
        ystart += 50;
        xstart += 50;
    }
    xstart += 50;
    origin += 50;
}


var ystart = 50;
xstart = 0;
for (color = 0; color < darkerColors.length; color++){
    g.fillStyle = darkerColors[color];
    g.beginPath();
    g.moveTo(xstart,ystart);
    g.lineTo(xstart+50,ystart);
    g.lineTo(xstart+50,ystart+50);
    g.lineTo(xstart,ystart+50);
    g.lineTo(xstart,ystart);
    g.fill();
    ystart += 50;
    xstart += 50;
}

function rgbToHex(R,G,B) {
    return toHex(R)+toHex(G)+toHex(B)
}
function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)  + "0123456789ABCDEF".charAt(n%16);
}
$('#can').click(function(event){
  // getting user coordinates
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;
  // getting image data and RGB values
  var img_data = g.getImageData(x, y, 1, 1).data;
  var R = img_data[0];
  var G = img_data[1];
  var B = img_data[2];  var rgb = R + ',' + G + ',' + B;
  // convert RGB to HEX
  var hex = rgbToHex(R,G,B);
  // making the color the value of the input
  console.log(hex);
  document.getElementById("color-code").innerHTML = "#"+hex+" <br> "+"rgb("+rgb+")";
  $("body").css({"background-color": "#"+hex});

});
