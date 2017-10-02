var theCanvas;

var bucketHeight = 10;
var bucketWidth = 100;
var bucketX = 250;
var bucketY = 500 - (bucketHeight / 2);

var numDrops;
var numShell;
var bucketSpeed;
var baseWindSpeed;

var bgArtwork;
var windArtwork;
var shellArtwork;
var oceanSound;
var pointSound;

var rangeData = 0;

var start = false;
var gameOver = false;

var points = 0;
var timer = 30; // game length in seconds
var currentTime;


function preload(){
    bgArtwork = loadImage("images/water.jpg");
    windArtwork = loadImage("images/wind.png");
    shellArtwork = loadImage("images/shell.png");
    oceanSound = loadSound("sounds/ocean.mp3");
    pointSound = loadSound("sounds/point.mp3");
    shellSound = loadSound("sounds/shell.mp3");
}

function setup(){
    theCanvas = createCanvas(500,500);
    theCanvas.parent("canvas-container");
    theCanvas.style('display', 'block');
    theCanvas.style('margin', 'auto');
    background(bgArtwork);
    fill(255);
    textSize(12);
    text("C A T C H   T H E   S E A", 190, 100);
    textSize(40);
    text("B R E E Z E", 150, 140);
    textSize(12);
    text("U S E   A   A N D   D   T O   M O V E   L E F T   A N D   R I G H T", 85, 210);
    text("B E W A R E   O F   S E A   S H E L L S", 150, 230);
    text("S E L E C T   L E V E L   1 , 2 , O R , 3   T O   B E G I N !", 90, 270);
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();
    fill(255);

    drops = []
    for (var i = 0; i < numDrops; i++){
        drops.push(new Wind());
    }

    shells = []
    for (var i = 0; i < numShell; i++){
        drops.push(new Shell());
    }
}

function draw(){
    // 1 2 or 3 difficulty to start
    if (keyIsDown(49)){
        start = true;
        numDrops = 10;
        baseWindSpeed = 1;
        bucketSpeed = 10;
        numShell = 1;
        startTime = millis();
        oceanSound.loop();
    }
    if (keyIsDown(50)){
        start = true;
        numDrops = 5;
        baseWindSpeed = 3;
        bucketSpeed = 7;
        numShell = 2;
        startTime = millis();
        oceanSound.loop();
    }
    if (keyIsDown(51)){
        start = true;
        numDrops = 3;
        baseWindSpeed = 5;
        bucketSpeed = 4;
        numShell = 4;
        startTime = millis();
        oceanSound.loop();
    }
    if (start){
        // r for resume
        if (keyIsDown(82)){
            pause = false;
        }

        currentTime = millis();
        if (!gameOver){
            // Redraw background
            image(bgArtwork, 250, 250, height, width);

            // Show countdown timer and points
            fill(255);
            text("T I M E   R E M A I N I N G:  "+ Math.floor((timer - (currentTime - startTime) /1000)), 30, 30);
            text("P O I N T S:  " + points, 30, 50);

            // Wind and Shells
            if (drops.length == 0){
                for (var i = 0; i < numDrops; i++){
                    drops.push(new Wind());
                }
            }
            for (var i = 0; i < drops.length; i++){
                drops[i].fall();
                drops[i].display();
            }

            if (shells.length == 0){
                for (var i = 0; i < numShell; i++){
                    shells.push(new Shell());
                }
            }
            for (var i = 0; i < shells.length; i++){
                shells[i].fall();
                shells[i].display();
            }

            // Check if game should be over
            if ((currentTime) >= (timer + 2) * 1000){
                gameOver = true;
                textSize(30);
                image(bgArtwork, 250, 250, height, width);
                fill(255);
                text("G A  M E   O V E R", 120, 150);
                textSize(200);
                text(points, 125, 340);
            }

            // Draw bucket, and move position if the A or D keys are down
            fill('#F23140'); // teal
            rect(bucketX, bucketY, bucketWidth, bucketHeight);
            if (keyIsDown(65)){                 // A key
                if (bucketX - bucketSpeed < -50){
                    bucketX = 550;
                } else {
                    bucketX -= bucketSpeed;
                }
            }
            else if (keyIsDown(68)){           // D key
                if (bucketX + bucketSpeed > 550){
                    bucketX = -50;
                } else {
                    bucketX += bucketSpeed;
                }
            }
        } // game not over
    } // start
} // draw

function newFactor(){
    return Math.random() * (faster - 1) + 1;
}

function Wind(){
    this.x = random(width);
    this.y = 0;
    this.speedOrigin = random(baseWindSpeed, baseWindSpeed + 5);
    this.speed = this.speedOrigin;

    this.display = function() {
        image(windArtwork, this.x, this.y, 20, 50);
    }

    this.fall = function() {
        this.y += this.speed;

        if(this.y > height){
            this.y = 0;
            this.x = random(width);
        }

        if (this.y + 15 > 490 && this.x > bucketX - (bucketWidth / 2) && this.x < bucketX + (bucketWidth / 2)){
            points++;
            this.y = 0;
            this.x = random(width);
            pointSound.play();
        }
    }
}

function Shell(){
    this.x = random(width);
    this.y = 0;
    this.speedOrigin = random(baseWindSpeed, baseWindSpeed + 5);
    this.speed = this.speedOrigin;

    this.display = function() {
        image(shellArtwork, this.x, this.y, 70, 70);
    }

    this.fall = function() {
        this.y += this.speed;

        if(this.y > height){
            this.y = 0;
            this.x = random(width);
        }

        if (this.y + 15 > 490 && this.x > bucketX - (bucketWidth / 2) && this.x < bucketX + (bucketWidth / 2)){
            points--;
            this.y = 0;
            this.x = random(width);
            shellSound.play();
        }
    }
}

function updateRange(clickedRange) {
  rangeData = int(clickedRange.value);
  for (var i = 0; i < drops.length; i++){
      drops[i].speed = drops[i].speedOrigin + rangeData;
  }
}
