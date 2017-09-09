function setup() {
  createCanvas(600, 900);
  background(175, 233, 255);

  // Balloons
  for (var i = 0; i < 1000; i++) {
      var randomX = Math.floor((Math.random() * 580) + 10);
      var randomY = Math.floor((Math.random() * 525) + 1);
      while(Math.sqrt(((randomX-600)*(randomX)-600) + (randomY-250)*(randomY-250)) < 300){
          randomX = Math.floor((Math.random() * 580) + 10);
      }
      var c = color('hsl('+Math.floor((Math.random() * 360))+', 100%, 60%)');

      noFill();
      stroke(c);
      curve(randomX-100, randomY+100, randomX, randomY+28, 300, 650, randomX+100, randomY-100);

      fill(c);
      noStroke();
      ellipse(randomX, randomY, 30, 30);
      triangle(randomX-13,randomY+8,  randomX+13,randomY+8, randomX,randomY+30);

  }

  // House
  fill(130, 60, 0); // brown chim
  quad(280, 700,   310, 700,   310, 645,   280, 645);

  fill(238, 139, 139); // pink
  rect(245, 750, 140, 100);

  strokeWeight(3);
  stroke(255);
  fill(98, 213, 239); //blue
  rect(245, 750, 140, 10);
  noStroke();

  fill(110, 80, 0); // brown roof
  quad(225, 750,   405, 750,   375, 700,   255, 700);

  fill(244, 229, 66); //yellow
  triangle(370, 730,   310, 730,   340, 660);
  quad(370, 730,   310, 730,   310, 760, 370, 760);

  fill(144, 229, 98); //green
  quad(370, 850,   310, 850,   310, 760,   370, 760);

  fill(255, 211, 236); //light pink lower house
  rect(245, 835, 140, 15);

  // pink upper window
  strokeWeight(3);
  stroke(238, 139, 139);
  noFill();
  rect(330, 705, 20, 40);
  strokeWeight(1);
  line(330, 725, 350, 725);

  //orange line
  stroke(255, 152, 17);
  strokeWeight(8);
  noFill();
  line(310, 760, 370, 760);

  // brown lower window
  strokeWeight(3);
  stroke(130, 60, 0);
  noFill();
  rect(325, 775, 30, 40);
  strokeWeight(1);
  line(325, 795, 355, 795);
  line(340, 775, 340, 815);

  // door
  stroke(255);
  strokeWeight(1);
  fill(130, 60, 0); // brown
  quad(285, 835,   305, 835,   305, 790,   285, 790);

  // white railing
  strokeWeight(3);
  stroke(255);
  noFill();
  line(245, 750, 245, 850);
  line(255, 825, 255, 850);
  line(265, 825, 265, 850);
  line(275, 750, 275, 850);
  strokeWeight(1);
  line(245, 824, 275, 824);

}
