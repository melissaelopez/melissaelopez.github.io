var theCanvas;
var canvasWidth;;
var canvasHeight;

var id = 1;
var numColors = 7;
var colors = [];
var numSquaresPerRow = 10;
var squares = [];
var remainingMoves = 30;


function setup() {
    canvasHeight = windowHeight < windowWidth ? windowHeight : windowWidth;
    canvasWidth = windowHeight < windowWidth ? windowHeight : windowWidth;
    theCanvas = createCanvas(canvasWidth, canvasHeight);
    repositionCanvas();
    noStroke();
    background(0);
    generateColors();

    createBoard();
    setAllNeighbors();
    displaySquares();
}

function draw() {

    displaySquares();
}

function repositionCanvas() {
  var xPos = int(windowWidth/2 - 0.5*width);
  var yPos = int(windowHeight/2 - 0.5*height);
  theCanvas.position(xPos, yPos);
}

function windowResized() {
  repositionCanvas();
}

function Square(x, y, size, id) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = random(colors);
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
    this.id = id;
    this.inFlood = false;
    this.display = function() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }
}

function generateColors(){
    // for (var i = 0; i < numColors; i++){
    //     colors.push(color('hsl('+Math.floor((Math.random() * 360))+', 100%, 60%)'));
    // }
    colors.push(color('hsl('+(  Math.floor((Math.random() * 50)) + 0  )  +', 100%, 60%)'));
    colors.push(color('hsl('+( Math.floor((Math.random() * 50)) + 100 )+', 100%, 60%)'));
    colors.push(color('hsl('+( Math.floor((Math.random() * 50)) + 200 )+', 100%, 60%)'));
    colors.push(color('hsl('+( Math.floor((Math.random() * 60)) + 300 )+', 100%, 60%)'));
}

function createBoard() {
    var squareSize = width / numSquaresPerRow;
    var rowPos = 0;
    while (rowPos <= height){
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
}

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

    //add all the right boxes to fill with inFlood property
    // checkAddToFill(squares[0][0], squares[0][0].color, color);

    if (flood(color)){
        remainingMoves--;
        console.log(remainingMoves);
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
