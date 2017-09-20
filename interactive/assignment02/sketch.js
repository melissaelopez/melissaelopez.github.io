var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = 250;
var paddleY = 500 - (paddleHeight / 2);
var paddleSpeed = 8;

var ballX = 250;
var ballY = 250;
var ballSpeedX = Math.random() * 7 + 1;
var ballSpeedY = Math.random() * 7 + 1;
var faster = 1.1;

var objX = Math.random() * 400 + 50;
var objY = Math.random() * 300 + 50;
var objWidth = 50;
var objHeight = 100;

var bgArtwork;
var flowerArtwork;
var ballArtwork;
var bounceSound;
var missSound;
var ponitSound;

var points = 0;
var misses = 0;

var start = false;
var pause = false;

function preload(){
    bgArtwork = loadImage("images/bg-full.jpg");
    flowerArtwork = loadImage("images/cloud.png");
    ballArtwork = loadImage("images/ball.png");
    bounceSound = loadSound("sounds/bounce.mp3");
    missSound = loadSound("sounds/miss.mp3");
    pointSound = loadSound("sounds/point.mp3");
}

function setup(){
    createCanvas(500,500);
    background(bgArtwork);
    fill(255);
    textSize(120);
    text("HI!", 160, 200);

    textSize(10);
    text("U S E   A   A N D   D   T O   M O V E   L E F T   A N D   R I G H T", 100, 430);
    text("U S E   P   A N D   R   T O   M O V E   P A U S E   A N D   R E S U M E", 85, 445);
    text("P R E S S   S P A C E B A R   T O   B E G I N !", 130, 470);
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();
    fill(255);
}

function draw(){
    // space bar to start
    if (keyIsDown(32)){
        start = true;
    }
    if (start){
        // p for pause
        if (keyIsDown(80)){
            pause = true;
        }
        // r for resume
        if (keyIsDown(82)){
            pause = false;
        }

        if (!pause){
            // Redraw backgrouns
            image(bgArtwork, 250, 250, height, width);

            // Show score
            fill(255);
            text("P O I N T S :  "+points, 50, 50);
            text("M I S S E S :  "+misses, 50, 70);

            // Draw boundaries
            fill(249,72,90, 200);                    // hot pink
            rect(5, 250, 10, height);
            rect(495, 250, 10, height);

            fill(112,224,224, 200);                    // deep purple
            rect(250, 5, width, 10);

            // Draw objective, and see if the ball is close to it
            image(flowerArtwork, objX, objY);
            if (dist(ballX, ballY, objX, objY) < 50){
                objX = Math.random() * 400 + 50;
                objY = Math.random() * 300 + 50;
                points += 1;
                pointSound.play();
            }

            // Draw paddle, and move position if the A or D keys are down
            fill('#0DD6D3'); // sky teal
            rect(paddleX, paddleY, paddleWidth, paddleHeight);
            if (keyIsDown(65)){                 // A key
                if (paddleX - paddleSpeed < 60){
                    paddleX = 60;
                } else {
                    paddleX -= paddleSpeed;
                }
            }
            else if (keyIsDown(68)){           // D key
                if (paddleX + paddleSpeed > 440){
                    paddleX = 440;
                } else {
                    paddleX += paddleSpeed;
                }
            }

            // Draw the ball
            fill(255);
            ellipse(ballX, ballY, 20,20);

            // if the ball touches the left or right edge
            if (ballX <= 20 || ballX >= 480){
                ballSpeedX = -newFactor() * ballSpeedX;
                ballSpeedY = newFactor() * ballSpeedY;
                bounceSound.play();
            }
            // if the ball touches the paddle
            if (((ballX >= paddleX - (paddleWidth / 2) && ballX <= paddleX + (paddleWidth / 2)) && (ballY >= 480 && ballY <= 500) ) ){
                if (ballX > paddleX){ //hit left side, we want a negative x speed
                    if (ballSpeedX < 0){
                        ballSpeedX = -newFactor() * ballSpeedX;
                    } else {
                        ballSpeedX = newFactor() * ballSpeedX;
                    }
                }
                else if (ballX < paddleX){ //hit right side, we want a positive x speed
                    if (ballSpeedX > 0){
                        ballSpeedX = -newFactor() * ballSpeedX;
                    } else {
                        ballSpeedX = newFactor() * ballSpeedX;
                    }
                }
                ballSpeedY = -faster * ballSpeedY;
                bounceSound.play();
            }
            // if the ball touches the top edge
            if (ballY <= 20){
                ballSpeedY = -newFactor() * ballSpeedY;
                ballSpeedX = newFactor() * ballSpeedX;
                bounceSound.play();
            }
            // if the ball gets past the paddle (or out of bounds event), reset the ball
            if (ballY > 600 || ballX < 10 || ballX > 490){
                ballX = 250;
                ballY = 250;
                ballSpeedX = random(-10, 8)+2;
                ballSpeedY = random(-10, 8)+2;
                misses += 1;
                missSound.play();
            }

            // move the ball by the speed
            ballX += ballSpeedX;
            ballY += ballSpeedY;
        } // resume
    } // start
} // draw

function newFactor(){
    return Math.random() * (faster - 1) + 1;
}
