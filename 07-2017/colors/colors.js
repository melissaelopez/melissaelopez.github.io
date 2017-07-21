document.getElementById("hex-rgb-converter").style.visibility = "visible";
document.getElementById("palettes").style.visibility = "hidden";
$("body").css({"background-color": "#ff7785"});

$("#hrBtn").click(function() {
    document.getElementById("hex-rgb-converter").style.visibility = "visible";
    document.getElementById("palettes").style.visibility = "hidden";
    $("body").css({"background-color": "#ff7785"});
});
$("#cpBtn").click(function() {
    document.getElementById("hex-rgb-converter").style.visibility = "hidden";
    document.getElementById("palettes").style.visibility = "visible";
    $("body").css({"background-color": "lightgray"});
    document.getElementById("color-code").innerHTML = "hex"+"<br>"+"rgb";
});
