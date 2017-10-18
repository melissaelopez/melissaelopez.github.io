var theCanvas;
var canvasWidth;
var canvasHeight;

var id = 1;
var numSquaresPerRow = 13;
var squares = [];
var levelMoves;
var remainingMoves;

var numColors = 6;
var colors = [];
var colorsToAdd;
var addIndex = 0;

var state = 0;
var scoreOpacity = 255;
var scoreSpeed = 7;

var floodItArtwork;
var youWinArtwork;
var gameOverArtwork;

var playerWins;
var freeze;

function preload(){
    floodItArtwork = loadImage("img/flood-it-overlay.png");
    youWinArtwork = loadImage("img/you-win.png");
    youWinArtwork = loadImage("img/you-win.png");
    gameOverArtwork = loadImage("img/game-over.png");
}

function setup() {
    // determine how to maximize a square canvas in the browser window
    canvasHeight = windowHeight < windowWidth ? windowHeight-100 : windowWidth-100;
    canvasWidth = windowHeight < windowWidth ? windowHeight-100 : windowWidth-100;
    theCanvas = createCanvas(canvasWidth, canvasHeight);

    //
    colorsToAdd = [color('#D14674'), color('#15FF4C'), color('#C0C0FF'), color('#EDC500'), color('#680050'), color('#3A3A3A'), color('#440808')];

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
    numSquaresPerRow = 30;
    dancingScreenAnimation(floodItArtwork);
    textSize(25);
    fill(255);
    freeze = false;
    if (keyIsDown(49)){
        numSquaresPerRow = 5;
        levelMoves = 15;
        remainingMoves = 15;
        createBoard();
        state = 1;
    }
    else if (keyIsDown(50)){
        numSquaresPerRow = 10;
        levelMoves = 25;
        remainingMoves = 25;
        createBoard();
        state = 1;
    }
    else if (keyIsDown(51)){
        numSquaresPerRow = 15;
        levelMoves = 30;
        remainingMoves = 30;
        createBoard();
        state = 1;
    }
}

// recreate the board and redraw it to create dancing animation
function dancingScreenAnimation(imageName){
    frameRate(7);
    createBoard();
    displaySquares();
    image(imageName, 0, 0, canvasWidth, canvasHeight);
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
    if (!freeze){
        var col = Math.floor(mouseX / (canvasWidth / numSquaresPerRow) );
        var row = Math.floor(mouseY / (canvasHeight / numSquaresPerRow) );
        if (squares[row][col] != undefined){
            var color = squares[row][col].color;
            if (flood(color)){
                remainingMoves--;
                scoreOpacity = 255;
            }
        }
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
        dancingScreenAnimation(youWinArtwork);
        if (keyIsDown(32)){
            nextLevel();
        }
    } else{
        playerLost();
    }
}

function nextLevel(){
    numSquaresPerRow += 2;
    levelMoves += 5;
    remainingMoves = levelMoves;
    colors.push(colorsToAdd[addIndex]);
    addIndex++;
    createBoard();
    state = 1;
}

function playerLost(){
    freeze = true;
    image(gameOverArtwork, 0, 0, canvasWidth, canvasHeight);
    if (keyIsDown(32)){
        state = 0;
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
