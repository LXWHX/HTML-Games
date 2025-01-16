//Tropical Fish Aquarium


// flock behavior
// hold down any key to disable flocking
// move is like random walk
// cohesion + align occurs every second, they only change the angle
// modify cohesionDist to see effect of cohesion
var fishes = [];
var r = 30;
var r1 = 7;
var r2 = 3;

class nodeOb {
constructor(x,y) {
this.x = x;
this.y = y;
this.angle = 0;

}
draw() {
  //tail
  
  fill(226, 52, 60);
  arc(this.x - 20, this.y, random(r - 20, r - 30), r - 40, random(30, 50), random(80, 90));
  var size= random(0.5, 0.9)
  //body
  fill(154, 94, 29);
  noStroke();
  ellipse(this.x, this.y, size* 60,  size* 40);

  //eyes
  strokeWeight(0);
  fill(255);
  ellipse(this.x + 15, this.y - 5, r1, r1);

  //eyeball
  fill(0);
  ellipse(this.x + 17, this.y - 5, r2, r2);

}
  
  

move() {
this.angle += random(-tenDegrees, tenDegrees);
this.x += cos(this.angle)/5;
this.y += sin(this.angle)/5;
if (this.x < 0) { this.x = 10;}
if (this.y > 400) { this.y = this.y - 10;}
else if (this.y < 0) { this.y = 10;}
}
}
class flockOb {
constructor() {
this.nodes = [];
for (var i =0; i< 3; i++) {
for (var j = 0; j < 3; j++) {
this.nodes.push(new nodeOb(220+i*20, 100+j*20));
}
}
}
display() {
for (var i=0; i<this.nodes.length; i++) {
this.nodes[i].draw();
this.nodes[i].move();
}
}
align() {
var s = 0;
for (var i = 0; i<this.nodes.length; i++) {
s += this.nodes[i].angle;
}
s = s / this.nodes.length;
for (var i = 0; i<this.nodes.length; i++) {
this.nodes[i].angle = s;
}
}
cohesion() {
var x = 0, y = 0;
var v = new p5.Vector(0, 0);
for (var i = 0; i<this.nodes.length; i++) {
x += this.nodes[i].x;
y += this.nodes[i].y;
}
x = x / this.nodes.length;
y = y / this.nodes.length;
for (i = 0; i<this.nodes.length; i++) {
if (dist(x, y, this.nodes[i].x, this.nodes[i].y) > cohesionDist) {
v.set(x- this.nodes[i].x, y - this.nodes[i].y);
this.nodes[i].angle = v.heading();
}
}
}
}

class nodeObj {
constructor(x,y) {
this.x = x;
this.y = y;
this.angle = 0;

}
draw() {
  //tail
  
  fill(226, 52, 60);
  arc(this.x - 20, this.y, random(r - 20, r - 30), r - 40, random(30, 50), random(80, 90));
  var size= random(0.5, 0.9)
  //body
  fill(54, 94, 129);
  noStroke();
  ellipse(this.x, this.y, size* 40,  size* 40);

  //eyes
  strokeWeight(0);
  fill(255);
  ellipse(this.x + 15, this.y - 5, r1, r1);

  //eyeball
  fill(0);
  ellipse(this.x + 17, this.y - 5, r2, r2);

  //red dot
  fill(226, 152, 60);
  strokeWeight(0);
  ellipse(this.x + 10, this.y, r1, r1);
}

move() {
this.angle += random(-tenDegrees, tenDegrees);
this.x += cos(this.angle)/5;
this.y += sin(this.angle)/5;
if (this.x < 0) { this.x = 10;}
if (this.y > 400) { this.y = this.y - 10;}
else if (this.y < 0) { this.y = 10;}
}
}
class nodeObjj {
constructor(x,y) {
this.x = x;
this.y = y;
this.angle = 0;

}
draw() {
  //tail
  
  fill(26, 52, 60);
  arc(this.x - 20, this.y, random(r - 20, r - 30), r - 40, random(30, 50), random(80, 90));
  var size= random(0.5, 0.9)
  //body
  fill(54, 94, 129);
  noStroke();
  ellipse(this.x, this.y, size* 30,  size* 20);

}

move() {
this.angle += random(-tenDegrees, tenDegrees);
this.x += cos(this.angle)/5;
this.y += sin(this.angle)/5;
if (this.x < 0) { this.x = 10;}
if (this.y > 400) { this.y = this.y - 10;}
else if (this.y < 0) { this.y = 10;}
}
}
class nodeObjjj {
constructor(x,y) {
this.x = x;
this.y = y;
this.angle = 0;

}
draw() {
  //tail
  
  fill(226, 152, 160);
  arc(this.x - 20, this.y, random(r - 20, r - 30), r - 40, random(30, 50), random(80, 90));
  var size= random(0.5, 0.9)
  //body
  fill(54, 194, 129);
  noStroke();
  ellipse(this.x, this.y, size* 40,  size* 10);


  //red dot
  fill(226, 52, 60);
  strokeWeight(0);
  ellipse(this.x + 10, this.y, r1, r1);
}

move() {
this.angle += random(-tenDegrees, tenDegrees);
this.x += cos(this.angle)/5;
this.y += sin(this.angle)/5;
if (this.x < 0) { this.x = 10;}
if (this.y > 400) { this.y = this.y - 10;}
else if (this.y < 0) { this.y = 10;}
}
}

class flockObj {
constructor() {
this.nodes = [];
for (var i =0; i< 3; i++) {
for (var j = 0; j < 3; j++) {
this.nodes.push(new nodeObj(20+i*20, 100+j*20));
}
}
}
display() {
for (var i=0; i<this.nodes.length; i++) {
this.nodes[i].draw();
this.nodes[i].move();
}
}
align() {
var s = 0;
for (var i = 0; i<this.nodes.length; i++) {
s += this.nodes[i].angle;
}
s = s / this.nodes.length;
for (var i = 0; i<this.nodes.length; i++) {
this.nodes[i].angle = s;
}
}
cohesion() {
var x = 0, y = 0;
var v = new p5.Vector(0, 0);
for (var i = 0; i<this.nodes.length; i++) {
x += this.nodes[i].x;
y += this.nodes[i].y;
}
x = x / this.nodes.length;
y = y / this.nodes.length;
for (i = 0; i<this.nodes.length; i++) {
if (dist(x, y, this.nodes[i].x, this.nodes[i].y) > cohesionDist) {
v.set(x- this.nodes[i].x, y - this.nodes[i].y);
this.nodes[i].angle = v.heading();
}
}
}
}
class flockObjj {
constructor() {
this.nodes = [];
for (var i =0; i< 3; i++) {
for (var j = 0; j < 3; j++) {
this.nodes.push(new nodeObjj(520+i*20, 150+j*20));
}
}
}
display() {
for (var i=0; i<this.nodes.length; i++) {
this.nodes[i].draw();
this.nodes[i].move();
}
}
align() {
var s = 0;
for (var i = 0; i<this.nodes.length; i++) {
s += this.nodes[i].angle;
}
s = s / this.nodes.length;
for (var i = 0; i<this.nodes.length; i++) {
this.nodes[i].angle = s;
}
}
cohesion() {
var x = 0, y = 0;
var v = new p5.Vector(0, 0);
for (var i = 0; i<this.nodes.length; i++) {
x += this.nodes[i].x;
y += this.nodes[i].y;
}
x = x / this.nodes.length;
y = y / this.nodes.length;
for (i = 0; i<this.nodes.length; i++) {
if (dist(x, y, this.nodes[i].x, this.nodes[i].y) > cohesionDist-20) {
v.set(x- this.nodes[i].x, y - this.nodes[i].y);
this.nodes[i].angle = v.heading();
}
}
}
}
class flockObjjj {
constructor() {
this.nodes = [];
for (var i =0; i< 3; i++) {
for (var j = 0; j < 3; j++) {
this.nodes.push(new nodeObjjj(1120+i*20, 250+j*20));
}
}
}
display() {
for (var i=0; i<this.nodes.length; i++) {
this.nodes[i].draw();
this.nodes[i].move();
}
}
align() {
var s = 0;
for (var i = 0; i<this.nodes.length; i++) {
s += this.nodes[i].angle;
}
s = s / this.nodes.length;
for (var i = 0; i<this.nodes.length; i++) {
this.nodes[i].angle = s;
}
}
cohesion() {
var x = 0, y = 0;
var v = new p5.Vector(0, 0);
for (var i = 0; i<this.nodes.length; i++) {
x += this.nodes[i].x;
y += this.nodes[i].y;
}
x = x / this.nodes.length;
y = y / this.nodes.length;
for (i = 0; i<this.nodes.length; i++) {
if (dist(x, y, this.nodes[i].x, this.nodes[i].y) > cohesionDist+20) {
v.set(x- this.nodes[i].x, y - this.nodes[i].y);
this.nodes[i].angle = v.heading();
}
}
}
}
var k = 0;
var flock;
var tenDegrees;
var cohesionDist = 30;

// Systems of particle systems
// this.particles point to objects of particles
var monteCarlo = function() {
var v1 = random(220, 255);
var v2 = random(220, 255);
while (v2 > v1) {
v1 = random(220, 255);
v2 = random(220, 255);
}
return(v1);
};
var particleObj = function(x, y) {
this.position = new p5.Vector(x, y);
this.velocity = new p5.Vector(random(-0.3, 0.3), random(-1.3, -1.5));
this.size = random(2, 4);
this.position.y -= (6 - this.size);
this.c1 = monteCarlo();
this.timeLeft = 1000;
};
var fountainObj = function(x, y) {
this.x = x;
this.y = y;
this.particles = [];
};
var gravity;
var fountains = [];
particleObj.prototype.move = function() {
this.velocity.add(gravity);
this.position.add(this.velocity);
this.timeLeft =this.timeLeft-8 ;
};
particleObj.prototype.draw = function() {
noStroke();
fill(this.c1, this.c1, this.c1, this.timeLeft);
ellipse(this.position.x, this.position.y, this.size, this.size*2);
};
var mouseClicked = function() {
fountains.push(new fountainObj(mouseX, mouseY));
};
///// EXPERIMENT ////
fountainObj.prototype.execute = function() {
if (this.particles.length < 100) {
this.particles.push(new particleObj(this.x, this.y));
this.particles.push(new particleObj(this.x, this.y));
this.particles.push(new particleObj(this.x, this.y));
}
for (var i=0; i<this.particles.length; i++) {
if ((this.particles[i].timeLeft > 0) &&
(this.particles[i].position.y < this.y)) {
this.particles[i].draw();
this.particles[i].move();
}
else {
this.particles.splice(i, 1);
}
}
fill(128, 124, 124);
ellipse(this.x, this.y-9, 20, 20);
};


let waterBlue, fishColor;
let fishX = 0;
let fishY = 0;
let fishSpeed = 2;
let dir = 1;
let fishW = 50;
let fishH = 15;

function setup(){
  createCanvas(1500, 400);
  angleMode(RADIANS);
  flock = new flockObj();
  flockk = new flockObjj();
  flockkk = new flockObjjj();
  floc = new flockOb();
  tenDegrees = PI / 18;
  waterBlue = color("#1772FF");
  fishColor = color("#FFE517");
  gravity = new p5.Vector(0, 0.01);
  background(waterBlue);
  fill(fishColor);
  smooth();
  noStroke();
  fountains.push(new fountainObj(250, 380));
  fountains.push(new fountainObj(450, 330));
    fountains.push(new fountainObj(750, 180));
  fountains.push(new fountainObj(850, 80));
}
var x1 = 62;
var y1 = 90;
var cx1 = 262;
var cy1 = 138;
var cx2 = 100;
var cy2 = 180;
var x2 = 206;
var y2 = 180;
var cx1Dir = 2;
var cx2Dir = -1;
var x2Dir = -2;
var draww = function() {

stroke(30,180, 180);
noFill();
bezier(100, 400, cx1, cy1, cx2, cy2, x2, y2);
cx1 += cx1Dir;
if ((cx1 > x2) || (cx1 < x1)) {cx1Dir = -cx1Dir;}
cx2 += cx2Dir;
if ((cx2 < x1) || (cx2 > x2)) {cx2Dir = -cx2Dir;}
x2 += x2Dir;
if ((abs(x1 - x2) > 200) || (x2 < x1)) {x2Dir = -x2Dir;}
};

function draw(){
  background(waterBlue);
  flock.display();
  flockk.display();
  flockkk.display();
  floc.display();
if (((frameCount % 60) === 0) && (k === 0)){
flock.align();
flock.cohesion();
flockk.align();
flockk.cohesion();
flockkk.align();
flockkk.cohesion();
}
  //////////// rock and bubble
  for (var i=0; i<fountains.length; i++) {
fountains[i].execute();
}
fill(255,0,0);
text("Click on canvas to place new rock", 10, 380);
///////////////////
  // Figure out the new x, y position of the fish. Fish1
  fishX += (dir * fishSpeed);
  // If fish hits the edge of the screen, change direction
  if(fishX < 0 || fishX > width){
    dir = -dir;
    fishX += (dir * fishSpeed);
  }
  // Fish will just sort of bob up and down as it moves.
  fishY = height / 2 + sin(radians(frameCount * 2)) * 40;
  
  // Adjust the height positive or negative depending on the direction
  fishW = 50 * dir;
  
  // Draw the fish.
  fill(fishColor);
  triangle(fishX, fishY, fishX - fishW, fishY - fishH, fishX - fishW, fishY + fishH);
  fill(255);
  ellipse(fishX - (20 * dir), fishY, 10, 10);  
  fill(0);
  ellipse(fishX - (15 * dir), fishY, 5, 5);
  
    // Figure out the new x, y position of the fish. Fish2
  fishX += (dir * fishSpeed);
  // If fish hits the edge of the screen, change direction
  if(fishX < 0 || fishX > width){
    dir = -dir;
    fishX += (dir * fishSpeed);
  }
  // Fish will just sort of bob up and down as it moves.
  fishY = height / 2 + sin(radians(frameCount * 2)) * 60;
  
  // Adjust the height positive or negative depending on the direction
  fishW = 50 * dir;
  
  // Draw the fish.
  fill(fishColor-10);
  triangle(fishX, fishY, fishX - fishW, fishY - fishH, fishX - fishW, fishY + fishH);
  fill(255);
  ellipse(fishX - (20 * dir), fishY, 10, 10);  
  fill(0);
  ellipse(fishX - (15 * dir), fishY, 5, 5);
  
  fishY = height / 2 + sin(radians(frameCount * 2)) * 60;
  // Draw the fish.
  fill(177,76,30);
  triangle(fishX+50, fishY, fishX - fishW, fishY - fishH, fishX - fishW, fishY + fishH);
  fill(255);
  ellipse(fishX - (20 * dir), fishY, 10, 10);  
  fill(0);
  ellipse(fishX - (15 * dir), fishY, 5, 5);
  
    // Draw the fish.
  fill(177,76,30);
  triangle(fishX, fishY, fishX - fishW, fishY - fishH, fishX - fishW, fishY + fishH);
  fill(255);
  ellipse(fishX - (20 * dir), fishY, 10, 10);  
  fill(0);
  ellipse(fishX - (15 * dir), fishY, 5, 5);

  
  stroke(30,180, 180);
noFill();
bezier(100, 400, cx1, cy1, cx2, cy2, x2, y2);
cx1 += cx1Dir;
if ((cx1 > x2) || (cx1 < x1)) {cx1Dir = -cx1Dir;}
cx2 += cx2Dir;
if ((cx2 < x1) || (cx2 > x2)) {cx2Dir = -cx2Dir;}
x2 += x2Dir;
if ((abs(x1 - x2) > 200) || (x2 < x1)) {x2Dir = -x2Dir;}
  
}


