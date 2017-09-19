function setup(){
    createCanvas(500,500);

    noStroke();
    // noFill();
    fill(255, 0, 0);
    // strokeWeight(20);
    // fill("#00ffff");
    // stroke("#0af0f0");
}

function draw(){
    // background(0, 0, 0, 1);
    fill(mouseX/500 * 255);
    ellipse(mouseX, mouseY, 50, 50);
    ellipse(500-mouseX, mouseY, 50, 50);
    ellipse(mouseX, 500-mouseY, 50, 50);
    ellipse(500-mouseX, 500-mouseY, 50, 50);
}
