// initialization of variables
// lowering all invaders together (instead one at a time)
// shooting (initialize bullet's starting position)
// gun, ball
var gameOver = false;
var gun;
var end = 0;
var invaders = [];
var globalInvDir = 1;
var keyArray = [];
var bullets;
var bulletIndex = 0;
var bombs = [];
var currFrameCount = 0;
var ball = [];
var gameStart = true;

//move invaders down
var lowerAllInvaders = function () {
  for (var i = 0; i < invaders.length; i++) {
    invaders[i].y += 5;
  }
};
//Initial screen moving logo
class Elevator2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  //letter L and i
  draw() {
    fill(0, 133, 133);
    noStroke(); // no border
    rect(this.x, this.y, 10, 50); // letter L
    rect(this.x, this.y + 50, 35, 10); // letter L
    fill(124, 124, 0);
    rect(this.x + 35, this.y + 20, 10, 40); // letter i
    circle(this.x + 40, this.y + 5, 12); // letter i
  }
  //animation
  update() {
    this.y++;
    if (this.y > 390) {
      gameStart = false;
    }
  }
}
//invaders
class invaderObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dead = 0;
    this.bomb = 0;
  }
  draw() {
    fill(138, 126, 26);
    noStroke();
    triangle(this.x, this.y - 6, this.x - 6, this.y, this.x + 6, this.y);
    fill(0, 126, 26);
    rect(this.x - 6, this.y, 12, 3);
    fill(200, 26, 26);
    rect(this.x - 6, this.y + 6, 12, 3);
    rect(this.x, this.y, 12, 3);
  }
  move() {
    this.x += globalInvDir;
    if (this.x < 6 || this.x > 394) {
      globalInvDir = -globalInvDir;
      this.x += globalInvDir; // restore its position
      // now bring all invaders down a bit
      lowerAllInvaders();
    }
  }
} 

//gun
class gunObj {
  constructor(x) {
    this.x = x;
  }
  draw() {
    fill(255, 0, 0);
    rect(this.x - 10, 390, 20, 20);
    rect(this.x - 2, 380, 4, 20);
  }
  move() {
    if (keyArray[LEFT_ARROW] === 1) {
      this.x = this.x - 2;
    }
    if (keyArray[RIGHT_ARROW] === 1) {
      this.x = this.x + 2;
    }
  }
} 


// bullets
class bulletObj {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.fire = 0;
  }
  draw() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 2, 6);
    this.y -= 5;
    if (this.y < 0) {
      this.fire = 0;
    }
    for (var i = 0; i < invaders.length; i++) {
      if (
        invaders[i].dead === 0 &&
        dist(this.x, this.y, invaders[i].x, invaders[i].y) < 6
      ) {
        invaders[i].dead = 1;
        this.fire = 0;
      }
    }
    for (var i = 0; i < ball.length; i++) {
      if (dist(ball[i].x, ball[i].y, this.x, this.y) < 5) {
        ball.push(new ballObj(width / 2, height / 2));
      }
    }
  }
}

//bombs
class bombObj {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dropped = 0;
  }
  draw() {
    fill(43, 21, 21);
    ellipse(this.x, this.y, 3, 3);
    this.y++;
    if (this.y > 400) {
      this.dropped = 0;
    }
    for (var i = 0; i < ball.length; i++) {
      if (dist(ball[i].x, ball[i].y, this.x, this.y) < 7) {
        this.dropped = 0;
      }
    }

    if (this.y > 390) {
      if (this.x > gun.x - 10 && this.x < gun.x + 10) {
        gameOver = 1;
      }
    }
  }
} 


//keyboard 
function keyPressed() {
  keyArray[keyCode] = 1;
}
function keyReleased() {
  keyArray[keyCode] = 0;
}

function checkFire() {
  if (keyArray[32] === 1) {
    if (currFrameCount < frameCount - 10) {
      currFrameCount = frameCount;
      bullets[bulletIndex].fire = 1;
      bullets[bulletIndex].x = gun.x;
      bullets[bulletIndex].y = 380;
      bulletIndex++;
      if (bulletIndex > 4) {
        bulletIndex = 0;
      }
    }
  }
}
//balls
class ballObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = random(-3, 3);
    this.yDir = random(-3, 3);
    this.size = 10;
  }
  draw() {
    noStroke();
    fill(233, 100, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
  ///// Experiment /////
  move() {
    this.x += this.xDir / 2;
    this.y += this.yDir / 2;
    // why 10?
    if (this.x >= width - 10 || this.x < 10) {
      this.xDir = -this.xDir;
    }
    if (this.y >= height - 10 || this.y < 10) {
      this.yDir = -this.yDir;
    }
    //collision with alien invaders
    for (var i = 0; i < invaders.length; i++) {
      if (dist(this.x, this.y, invaders[i].x, invaders[i].y) < 10) {
        if (this.x < invaders[i].x && this.xDir > 0) {
          this.xDir = -this.xDir;
        } else if (this.x > invaders[i].x && this.xDir < 0) {
          this.xDir = -this.xDir;
        } else if (this.y < invaders[i].y && this.xDir > 0) {
          this.yDir = -this.yDir;
        } else if (this.y > invaders[i].y && this.xDir < 0) {
          this.yDir = -this.yDir;
        }
      }
    }

    if (this.y > 380) {
      if (dist(this.x, 0, gun.x, 0) <= 30) {
        this.yDir = -this.yDir;
        // play a sound (check p5.sound.js)
      } else {
        gameOver = true;
      }
    }
  }
}


function setup() {
  createCanvas(400, 400);
  frameRate(60);
  name1 = new Elevator2(200, 300);
  gun = new gunObj(200);
  bullets = [
    new bulletObj(),
    new bulletObj(),
    new bulletObj(),
    new bulletObj(),
    new bulletObj(),
  ];
  // initialize space invaders
  var a = 100;
  var b = 20;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 10; j++) {
      invaders.push(new invaderObj(a, b));
      bombs.push(new bombObj());
      a += 20;
    }
    a = 100;
    b += 20;
  }
  ball.push(new ballObj(width / 2, height / 2));
}

function draw() {
  if (gameStart == true) {
    background(0, 255, 217);
    name1.update();
    name1.draw();
    fill(170, 0, 130);
    textSize(40);
    text("Game Start", 100, 200);
    textSize(20);
    text("Use arrow key to move", 100, 300);
  } else {
    if (gameOver == false) {
      background(0, 255, 217);
      end = 0;
      for (var i = 0; i < invaders.length; i++) {
        if (invaders[i].dead == 1) {
          end++;
          if (end == invaders.length) {
            gameOver = true;
          }
        }
      }
      for (var i = 0; i < invaders.length; i++) {
        if (invaders[i].dead == 0) {
          invaders[i].draw();
          invaders[i].move();
          if (bombs[i].dropped == 1) {
            bombs[i].draw();
          } else {
            if (random(0, 10000) < 2) {
              bombs[i].dropped = 1;
              bombs[i].x = invaders[i].x;
              bombs[i].y = invaders[i].y + 5;
            }
          }
        }
      }

      for (var i = 0; i < ball.length; i++) {
        ball[i].draw();
        ball[i].move();
      }
      gun.draw();
      gun.move();
      checkFire();
      for (i = 0; i < 5; i++) {
        if (bullets[i].fire === 1) {
          bullets[i].draw();
        }
      }
    } else {
      if (end == invaders.length) {
        background(90, 255, 217);
        fill(111, 111, 10);
        textSize(40);
        text("You Win!!", 100, 200);
      } else {
        background(30, 255, 217);
        fill(255, 0, 0);
        textSize(40);
        text("Game Over", 100, 200);
      }
    }
  }
}
