var theCavas;
var moles;
var shift;
var score = 0;

var state = 0;
var timer = 30; // game length in seconds
var startTime;
var currentTime;

function Mole(x, y){
    this.xPos = x;
    this.yPos = y;
    this.up = false;
    this.framesInState = 0;
    this.framesToStayInState = int(random(100, 200));

    this.display = function(){
        fill(255);
        ellipse(this.xPos, this.yPos, 100, 100);
        if (this.up){
            // fill(255, 0, 0);
            // ellipse(this.xPos, this.yPos, 40, 40);
            image(sunArtwork, this.xPos, this.yPos, 80, 80);
        }
        this.framesInState += 1;
    }

    this.update = function() {
        if (this.framesInState >= this.framesToStayInState) {

          if (this.up == true) {
            this.up = false;
          }
          else {
            this.up = true;
          }

          this.framesInState = 0;
          this.framesToStayInState = int(random(100,200));
        }
    }

    this.checkHit = function() {
        if (mouseIsPressed && dist(mouseX, mouseY, this.xPos, this.yPos) < 50){
            if (this.up){
                score += 1;
                hitSound.play();
                this.framesInState = 201;
                this.update();
            }
        }
    }
}

function preload(){
    bgArtwork = loadImage("images/grad.jpg");
    gameOverArtwork = loadImage("images/game-over.jpg");
    sunArtwork = loadImage("images/sun.png");
    hammerArtwork = loadImage("images/hammer.png");
    hitSound = loadSound("sounds/hit.mp3");
}

function setup(){
    theCanvas = createCanvas(500,500);
    theCanvas.style('display', 'block');
    theCanvas.style('margin', 'auto');
    theCanvas.parent("canvas-container");

    background(bgArtwork);
    strokeWeight(0);
    imageMode(CENTER);
    noCursor();

    moles = [];
    shift = 100;
    for (var i = 0; i < 3; i++){
        moles.push(new Mole(shift,100));
        moles.push(new Mole(shift,250));
        moles.push(new Mole(shift,400));
        shift += 150;
    }
}

function draw(){
    if (state == 0){
        startScreen();
    }
    if (state == 1){
        playGame();
    }
    if (state == 2){
        gameOver();
    }
}

function startScreen(){
    image(bgArtwork, 250, 250, 500, 500);
    textSize(100);
    fill(255);
    text("WHACK", 50, 175);
    text("A", 50, 275);
    text("SUN", 50, 375);

    textSize(25);
    text("PRESS [SPACEBAR]", 50, 425);
    text("TO START PLAYING!", 50, 455);

    if (keyIsDown(32)){
        state = 1;
        startTime = millis();
    }
}

function playGame(){
    currentTime = millis();
    image(bgArtwork, 250, 250, 500, 500);
    for (var i = 0; i < 9; i++){
        moles[i].checkHit();
    }
    for (var i = 0; i < 9; i++){
        moles[i].display();
    }
    for (var i = 0; i < 9; i++){
        moles[i].update();
    }
    textSize(10);
    text("T I M E   R E M A I N I N G:  "+ Math.floor((timer - (currentTime - startTime) /1000)), 320, 480);
    text("S C O R E :  " + score, 50, 480);
    image(hammerArtwork, mouseX, mouseY, 50, 50);

    if ((currentTime) >= (timer + 2) * 1000){
        state = 2;
    }
}

function gameOver(){
    image(gameOverArtwork, 250, 250, 500, 500);
    textSize(100);
    text("GAME", 100, 200);
    text("OVER", 100, 300);
    textSize(25);
    text("S C O R E :  " + score, 150, 350);
    textSize(25);
}
