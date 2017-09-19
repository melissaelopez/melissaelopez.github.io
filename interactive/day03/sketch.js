function setup(){
    createCanvas(500, 500);
    noStroke();
}

function draw(){
    // var xPos = random(0, width);
    // var yPos = random(0, height);

    fill(random(255), random(255), random(255), random(100, 255));
    var size = random(1, 10);


    // only draw if the mouse is currently pressed
    if (mouseIsPressed == true){
        if (mouseX < 250){
            ellipse(mouseX + random(-20, 20), mouseY + random(-20, 20), size, size);
        } else {
            rect(mouseX + random(-20, 20), mouseY + random(-20, 20), size, size);
        }
    }
}

function keyPressed(){
    if (key == "S") {
        save("masterpiece.png");
    }
    else if (key == "X") {
        background(255);
    }
}



// BALL MOVING EXAMPLE

// var ballX = 0;
// var ballY = 250;
// var ballSpeed = 1;
//
// // make a variable for the ball color
// var ballColor = 255;
//
// /*
// there are lots of built in variables
// mouseX, mouseY, pmouseX, pmouseY, height, width
// frameCount, key, keyCode, keyIsPressed
// */
//
// /*
// Random:
// random(); // between 0 and 1
// random(255); // between 0 and 255
// */
//
// function setup(){
//     createCanvas(500, 500);
//
//     noStroke();
// }
//
// function draw(){
//     background(255);
//     ellipse(ballX, ballY, 25, 25);
//     fill(0, ballColor, 0);
//     ballX += ballSpeed;
// }
//
// function keyPressed(){
//     ballSpeed = -ballSpeed
// }
//
// function mousePressed(){
//     ballColor -= 10;
// }


// function setup(){
//     createCanvas(500,500);
//     noCursor(); // hides the cursor, so you can design your own cursor!
//     rectMode(CENTER);
//     fill(0, 255, 255);
// }
//
// function draw(){
//     /*
//     **********************************************************************
//     Random:
//
//     for(var i = 0; i < 50; i++){
//         ellipse(mouseX+Math.floor(Math.random() * 50), mouseY+Math.floor(Math.random() * 50), 1, 1);
//     }
//     **********************************************************************
//     */
//
//     // flood the background with transparent black
//     background(0, 20); // RGB and alpha
//
//     // cyan box, no stroke
//     noStroke();
//
//     //  draw a square where the mouse is
//     rect(mouseX, mouseY, 30, 30);
//
//
// }
//
//
// /* if implemented, this will run once each time the mouse is pressed */
// function mousePressed() {
//     ellipse(mouseX, mouseY, 80, 80);
// }
//
// function keyPressed() {
//     fill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
// }
