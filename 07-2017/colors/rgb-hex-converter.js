$("#hex-box").on("change keyup paste", function(){
    var s = document.getElementById('hex-box').value;

    // Format input string to include a hash sign if not already there
    if (s.charAt(0) !== '#'){
        s = '#' + s;
    }

    if (s.length >= 4 && s.length <= 7){
        s = fillZeros(s,7);
        $("body").css({"background-color": s});

        // Check if any bad characters are in string s
        var badChars = "ghijklmnopqrstuvwxyz";
        var carryOn = true;
        var exp = /^[0-9a-z]+$/;
        for (var i = 1; i < s.length; i++){
            if (badChars.includes(s[i]) || (!s[i].match(exp))){
                carryOn = false;
                break;
            }
        }

        if (carryOn){
            // Make conversion to RGB
            var rStr = "" + s[1] + s[2];
            var gStr = "" + s[3] + s[4];
            var bStr = "" + s[5] + s[6];

            var r = parseInt(rStr, 16);
            var g = parseInt(gStr, 16);
            var b = parseInt(bStr, 16);

            if(isNaN(r) || isNaN(g) || isNaN(b)){
                document.getElementById('rgb-box').value = "rgb";
            } else {
                document.getElementById('rgb-box').value = "rgb("+r+","+g+","+b+")";
            }
        } else {
            s = "#ff7785";
            $("body").css({"background-color": s});
            document.getElementById('rgb-box').value = "rgb";
        }
    }
    else{
        s = "#ff7785";
        $("body").css({"background-color": s});
        document.getElementById('rgb-box').value = "rgb";
    }
})

$("#rgb-box").on("change keyup paste", function(){
    var s = document.getElementById('rgb-box').value;
    var firstComma = s.indexOf(",");
    var secondComma = s.lastIndexOf(",");
    var openP = s.indexOf("(");
    var closedP = s.indexOf(")");
    var r = parseInt(s.slice(openP+1, firstComma));
    var g = parseInt(s.slice(firstComma+1, secondComma));
    var b = parseInt(s.slice(secondComma+1, closedP));

    if (r > 255 || g > 255 || b > 255 || isNaN(r) || isNaN(g) || isNaN(b)){
        document.getElementById('hex-box').value = "hex";
        s = "#ff7785";
        $("body").css({"background-color": s});
    } else {
        r = fillZeros(r.toString(16), 2);
        g = fillZeros(g.toString(16), 2);
        b = fillZeros(b.toString(16), 2);
        s = "#"+r+b+g;
        document.getElementById('hex-box').value = s;
        $("body").css({"background-color": s});
    }
})

function fillZeros (s, n){
    while (s.length < n){
        s = s + '0'
    }
    return s;
}
