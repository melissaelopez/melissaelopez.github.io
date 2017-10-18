var theCanvas;
var canvasWidth;
var canvasHeight;

var id = 1;
var numColors = 6;
var colors = [];
var numSquaresPerRow = 13;
var squares = [];
var remainingMoves;

var state = 0;
var startArt = [];
var floodItArtwork;
var startArtIndex = 0;
var scoreOpacity = 255;
var scoreSpeed = 7;

var playerWins;

function preload(){
    var startArtwork1 = loadImage("img/startArtwork-01.png");
    var startArtwork2 = loadImage("img/startArtwork-02.png");
    var startArtwork3 = loadImage("img/startArtwork-03.png");
    var startArtwork4 = loadImage("img/startArtwork-04.png");
    startArt = [startArtwork1, startArtwork2, startArtwork3, startArtwork4];
    floodItArtwork = loadImage("img/flood-it-overlay.png");
}

function setup() {
    // determine how to maximize a square canvas in the browser window
    canvasHeight = windowHeight < windowWidth ? windowHeight-100 : windowWidth-100;
    canvasWidth = windowHeight < windowWidth ? windowHeight-100 : windowWidth-100;
    theCanvas = createCanvas(canvasWidth, canvasHeight);

    // center canvas
    repositionCanvas();

    // style + game setup
    noStroke();
    background(0);
    generateColors();
    createBoard();
}

// three states: PRE-GAME, PLAY, POST-GAME
function draw() {
    if (state == 0){
        startScreen();
    }
    else if (state == 1){
        playGame();
    }
    else if (state == 2){
        endGame();
    }
}

// ------------------ SQUARE CLASS ----------------------------

function Square(x, y, size, id) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = random(colors);

    // neighbors populated with helper funtion after entire board is created
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;

    // id for easier debugging
    this.id = id;

    // key for determining how to flood each time the user clicks on a square
    this.inFlood = false;

    this.display = function() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }
}

// ------------------ PRE-GAME ----------------------------

// randomly generate colors to use in the game
function generateColors(){
    // put 22FFE4 in each pallete!!
    var colors1 = [color('#FF8183'), color('#75879C'), color('#76AAB4'), color('#ACC7C8'), color('#F9FFFB'), color('#F8BF83'), color('#22FFE4')]
    var colors2 = [color('#FF00C5'), color('#FF5EC9'), color('#682D89'), color('#00DBFF'), color('#FFA9E2'), color('#F9FFFB'), color('#22FFE4')];

    colors = [colors1, colors2];
    colors = random(colors);
}

// when the game starts, play dancing squares animation and wait for the user to press spacebar
function startScreen(){
    dancingScreenAnimation();
    textSize(25);
    fill(255);
    startArtIndex += .5;
    // image(startArt[(Math.floor(startArtIndex)) % 4], 0, 0, canvasWidth, canvasHeight);
    image(floodItArtwork, 0, 0, canvasWidth, canvasHeight);
    if (keyIsDown(49)){
        numSquaresPerRow = 5;
        remainingMoves = 15;
        createBoard();
        state = 1;
    }
    else if (keyIsDown(50)){
        numSquaresPerRow = 10;
        remainingMoves = 25;
        createBoard();
        state = 1;
    }
    else if (keyIsDown(51)){
        numSquaresPerRow = 15;
        remainingMoves = 30;
        createBoard();
        state = 1;
    }
}

// recreate the board and redraw it to create dancing animation
function dancingScreenAnimation(){
    frameRate(7);
    createBoard();
    displaySquares();
}

// ------------------ GAMEPLAY ----------------------------

// display the squares and check if the game should have ended
function playGame(){
    frameRate(60);
    displaySquares();
    textSize(canvasWidth);
    textAlign(CENTER, CENTER);
    fill(255, scoreOpacity % 255);
    text(remainingMoves, canvasWidth/2, canvasHeight/2);
    scoreOpacity -= scoreSpeed;
    if (gameFinished()){
        state = 2;
        playerWins = true;
    }
    else if (movesExhausted()){
        state = 2;
        playerWins = false;
    }
}

// create squares to fill up the canvas
function createBoard() {
    squares = []
    var squareSize = width / numSquaresPerRow;
    var rowPos = 0;
    while (rowPos < height){
        colPos = 0;
        row = []
        for (var i = 0; i < numSquaresPerRow; i++){
            row.push(new Square(colPos, rowPos, squareSize, id++));
            colPos += squareSize;
        }
        squares.push(row);
        rowPos += squareSize;
    }
    squares[0][0].inFlood = true;
    setAllNeighbors();
    flood(squares[0][0].color);
}

// go through knewly created squares and populate the up, down, left, right properties of each square
function setAllNeighbors() {
    for (var i = 0; i < squares.length; i++) {
        for (var j = 0; j < squares[i].length; j++) {
            var s = squares[i][j];
            setUpNeighbor(s, i, j);
            setDownNeighbor(s, i, j);
            setLeftNeighbor(s, i, j);
            setRightNeighbor(s, i, j);
        }
    }
}

function setUpNeighbor(s, i, j) {
    s.up = i == 0 ? null : squares[i-1][j];
}
function setDownNeighbor(s, i, j) {
    s.down = i == squares.length - 1 ? null : squares[i+1][j];
}
function setLeftNeighbor(s, i, j) {
    s.left = j == 0 ? null : squares[i][j-1];
}
function setRightNeighbor(s, i, j) {
    s.right = j == squares.length[i] - 1 ? null : squares[i][j+1];
}

function displaySquares() {
    for (var i = 0; i < squares.length; i++){
        for (var j = 0; j < squares[i].length; j++){
            squares[i][j].display();
        }
    }
}

function mousePressed(){
    var col = Math.floor(mouseX / (canvasWidth / numSquaresPerRow) );
    var row = Math.floor(mouseY / (canvasHeight / numSquaresPerRow) );
    var color = squares[row][col].color;

    if (flood(color)){
        remainingMoves--;
        scoreOpacity = 255;
    }
}

function flood(color){
    var validMove = false;
    for (var i = 0; i < squares.length; i++){
        for (var j = 0; j < squares[i].length; j++){
            if (squares[i][j].inFlood == true){
                // floodAnimation(squares[i][j]);
                squares[i][j].color = color;
                addNeighbors(squares[i][j], color);
                validMove = true;
            }
        }
    }
    return validMove;
}

function addNeighbors(s, color){
    if (s.up != undefined && s.up.color == color){
        s.up.inFlood = true;
    }
    if (s.down != undefined && s.down.color == color){
        s.down.inFlood = true;
    }
    if (s.left != undefined && s.left.color == color){
        s.left.inFlood = true;
    }
    if (s.right != undefined && s.right.color == color){
        s.right.inFlood = true;
    }
}

function gameFinished(){
    color = squares[0][0].color;
    for (var i = 0; i < squares.length; i++){
        for (var j = 0; j < squares[i].length; j++){
            if (squares[i][j].color != color){
                return false;
            }
        }
    }
    return true;
}

function movesExhausted(){
    return remainingMoves == 0 ? true : false;
}

// ------------------ POST-GAME ----------------------------
function endGame(){
    if (playerWins){
        dancingScreenAnimation();
    } else{
        background(0);
    }
}


// ------------------ MISC ----------------------------

function repositionCanvas() {
  var xPos = int(windowWidth/2 - 0.5*width);
  var yPos = int(windowHeight/2 - 0.5*height);
  theCanvas.position(xPos, yPos);
}

function windowResized() {
  repositionCanvas();
}









// for (var i = 0; i < numColors; i++){
//     colors.push(color('hsl('+Math.floor((Math.random() * 360))+', 100%, 60%)'));
// }

// standardized
// colors.push(color('hsla('+(  Math.floor((Math.random() * 50)) + 0  )  +', 100%, 60%, 0.09)'));
// colors.push(color('hsla('+( Math.floor((Math.random() * 50)) + 100 )+', 100%, 60%, 0.09)'));
// colors.push(color('hsla('+( Math.floor((Math.random() * 50)) + 200 )+', 100%, 60%, 0.09)'));
// colors.push(color('hsla('+( Math.floor((Math.random() * 60)) + 300 )+', 100%, 60%, 0.09)'));

// standardized
// colors.push(color('hsl('+(  Math.floor((Math.random() * 22)) + 0  )  +', 100%, 60%)'));
// colors.push(color('hsl('+( Math.floor((Math.random() * 40)) + 37 )+', 100%, 60%)'));
// colors.push(color('hsl('+( Math.floor((Math.random() * 60)) + 161 )+', 100%, 60%)'));
// colors.push(color('hsl('+( Math.floor((Math.random() * 30)) + 277 )+', 100%, 60%)'));
// colors.push(color('hsl('+( Math.floor((Math.random() * 20)) + 340 )+', 100%, 60%)'));




// function floodAnimation(s){
//     console.log("animate!");
//     displaySquares();
// }


// THIS FUNCTION DOES NOT WORK -- EXCEEDS CALL STACK
// function checkAddToFill(s, oldColor, newColor){
//     if (oldColor == newColor || s.color != oldColor) {
//         return;
//     }
//
//     s.inFlood = true;
//
//     if (s.left != null){
//         checkAddToFill(s.left, oldColor, newColor);
//     }
//     if (s.right != null) {
//         checkAddToFill(s.right, oldColor, newColor);
//     }
//     if (s.up != null) {
//         checkAddToFill(s.up, oldColor, newColor);
//     }
//     if (s.down != null) {
//         checkAddToFill(s.down, oldColor, newColor);
//     }
// }
