/*In this project, Qianhui Xie and Shiqian Li worked this our together. Qianhui Xie designed mainscreen,instruction screen and enemy,. Shiqianli designed the main player's character and the function of switching between multiple tilemaps. 

*/
const MAX_TRAIL_COUNT = 30;

var colorScheme = ["#0A1B28", "#071F43", "#357D7E", "#F7096D", "#F20C3D"];
var trail = [];
var particles = [];
//elements in map
var maps = [];
//temp virables
var ptemp = 0;
var btemp = 0;
mapnum = 0;
var ball = [];
var wind;
var windSpeed = 0.002;

var gravity;
var jumpForce;
var keyArray = [];
// replay the game
var retry = false;

var gameObj;

//Walls
class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //for hit measure
    this.xx = x + 10;
    this.yy = y + 10;
  }

  draw() {
    image(maps[1], this.x, this.y, 20, 20);
  }
}

class GameObject {
  constructor() {//create tilemaps for each level
    this.tilemap = [
            "                    ",
      "                    ",
      "                 ",
      "                    ",
      "                  ",
      "wwww wwww                ",
      "wwww      wwww          e  ",
      "wwww          wwww         ",
      "wwww              wwww      ",
      "wwww                  wwww         ",
      "wwww                      wwww",
      "wwww                          wwww    ",
      "wwww                              wwww ",
      "wwww                                  b",
      "wwww                              wwww",
      "wwww                          www      ",
      "wwww                      www         ",
      "wwww                  www  ",
      "wwww             www   ",
      "p           wwww       ",
      "www   wwww              ",
      "                    ",
      "                    ",
      "                    ",
      "                                                                                                              ",

    ];
            this.tilemap1=[
              "                    ",
      "                                      w",
      "                                     ww",
      "                                      w",
      "                                      w",
      "www                                  www ",
      "      ww  www                    ",
      "                                ",
      "           www       wwwwwwwwwwwwww",
      "                    ",
      "wwww    wwww     w   ",
      "                    wwww",
      "              wwww          ",
      "wwww                 ",
      "           www                    e",
      "                   wwwwwwwwww ",
      "        www                  www",
      "wwww                             ",
      "              wwwww           wwww",
      "p      www           b          ",
      "www                 wwwwwwwwwww",
      "                    ",
      "                    ",
      "                    ",
      "                    ",

          ];
              this.tilemap2= [
      "                                    www ",
      "                                   w   w",
      "                                      w",
      " e                                   w",
      "                                    w",
      "wwwwwwwwwwwwww                     wwwww",
      "                                 ",
      "                   wwwwwwwwwwwwww",
      "                    ",
      "wwwwwwwwwwwwww                    ",
      "                                     ",
      "                   wwwwwwwwwwwwww",
      "                                    ",
      "wwwwwwwwwwwwww                    ",
      "                                     ",
      "                   wwwwwwwwwwwwww",
      "                                         ",
      "wwwwwwwwwwwwww                    ",
      "                                b",
      "p                  wwwwwwwwwwwwww         ",
      "wwwwwwwwwwwwww      ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
    ];
                  this.tilemap3 = [
      "                                    www ",
      "                                   w   w",
      "                                     ww",
      "                                     ww",
      "                                   w   w",
      "www                                 www",
      "    www             ",
      "                    ",
      "        www                           e",
      "                    ",
      "            www     ",
      "                    ",
      "                wwww",
      "                    ",
      "          b www     ",
      "                    ",
      "        www         ",
      "                    ",
      "    www             ",
      "p                   ",
      "www                 ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      
    ];
                  this.tilemap4 = [
      "w  w    www    w   w  ",
      " ww    w   w   w   w  ",
      "  w    w   w   w   w  ",
      "  w     www     www w ",
      "                    ",
      "                    ",
      "w     w   w   w   w  ",
      "w  w  w   w   w w w  ",
      " w w w    w   w  ww   ",
      "  w  w    w   w   w  ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "w                  w  ",
      "w                  w  ",
      "w                  w   ",
      "w                  w  ",
      "wp                 w  ",
      "wwwwwwwwwwwwwwwwwwww",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
    ];
    //ingame state
    this.gamestate = true;
    // gameover state
    this.gameover = false;
    // winning state
    this.gamewin = false;
    this.walls = [];
    this.player;
    this.battery = [];
    this.ene;
    this.cannon = [];
  }
  //draw tilemap
  initmap() {
    for (var i = 0; i < this.tilemap.length; i++) {
      for (var j = 0; j < this.tilemap[i].length; j++) {
        switch (this.tilemap[i][j]) {
          case "w":
            this.walls.push(new Wall(j * 20, i * 20));
            break;

          case "p":
            this.player = new Player(j * 20, i * 20);
            break;
          case "b":
            this.battery.push(new batteryObj(j * 20, i * 20));
            break;
          
          case "f":
            this.cannon.push(new cannonObj(j * 20, i * 20));
            break;
            
            
          case "e":
            this.ene= new eneoObj(j * 20, i * 20);
            break;
        }
      }
    }
  }
    initmap1() {//draw tilemap
    for (var i = 0; i < this.tilemap1.length; i++) {
      for (var j = 0; j < this.tilemap1[i].length; j++) {
        switch (this.tilemap1[i][j]) {
          case "w":
            this.walls.push(new Wall(j * 20, i * 20));
            break;

          case "p":
            this.player = new Player(j * 20, i * 20);
            break;
          case "b":
            this.battery.push(new batteryObj(j * 20, i * 20));
            break;
          
          case "f":
            this.cannon.push(new cannonObj(j * 20, i * 20));
            break;
            
            
          case "e":
            this.ene= new eneoObj(j * 20, i * 20);
            break;
        }
      }
    }
  }
    initmap2() {//draw tilemap
    for (var i = 0; i < this.tilemap2.length; i++) {
      for (var j = 0; j < this.tilemap2[i].length; j++) {
        switch (this.tilemap2[i][j]) {
          case "w":
            this.walls.push(new Wall(j * 20, i * 20));
            break;

          case "p":
            this.player = new Player(j * 20, i * 20);
            break;
          case "b":
            this.battery.push(new batteryObj(j * 20, i * 20));
            break;
          
          case "f":
            this.cannon.push(new cannonObj(j * 20, i * 20));
            break;
            
            
          case "e":
            this.ene= new eneoObj(j * 20, i * 20);
            break;
        }
      }
    }
  }
      initmap3() {//draw tilemap
    for (var i = 0; i < this.tilemap3.length; i++) {
      for (var j = 0; j < this.tilemap3[i].length; j++) {
        switch (this.tilemap3[i][j]) {
          case "w":
            this.walls.push(new Wall(j * 20, i * 20));
            break;

          case "p":
            this.player = new Player(j * 20, i * 20);
            break;
          case "b":
            this.battery.push(new batteryObj(j * 20, i * 20));
            break;
          
          case "f":
            this.cannon.push(new cannonObj(j * 20, i * 20));
            break;
            
            
          case "e":
            this.ene= new eneoObj(j * 20, i * 20);
            break;
        }
      }
    }
  }
      initmap4() {//draw tilemap
    for (var i = 0; i < this.tilemap4.length; i++) {
      for (var j = 0; j < this.tilemap4[i].length; j++) {
        switch (this.tilemap4[i][j]) {
          case "w":
            this.walls.push(new Wall(j * 20, i * 20));
            break;

          case "p":
            this.player = new Player(j * 20, i * 20);
            break;
          case "b":
            this.battery.push(new batteryObj(j * 20, i * 20));
            break;
          
          case "f":
            this.cannon.push(new cannonObj(j * 20, i * 20));
            break;
            
            
          case "e":
            this.ene= new eneoObj(j * 20, i * 20);
            break;
        }
      }
    }
  }
}


//////create cannon
class cannonObj{
  constructor(x,y){
    this.x = x;
    this.y = y;
    
  }
  
  draw(){
    
    
    fill(255, 234, 0);
    noStroke();
    arc(this.x+10,this.y+8,16,13,PI,0,CHORD);
    rect(this.x+2,this.y+8,16,11);
    rect(this.x-6,this.y+8,8,3);
    
  }
  
  
  
}


function cancheckFire() {
    if (gameObj.player.position.x>= 100 ) {
        if (currFrameCount < (frameCount - 10)) {
            currFrameCount = frameCount;
            canbullets[canbulletIndex].fire = 1;
            
            canbullets[canbulletIndex].x = gameObj.cannon.x;
            canbullets[canbulletIndex].y = gameObj.cannon.y;
            canbulletIndex++;
            if (canbulletIndex > 4) {
                canbulletIndex = 0;
                canbullets[canbulletIndex].fire = 0;
            }
        }
    }
} 

/////////////
class canbulletObj {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.fire = 0;
    
  }
  
  draw() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, 6,2);
    
    // if (gameObj.player.position.x>= 100 ){
    //   this.x -= 4;
    // }
    this.x -= 4;
    if ((dist(this.x, this.y, gameObj.player.x, gameObj.player.y) < 9)) {
            gameObj.player.score -= 1;
            this.fire = 0;
    }
  }
} 






//create batteries 
class batteryObj{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dead=0;
  }
  
  draw(){
    
        fill(255,255,0);
        strokeWeight(0.6);
        rect(this.x, this.y, 10, 12.5);
        rect(this.x + 2, this.y - 5, 6, 5);
        //point(this.x + 10, this.y - 5);
        fill(127,0,0);
        rect(this.x, this.y+12.5, 10, 12.5);
    
        
  }
  
 
}

/////////create the bomb 
class ballObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.size = 10;
    this.mass = this.size / 2;
    this.jump = 2;
    this.spwan = false;
  }
  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
  updatePosition() {
    this.acceleration.set(0, 0);

    // jumpstate
    if (this.jump == 2) {
      //print("Balljump");
      this.applyForce(jumpForce);
      this.jump = 1;
    }

    //in air
    if (this.jump > 0) {
      //print("Ballair");
      this.applyForce(gravity);
    }

    this.velocity.add(this.acceleration);
    this.position.add(0.5, 0);

    //hit wall
    if (this.velocity.y > 0 && this.hitwall()) {
      //print("ball hit wall");
      this.position.y -= btemp;
      btemp = 0;
      this.velocity.y = -1;
      this.jump = 2;
    }

    // falling
    if (this.velocity.y == 0 && !this.hitwall()) {
      //print("BALLfall");
      this.jump = 1;
    }
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  draw() {
    push();
    
    translate (this.position.x, this.position.y);
    rectMode (CENTER);
    rotate (radians (deg));
    //fill(128,128,128);
    ellipse(0,0, 10, 10);
    //fill(0,255,255);
    line(0, 10, 0, 0);
    line(0, 0, 0, 10);
    
  
  
  
  pop();
  

 deg+=3;
    
  }
  //check if land on wall
  hitwall() {
    for (var i = 0; i < gameObj.walls.length; i++) {
      var xdist = abs(gameObj.walls[i].xx - this.position.x);
      var ydist = abs(gameObj.walls[i].yy - this.position.y);

      if (
        ydist <= 15 &&
        xdist <= 10 &&
        gameObj.walls[i].y + 10 > this.position.y + 10
      ) {
        //console.log("ballhit wall);
        btemp = 18 - ydist;
        return true;
      }
    }
    return false;
  }
}


var deg = 8;
var globalInvDir = 1;
var keyArray = [];
var bullets;
var bulletIndex = 0;

var canbullets;
var canbulletIndex = 0;

var bombs = [];
var currFrameCount = 0;

var rightto = false;
var leftto = false;

var detect = false;
//bullet object
class bulletObj {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.fire = 0;
  }
  
  draw() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, 6,2);
    //this.y -= 5;
    if(rightto === true ){//shoot to right when character facing right
      this.x+=4;
    }
    else if (leftto === true ){//shoot to left when character facing left
      this.x-=4;
    }
    if (this.x < 0 || this.x>400) {
        this.fire = 0;
    }

    for (var i=0; i<ball.length; i++) {
        if ((ball[i].dead === 0) &&
            (dist(this.x, this.y, ball[i].x, ball[i].y) < 9)) {
            ball[i].dead = 1;
            this.fire = 0;
        }
    }
  }
} 


//////////////////////////design the main character
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //for hit measure
    this.xx = x + 10;
    this.yy = y + 10;
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.jump = 0;
    this.score = 3;
    this.hit = 0;
  }
    // looks different in air
  draw() {
    image(maps[2], this.position.x-5, this.position.y-10,80,80);
    
    blendMode(BLEND);

	blendMode(SCREEN);
	
	// Trim end of trail.
	trail.push([this.position.x+15, this.position.y+10]);
	
	let removeCount = 1;
	
	for (let i = 0; i < removeCount; i++) {
		if (trail.length == 0) {
			break;
		}
		
		if (trail.length > MAX_TRAIL_COUNT) {
			trail.splice(0, 1);
		}
	}
	

	
	// Draw trail.
	drawingContext.shadowColor = color(0, 125, 255);

	for (let i = 0; i < trail.length; i++) {
		let mass = i * 0.35;
		drawingContext.shadowBlur = mass;

		stroke(0);
		strokeWeight(mass);
		point(trail[i][0], trail[i][1]);
	}
	// Draw particles.
	for (let i = 0; i < particles.length; i++) {
		let p = particles[i];
		let mass = p.mass * p.vel.mag() * 0.03;

		drawingContext.shadowColor = color(colorScheme[p.colorIndex]);
		drawingContext.shadowBlur = mass;

		stroke(0);
		strokeWeight(mass);
		point(p.pos.x, p.pos.y);

		stroke(255);
		strokeWeight(mass * 0.05);
		point(p.pos.x, p.pos.y);
	}
    	// Move and kill particles.
	for (let i = particles.length - 1; i > -1; i--) {
		particles[i].move();
		if (particles[i].vel.mag() < 0.1) {
			particles.splice(i, 1);
		}
	}
    if (keyIsDown(UP_ARROW) && this.jump === 0) {
      this.jump = 2;
    }
    if (this.jump > 0) {
      push();
      fill(138, 12, 26);
      noStroke();
      triangle(
        this.position.x+5,
        this.position.y + 16,
        this.position.x + 10,
        this.position.y + 16,
        this.position.x + 7,
        this.position.y+22
      );
      triangle(
        this.position.x + 16,
        this.position.y - 6,
        this.position.x,
        this.position.y,
        this.position.x + 16,
        this.position.y
      );
      pop();
      	// Spawn particles.
	if (trail.length > 1) {
		let mouse = new p5.Vector(this.position.x, this.position.y);
		mouse.sub(this.position.x, this.position.y-10);
		if (mouse.mag() > 5) {
			mouse.normalize();
			for (let i = 0; i < 3; i++) {
				particles.push(new Particle(this.position.x, this.position.y-10, mouse.x, mouse.y));
			}
		}
	}
	

    }

    this.acceleration.set(0, 0);
  }
  
  checkCollision() {

    
        if ((gameObj.ene.dead === 0) && dist(this.position.x, this.position.y, gameObj.ene.x, gameObj.ene.y) < 10){
          gameObj.ene.dead = 1;
          this.hit = 0;
          if (this.currFrame < (frameCount - 50)){
            this.score -= 3;//collect prizes
            this.currFrame = frameCount;
          if(this.score ===0)//when the prize is 20, game win
            gamewin = false;
            gameover = true;
          }
        }
    
    
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.acceleration.set(0, 0);

    // jump
    if (this.jump == 2) {
      //print("Playerjump");
      this.applyForce(jumpForce);
      this.jump = 1;
    }

    // air
    if (this.jump > 0) {
      //print("Playerair");
      this.applyForce(gravity);
    }

    this.velocity.add(this.acceleration);

    //hit wall
    if (this.velocity.y > 0 && this.hitwall(1)) {
      //print("Playeron wall");
      this.position.y -= ptemp;
      ptemp = 0;
      this.velocity.y = 0;
      this.jump = 0;
    }

    // fall
    if (this.velocity.y == 0 && !this.hitwall(4)) {
      //print("Playerfall");
      this.jump = 1;
    }

    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
    // gameover condition hit by ball
    if (this.hitcar()) {
      gameObj.gamewin = false;
      gameObj.gameover = true;
    }
    
    if(this.score == 0){
      gameObj.gamewin = false;
      gameObj.gameover = true;
    }
    

    
    
  }

  move() {
    var tempx = 0;

    if (keyIsDown(RIGHT_ARROW)) {
      rightto = true;
      leftto = false;
      tempx = 3;
    }
    if (keyIsDown(LEFT_ARROW)) {
      leftto = true;
      rightto = false;
      tempx = -3;
    }

    this.position.add(tempx, 0);
  }
  // check if ball hit player
  hitcar() {
    for (var i = 0; i < ball.length; i++) {
      var xdist = abs(ball[i].position.x - this.position.x);
      var ydist = abs(ball[i].position.y - this.position.y);

      if (ydist + xdist < 8) {
        //console.log("BALL hit player);
        return true;
      }
    }
    return false;
  }
  
  //
  eatbattery(){
    for (var i = 0; i<gameObj.battery.length;i++){
      if((gameObj.battery[i].dead ===0) && dist(this.position.x,this.position.y,gameObj.battery[i].x+5,gameObj.battery[i].y+20)<=35){
        gameObj.battery[i].dead = 1;
        this.score+=2;
      }
    }
  }
  
  //land on wall
  hitwall(tempy) {
    for (var i = 0; i < gameObj.walls.length; i++) {
      var xdist = abs(gameObj.walls[i].xx - (this.position.x + 10));
      var ydist = abs(gameObj.walls[i].yy - (this.position.y + 10 + tempy));

      if (
        ydist <= 15 &&
        xdist <= 10 &&
        gameObj.walls[i].y + 2 > this.position.y + 10 + tempy
      ) {
        //console.log("player hit wall);
        ptemp = 18 - ydist;
        return true;
      }
    }
    return false;
  }
}

  function keyPressed() {
    keyArray[keyCode] = 1;
  }
  
  function keyReleased() {
    keyArray[keyCode] = 0;
  }


function checkFire() {
    if (keyIsDown(32)) {
        if (currFrameCount < (frameCount - 10)) {
            currFrameCount = frameCount;
            bullets[bulletIndex].fire = 1;
            
            bullets[bulletIndex].x = gameObj.player.position.x;
            bullets[bulletIndex].y = gameObj.player.position.y;
            bulletIndex++;
            if (bulletIndex > 4) {
                bulletIndex = 0;
                bullets[bulletIndex].fire = 0;
            }
        }
    }
} 
////////////////////////////
///////////////////////////////
//////////////////////////////

///////////////////////////design elements in main page
var custom_player=[];
function title(){
  textFont("impact",60);
  fill(255,255,255);
  text('Escape from the \n        Robot Lab',190,60);
  fill(0, 0, 0);
  textFont("fontBold", 30);
  text('Created by Qianhui Xie, Shiqian Li', 150, 200);
}



var pChange = 100;
var pChangeDir = 0;
//////////////////design button to switch between pages
function playButton(){
    fill(100,pChange,pChange);
    //strokeWeight(2);
    rect(300,320,150,50);
    fill(0,0,0);
    textSize(35);
    text('Play', 340,355);
	if (mouseX > 300 && mouseX < 450 && mouseY > 320 && mouseY < 370) {
	    if (pChangeDir === 0) {
		    pChange += 2;
	    }
	    if (pChangeDir === 1) {
	        pChange -= 2;    
	    }
		if (pChange > 255 && pChangeDir === 0) {
			pChangeDir = 1;
		}
		if (pChange < 104 && pChangeDir === 1) {
		    pChangeDir = 0;
		}
	}
	else {
	    pChange = 80;    
	}
}

var iChange = 100;
var iChangeDir = 0;
///////////////////////////instruction button
function instrucButton(){
    fill(100,iChange,iChange);
    rect(300,420,150,50);
    fill(0,0,0);
    textSize(25);
    text('Instructions',310,455);
    if (mouseX > 300 && mouseX < 460 && mouseY > 420 && mouseY < 470) {
	    if (iChangeDir === 0) {
		    iChange += 2;
	    }
	    if (iChangeDir === 1) {
	        iChange -= 2;    
	    }
		if (iChange > 255 && iChangeDir === 0) {
			iChangeDir = 1;
		}
		if (iChange < 104 && iChangeDir === 1) {
		    iChangeDir = 0;
		}
	}
	else {
	    iChange = 80;    
	}
}

function instruContent(){
    textFont("impact",20);
    fill(0,0,0);
    text('In this game, the palyers can control a robot with intelligence that needs to evade enemies \n and find its way to escape a robot laboratory.',20,100);
    text("Movement: Arrow keys to move left right and jump", 20, 200);
    text("Combat: The main character could gain electricity by eating batteries in the map. \nThe main character will also lose three electrocity by each hit from enemies and \n by colliding with black bombs in the map. The main character needs to go through \n multiple levels to escape the lab",20, 300);
}


var rChange = 100;
var rChangeDir = 0;

////return from instruction page 
function returnMenu(){
    fill(100,rChange,rChange);
    rect(300,10,150,50);
    textSize(35);
    fill(0,0,0);
    text('Menu',330,45);
     if (mouseX > 300 && mouseX < 460 && mouseY > 10 && mouseY < 60) {
	    if (rChangeDir === 0) {
		    rChange += 2;
	    }
	    if (rChangeDir === 1) {
	        rChange -= 2;    
	    }
		if (rChange > 255 && rChangeDir === 0) {
			rChangeDir = 1;
		}
		if (rChange < 104 && rChangeDir === 1) {
		    rChangeDir = 0;
		}
	}
	else {
	    rChange = 80;    
	}
}

///////////////////////design enemy object
class eneoObj{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.health = 1;
    //this.screenState = screenState;
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
    
    //this.currFrame = frameCount;
    
    this.angle = 0;
    //this.step = new createVector(0, -1);
    this.step = new p5.Vector(0, -1);
    
    this.show = true;
    this.enemyDir = 0;
    this.dead = 0;
  }
  
  draw(){
    //if (this.show === true) {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(255, 0, 0);
    noStroke();
    arc(10,10,16,13,PI,0,CHORD);
    rect(2,10,16,5);
    triangle(2,15,10,20,18,15);
    fill(255);
    noStroke();
    ellipse(10,10,7,11);
    fill(0);
    noStroke();
    ellipse(10,10,2,6);
    pop();
    //}
  }
  
  changeState(x) {///switch between two different states
    this.currState = x;
  }
  
  chase(){
    if (dist(this.x, this.y, gameObj.player.position.x, gameObj.player.position.y) <150) {
        this.step.set(gameObj.player.position.x - this.x, gameObj.player.position.y - this.y);
        this.step.normalize();
        this.step.mult(0.3);
        //print(this.step.heading());  // this shows the angle is different based on quadrant translation
        //this.angle = this.step.heading() + HALFPI;
        this.x += this.step.x;
        this.y += this.step.y;
    }
  }
  

}


class wanderState {///////////////wandering state
  constructor() {
    this.angle = 0;
    this.wanderDist = 0;
    this.step = new p5.Vector(0,0);
  }
  
  ///// EXPERIMENT /////
  execute(me) {
    if (this.wanderDist <= 0) {
        this.wanderDist = random(50, 80);
        this.angle = random(0, 360);
        this.step.set(cos(this.angle), sin(this.angle));
    }
    this.wanderDist--;
    //me.position.add(this.step);
    me.x += this.step.x;
    me.y += this.step.y;
    if (me.x > 390) {
        this.step.x = -round(random(1,2));
    }
    else if (me.x < 10) {
        this.step.x = round(random(1, 2));
    }
    if (me.y > 390) {
        this.step.y = -round(random(1, 2));
    }
    else if (me.y < 10) {
        this.step.y = round(random(1, 2));
    }
    
    //////////when a enemy and the main chracterar are close enough, state changes
    if (dist(me.x, me.y, gameObj.player.position.x, gameObj.player.position.y) <= 150) {
        me.changeState(1);
        
    }
  }
}  // wanderState




////////////////////////
class chaseState {
  constructor() {
    this.step = new p5.Vector(0,-1);
  }
  
  ///// EXPERIMENT /////
  execute(me) {
    if (dist(me.x, me.y, gameObj.player.position.x, gameObj.player.position.y) <= 150) {///when enemy discover the character
      
        this.step.set(gameObj.player.position.x - me.x, gameObj.player.position.y - me.y);///chase action
        this.step.normalize();
        this.step.mult(0.3);//enemy's cchase speed
        //this.angle = this.step.heading() + HALFPI; 
        //me.position.add(this.step);
        me.x += this.step.x;
        me.y += this.step.y;
        //
        
        if (dist(gameObj.player.position.x, gameObj.player.position.y, me.x, me.y) < 10){
            // gameObj.gameover = true;
            // gameObj.gamewin = false;
          ///when the enemy catches the character, the game over
          gameObj.player.score -= 3;
          me.dead = 1;
          
        }
    }

    else if (dist(me.x, me.y, gameObj.player.position.x, gameObj.player.position.y) > 150) {
        me.changeState(0);//when far enough, change back to wander state
    }
  }
}  // chaseState




///////////////draw exit
class exitObj{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  
  draw(){
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x,this.y,25,9);
    pop();
  }
}

var exit = new exitObj(40, 460);








var ene;
///////////////////////design enemy object
class eneObj{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dead = 0;
  }
  
  draw(){
    //if (this.show === true) {
        fill(24, 184, 29);
        rect(this.x, this.y, 20, 40);
        rect(this.x + 4, this.y - 10, 12, 10);
        point(this.x + 10, this.y - 5);
        line(this.x, this.y + 20, this.x + 20, this.y + 20);
        line(this.x + 10, this.y + 10, this.x + 10, this.y + 30);
        line(this.x, this.y + 15, this.x + 20, this.y + 25);
    //}
  }
  

}

var enemy = new eneObj(40, 460, 1);


class backObj{
  constructor(x, y, changeX, changeY){
    this.x = x;
    this.y = y;
    this.r = 45;
    this.changeX = changeX;
    this.changeY = changeY;
  }
  
  draw(){
	//customPlayer();
    //stroke(0); 
  fill('rgb(43,143,227)');
  ellipse(this.x,this.y,120,80);
  fill('#00BCD4');
  ellipse(this.x-60,this.y+40,40,40);
  ellipse(this.x+60,this.y+40,40,40);
  ellipse(this.x-40,this.y+100,40);
  ellipse(this.x+40,this.y+100,40);
  fill('#2196F3');
  rect(this.x-60,this.y,120,100);
  fill(255);
  ellipse(this.x-20,this.y-20,20,20);
  ellipse(this.x+20,this.y-20,20,20);
  
  //stroke(0);
  //line(this.x-20,this.y-6,220,118);
  strokeWeight(5);
  point(this.x-20,this.y-20);
  point(this.x+20,this.y-20);
	 //stroke(0); 
  //point(this.x+40,this.y-60);
	//point(this.x-40,this.y-60);
  //stroke(255);
  //line(this.x+80,this.y+40,320,160);
  //line(this.x-80,this.y+40,80,160);
  
  //strokeWeight(1);
  fill(0);
  ellipse(this.x+120,this.y+40,10,10);
  ellipse(this.x-120,this.y+40,10,10);
  //line(this.x+20,this.y-40,240,60);
  //line(this.x-20,this.y-40,160,60);
  }
  
  update(){
    this.x = this.x + this.changeX;
    this.y = this.y - this.changeY;
  }
  
  
}

var backobj = new backObj(0, 400, 0.7, 0.5);
var backobj1 = new backObj(100, 400, 0.7, 0.5);

function screenBackground(){
  background(135,206,250);
    backobj.draw();
    backobj.update();
  enemy.draw();
    //enemy.update();
    if (backobj.x > 690) {
        backobj.x = 0;
        backobj.y = 400;
    }
    
}
function startScreen(){
    //titleBackground();
    background(135,206,250);
   
    screenBackground()
    title();
    playButton();
    instrucButton();
}

function instrucScreen(){
    background(135,206,250);
    instruContent();
    returnMenu();
}

var gameState = 1; 

var gamrLevel2 = false;

function mouseClicked(){
  if (gameState === 1) {
	    if (mouseX >= 300 && mouseX <= 460) {
	        if (mouseY >= 320 && mouseY <= 370) {
	            gameState = 2;
	        }
	        if (mouseY >= 420 && mouseY <= 470) {
	            gameState = 3;
	        }
	    }
	}
	// Mouse click for instruction screen
	if (gameState === 3) {
	    if (mouseX >= 300 && mouseX <= 460 && mouseY >= 10 && mouseY <= 60) {
	        gameState = 1;    
	    }
	}

}


var xCus = -700;
var yCus = -800;

// class customPlayer{
//   constructor(x, y){
//     this.x = x;
//     this.y = y;
//   }
  
//   draw()
// }
function customPlayer() {
  push();
    background(220, 220, 220, 0);
  stroke(0); 
  fill('rgb(43,143,227)');
  ellipse(200,120,120,80);
  fill('#00BCD4');
  ellipse(140,160,40,40);
  ellipse(260,160,40,40);
  ellipse(160,220,40);
  ellipse(240,220,40);
  fill('#2196F3');
  rect(140,120,120,100);
  fill(255);
  ellipse(180,100,20,20);
  ellipse(220,100,20,20);
  
  stroke(0);
  line(180,114,220,118);
  strokeWeight(5);
  point(180,100);
  point(220,100);
	 stroke(0); 
  point(240,60);
	point(160,60);
  stroke(255);
  line(280,160,320,160);
  line(120,160,80,160);
  
  strokeWeight(1);
  fill(0);
  ellipse(320,160,10,10);
  ellipse(80,160,10,10);
  line(220,80,240,60);
  line(180,80,160,60);
    
  pop();
}
//currently not used
function game()
{
  background(220);
  image(custom_player[0], 30, 10, 300, 300);
}


function setup() {
  createCanvas(800, 600);
  customPlayer();
  custom_player.push(get(xCus, yCus, width*2, height*2));
  
  
  bullets = [new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj()];
  
  canbullets = [new canbulletObj(), new canbulletObj(), new canbulletObj(), new canbulletObj(), new canbulletObj()];
  
  //ene.push(new eneoObj(40, 15));
  //var enemyo = new eneoObj(40, 460, 1);
  gameObj = new GameObject();
  //battery.push(new batteryObj(100, 335));
  //battery.push(new batteryObj(260, 255));
  ball.push(new ballObj(50, 10));
  push();
  noStroke;
  fill(150, 10, 110);
  ellipse(150, 177, 133, 233);
  fill(155, 255, 255);
  ellipse(250, 250, 133, 133);
  ellipse(50, 250, 133, 133);
  fill(130, 40, 130);
  maps.push(get(0, 0, width, height));
  pop();
  //draw wall
  push();

  rect(0, 0, width, height);
  push();
  fill(150, 70, 70);
  rect(40, 40, width - 80, height - 80);
  pop();
  maps.push(get(0, 0, width, height));
  pop();
    //draw robot player
  push();
  clear();
  stroke(0); 
  fill('rgb(43,143,227)');
  ellipse(200,120,120,80);
  fill('#00BCD4');
  ellipse(140,160,40,40);
  ellipse(260,160,40,40);
  ellipse(160,220,40);
  ellipse(240,220,40);
  fill('#2196F3');
  rect(140,120,120,100);
  fill(255);
  ellipse(180,100,20,20);
  ellipse(220,100,20,20);
  
  stroke(0);
  line(180,114,220,118);
  strokeWeight(5);
  point(180,100);
  point(220,100);
	 stroke(0); 
  point(240,60);
	point(160,60);
  stroke(255);
  line(280,160,320,160);
  line(120,160,80,160);
  
  strokeWeight(1);
  fill(0);
  ellipse(320,160,10,10);
  ellipse(80,160,10,10);
  line(220,80,240,60);
  line(180,80,160,60);
  maps.push(get(0, 0, width, height));
  pop();
    if(mapnum == 0)
    {
        gameObj.initmap();
      print("map0");
    }
  else if (mapnum == 1)
    {
      gameObj.initmap1();
       print("map1");
    }
    else if (mapnum == 2)
    {
      gameObj.initmap2();
       print("map2");
    }
        else if (mapnum == 3)
    {
      gameObj.initmap3();
       print("map3");
    }
      else if (mapnum == 4)
    {
      gameObj.initmap4();
       print("map4");
    }

  wind = new p5.Vector(1, 0);
  gravity = new p5.Vector(0, 0.1);
  jumpForce = new p5.Vector(0, -3.1);
}


function draw_walls() {
  for (var i = 0; i < gameObj.walls.length; i++) {
    gameObj.walls[i].draw();
  }
}

function draw_eneo() {
  for (var i = 0; i < gameObj.ene.length; i++) {
    gameObj.ene[i].draw();
  }
}

function draw_battery() {
  for (var i = 0; i < gameObj.battery.length; i++) {
    if(gameObj.battery[i].dead === 0){
          gameObj.battery[i].draw();
        }
    
    
  }
}

function mousePressed() {
  if (retry) {
    gameObj.gameover = true;
  } else {
    gameObj.gameover = false;
    mapnum = mapnum+1;
  }
}







function draw() {
  background(220);
  if (gameState === 1) {//in main page
      startScreen();
  }
   else if (gameState === 2) {///to play game
     background(63, 63, 63);
     textSize(20);
     text("Electricity:",280, 50);
     text(gameObj.player.score,385,50);
     
     
     // enemyo = new eneoObj(40,15);
     // enemyo.draw();
     // enemyo.chase();
     // enemyo.state[enemyo.currState].execute(enemyo);
     
     exit = new exitObj(30, 64);
     exit.draw();

  if (gameObj.gameover) {//when gamestop condition
    ball = [];
    ball.push(new ballObj(50, 10));
    // battery.push(new batteryObj(100, 335));
    // battery.push(new batteryObj(260, 255));
    gameObj.walls = [];
    
    gameObj.battery = [];

    if(mapnum == 0)
    {
        gameObj.initmap();
      print("map0");
    }
  else if (mapnum == 1)
    {
      gameObj.initmap1();
       print("map1");
    }
    else if (mapnum == 2)
    {
      gameObj.initmap2();
       print("map2");
    }
        else if (mapnum == 3)
    {
      gameObj.initmap3();
       print("map3");
    }
      else if (mapnum == 4)
    {
      gameObj.initmap4();
       print("map4");
    }

    //gameObj.player.score = 0;

    rectMode(CORNER);
    push();

    background(100, 135, 152);
    push();

    pop();
    if (!gameObj.gamewin) {//not win condition
      push();
      fill(222, 222, 15);
      textSize(40);
      text("You Lose!", width / 2 - 100, height / 2 - 50);
      mapnum = 0;
      fill(255);
    rect(320, 270, 150, 80);
    fill(0);
    textSize(40);
    text("Replay", 330, 330);
      pop();
    } else {//win condition
      push();
      fill(21, 53, 68);
      textSize(40);
      text("You Win!", width / 2 - 100, height / 2 - 50);
      fill(255);
    rect(320, 270, 150, 80);
    fill(0);
    textSize(40);
    text("Next", 330, 330);
      pop();
    }
    // push();
    // fill(255);
    // rect(120, 270, 150, 80);
    // fill(0);
    // textSize(40);
    // text("Replay", 130, 330);
    // pop();

    pop();
  } else if (gameObj.gamestate) {
    push();
    for (var i = 0; i < ball.length; i++) {
      ball[i].updatePosition();
      ball[i].draw();
      if (ball[i].position.x > 200 && ball[i].spwan == false) {
        ball[i].spwan = true;
        ball.push(new ballObj(50, 10));
      }
    }
    
    for (var i = 0; i < gameObj.battery.length; i++) {
    if(gameObj.battery[i].dead === 0){
          gameObj.battery[i].draw();
        }
    
    }
    
    for (var i = 0; i < gameObj.cannon.length; i++) {
    
          gameObj.cannon[i].draw();
        
    
    }
    cancheckFire();
    for (i =0; i<5; i++) {
            if (canbullets[i].fire === 1) {
                canbullets[i].draw();
            }
        }
    //draw_eneo();
    
    if(gameObj.ene.dead ===0){
      gameObj.ene.draw();
    gameObj.ene.chase();
    gameObj.ene.state[gameObj.ene.currState].execute(gameObj.ene);
    }
    
        //ene[i].checkCollide();   
    
    
    draw_walls();
    //draw_battery();
    gameObj.player.draw();
    gameObj.player.update();
    gameObj.player.move();
    gameObj.player.eatbattery();
    checkFire();
        for (i =0; i<5; i++) {
            if (bullets[i].fire === 1) {
                bullets[i].draw();
            }
        }
    
    pop();

    if (gameObj.player.position.y < 50 && gameObj.player.position.x < 50) {
      gameObj.gamewin = true;
      gameObj.gameover = true;
    }

    if (gameObj.player.position.y > 400) {
      gameObj.gamewin = false;
      gameObj.gameover = true;
    }
  }
      
  }
  
  
  else if (gameState === 3) {//instruction page
      instrucScreen();
      line(120, 250, 170, 250);
      line(150, 230, 170, 250);
      line(150, 270, 170, 250);
      fill(0, 0, 0);
      textFont("impact",20);
      text("    main \ncharacter", 50, 250);
      image(custom_player[0], 30, 10, 300, 300);
      //
      line(520, 250, 570, 250);
      line(550, 230, 570, 250);
      line(550, 270, 570, 250);
      fill(0, 0, 0);
      textFont("impact",20);
      text("  battery \ncharge", 430, 250);
      var jenemy = new eneObj(600, 230, 1);
      jenemy.draw();
      
  }
  
  
}
function Particle(x, y, vx, vy) {///particle effects
	
	this.pos = new p5.Vector(x+10, y+10);
	this.vel = new p5.Vector(vx, vy);
	this.vel.mult(random(10));
	this.vel.rotate(radians(random(-25, 25)));
	this.mass = random(1, 30);
	this.airDrag = random(0.92, 0.98);
	this.colorIndex = int(random(colorScheme.length));
	this.life = 0;
	this.lifeSteps = random(-1, 1);
	
	this.move = function() {
		this.pos.rotate(radians(this.life * 0.002));
		this.vel.mult(this.airDrag);
		this.pos.add(this.vel);
		this.life += this.lifeSteps;
	}
}
