// variable to hold a reference to our A-Frame world
var world;
var particles = [];
var knots = [];
var bubbleSound;
var underwaterSound;
var knot;
function preload() {
	bubbleSound = loadSound("sounds/bubble.mp3");
	underwaterSound = loadSound("sounds/underwater.mp3");
}

function setup() {
	// no canvas needed
	noCanvas();

	//create c onnection to our VR World
	world = new World("VRScene"); // this scene needs to match id from HTML

	for (var i = 0; i < 100; i++){
		var xPos = random(-50, 50);
		var yPos = random(-10, 10);
		var zPos = random(-50, 50);
		var box2 = new Box({
			x: xPos,
			y: yPos,
			z: zPos,
			asset: "scales",
			width: 1,
			depth: 1,
			height: 1,
			clickFunction: function(me){
				world.slideToObject(me,1000);
			}
		});
		world.add(box2);
	}

	for (var i = 0; i < 30; i++){
		var knot = new Fish();
		knots.push(knot);
		var ring = new Ring({
			x: random(-50, 50),
			y: 50,
			z:random(-50, 50),
			red:random(220, 255),
			green:random(100,130),
			blue:random(50,140),
			rotationX: 90,
			scaleX: 5,
			scaleY: 5,
			scaleZ: 5
		});
		world.add(ring);
		var ring = new Dodecahedron({
			x: random(-50, 50),
			y: random(-50, 0),
			z:random(-50, 50),
			radius: .5,
			blue:random(220, 255),
			green:random(100,130),
			red:random(50,140),
			rotationX: 90,
			scaleX: 5,
			scaleY: 5,
			scaleZ: 5
		});
		world.add(ring);
	}

	underwaterSound.loop();
}


function draw() {

	var temp = new Bubble();
	particles.push( temp );

	for (var i = 0; i < particles.length; i++) {
		var result = particles[i].move();
		if (result == "delete") {
			particles.splice(i, 1);
			i-=1;
		}
	}

	for (var i = 0; i < knots.length; i++){
		knot = knots[i];
		knot.myFish.spinX(random(1, 10));
		knot.myFish.spinY(random(1, 10));
		knot.myFish.spinZ(random(1, 10));
		knot.move();
	}
}

function Bubble() {
	this.myBubble = new Sphere({
							x:random(-50, 50),
							y:random(-50, 50),
							z:random(-50, 50),
							red: random(100, 255),
							green:random(100, 255),
							blue:255,
							radius: 3,
							opacity: random(.1, 1),
							clickFunction: function() {
								bubbleSound.play();
								for (var i = 0; i < 10; i++){
									var temp = new Bubble();
									temp.myBubble.setX(random(this.getX(), this.getX()+5));
									temp.myBubble.setY(this.getY());
									temp.myBubble.setZ(this.getZ());
									temp.myBubble.setRadius(random(5, 10));
									particles.push( temp );
								}
							}
	});
	world.add(this.myBubble);
	this.xOffset = random(1000);
	this.yOffset = random(5000, 6000);
	this.zOffset = random(2000, 3000);
	this.move = function() {
		var xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		var yMovement = map( noise(this.yOffset), 0, 1, -0.05, 0.05);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		this.yOffset += 0.01;
		this.zOffset += 0.01;

		this.myBubble.nudge(xMovement, yMovement, zMovement);

		var boxScale = this.myBubble.getScale();
		this.myBubble.setScale( boxScale.x-0.005, boxScale.y-0.005, boxScale.z-0.005);

		if (boxScale.x <= 0) {
			world.remove(this.myBubble);
			return "delete";
		}
		else {
			return "ok";
		}
	}
}

function Fish(){
	this.myFish = knot = new TorusKnot({
		x: random(-50, 50),
		y: random(-50, 50),
		z:random(-50, 50),
		red:random(220, 255),
		green:random(100,130),
		blue:random(50,140),
		rotationX: random(0, 90)
	});
	world.add(knot);
	this.xOffset = random(1000);
	this.yOffset = random(5000, 7000);
	this.zOffset = random(2000, 3000);
	this.move = function(){
		var xMovement = map( noise(this.xOffset), 0, 1, -0.1, 0.1);
		var yMovement = map( noise(this.yOffset), 0, 1, -0.1, 0.1);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.1, 0.1);

		this.xOffset += 0.01;
		this.yOffset += 0.01;
		this.zOffset += 0.01;

		this.myFish.nudge(xMovement, yMovement, zMovement);
	}
}
