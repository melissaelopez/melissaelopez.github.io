// keep track of box position
var xPos = 250;
var yPos = 250;

// keep track of box speed
var xSpeed = 1;
var ySpeed = 2;

// keep track of box color
var r, g, b = 255;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  fill(255);
}

function draw() {
  background(0);

  // draw our box
  fill(r,g,b);
  rect(xPos, yPos, 50, 50);

  // move our box
  xPos += xSpeed;
  yPos += ySpeed;

  // did the box hit the left or right edge?
  if (xPos > width || xPos < 0) {
    // if so, reverse the box speed (so that next time it will be moving
    // in the opposite direction)
    xSpeed *= -1;

    // change the box color
    r = random(255);
    g = random(255);
    b = random(255);
  }

  // did the box hit the top or bottom edge?
  if (yPos > height || yPos < 0) {
    // if so, reverse the box speed (so that next time it will be moving
    // in the opposite direction)
    ySpeed *= -1;

    // change the box color
    r = random(255);
    g = random(255);
    b = random(255);
  }
}
