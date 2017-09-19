// holders for our graphics
var mario1, mario2;

function preload() {
  // load our graphics
  mario1 = loadImage('mario1.jpg');
  mario2 = loadImage('mario2.png');
}

function setup() {
  createCanvas(200, 200);
  background(0);
  
  // draw our two images
  image(mario1, 0, 0);
  image(mario2, 0, 100);
}

function draw() {
  
}