//A car which powered by watermelon
//collect 20 watermelon to win
//add rock that bounce player and enemy back
//add bullet to kill ememy and rock
//enemy now can take 2 shot then die
class GameObject {
    constructor() {
      //world map
      this.tilemap = [

        "wwwwwrwwwwwwrwwwrwwrrrrrrwwwwrwwwrwrwrww",
        "wr  p               wwwrwwwwwwwww      w",
        "r                              w      r",
        "wr          oooooooo     o  o    w      w",
        "r                         w    www     w",
        "w          r      w       www          r",
        "r          w      w          w         w",
        "ww         w      r                 wwwww",
        "ww         ooooo                       r",
        "w w                                    w",
        "r                         wwwwwwwwr  www",
        "w        e        e       www          r",
        "r                    w                 w",
        "w          w      w             w      w",
        "r          r      r             r      r",
        "w          r      r             w      w",
        "r            ooooo                     w",
        "w                                    www",
        "wwwwwwwwwwwwwwwwwwwwww          wwwwwwww",
        "rrrrrrrrrrrrrrrrrrrrwwwww    wwww rrrrrw",
        "wwwwwwwwwwwwwwwwwwww            w rrrrrw",
        "r      e   w      w      e      w rrrrrw",
        "w          w      w             w rrrrrw",
        "r          w      w             w rrrrrr",
        "w          w      w         w          w",
        "wr         w      w                wwwww",
        "ww                                     w",
        "wrw                                    r",
        "w           wwwww         wwwwwwwww  www",
        "r                         www          w",
        "w      e               e               r",
        "wr  w                                 ww",
        "w    w                    w            w",
        "r  w              w     w        ww    r",
        "w                                      w",
        "r                                    rww",
        "w   rrrrrrrrrr                rrrrrrrwww",
        "wr                                     r",
        "w w                                    w",
        "wwwrwwrwwwrwwrwwwrwwrwwrwwwrwwrwwwrwwrww",
      ];
      //game variables
      this.walls = [];
      this.enemies = [];
      this.prizes = [];
      this.rocks = [];
      this.watermeloncar;
      this.gamelose = false;
      this.gamewin = false;
      this.ingame = true;
      this.bulletinmap = [
        new Bullet(),
        new Bullet(),
        new Bullet(),
        new Bullet(),
        new Bullet(),
      ];
      this.currFrameCount = 0;
    }
  
    // Initializes the game components from the tilemap.
    createworld() {
      for (var i = 0; i < this.tilemap.length; i++) {
        for (var j = 0; j < this.tilemap[i].length; j++) {
          switch (this.tilemap[i][j]) {
            case "w":
              this.walls.push(new Wall(j * 20, i * 20));
              break;
  
            case "e":
              this.enemies.push(new Enemy(j * 20, i * 20));
              break;
  
            case "p":
              this.watermeloncar = new watermelonCar(j * 20, i * 20);
              break;
  
            case "o":
              this.prizes.push(new prize(j * 20, i * 20));
              break;
            case "r":
              this.rocks.push(new rock(j * 20, i * 20));
              break;
          }
        }
      }
    }
  }
  
  //list for prize and watermeloncar
  var prizess = [];
  var myPlayer = [];
  var scoreWin = 20; //Score to win game
  var gameObj;
  var bullets = [];
  var keyArray = [];
  var bulllll = 0;
  
  //watermeloncar object
  class watermelonCar {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.score = 0;
      this.rotate = 0;
      this.vec = new p5.Vector(0, 0);
    }
  
    draw() {
      push();
      translate(this.x + 10, this.y + 10);
      rotate(this.rotate);
      translate(-this.x - 10, -this.y - 10);
      image(myPlayer[0], this.x, this.y, 20, 20);
      pop();
    }
  
    move() {
      var xMove = 0;
      var yMove = 0;
      if (keyIsDown(RIGHT_ARROW)) {
        this.rotate += PI * 3 / 360;
      }
      if (keyIsDown(LEFT_ARROW) && this.x > 10) {
        this.rotate -= PI * 3 / 360;
      }
  
      this.vec.set(
        cos(this.rotate - HALF_PI),
        sin(this.rotate - HALF_PI)
      );
  
      if (keyIsDown(UP_ARROW) && this.y > 10) {
        yMove += 2 * this.vec.y;
        xMove += 2 * this.vec.x;
      }
      if (keyIsDown(DOWN_ARROW) && this.y < height - 10) {
        yMove -= 2 * this.vec.y;
        xMove -= 2 * this.vec.x;
      }
  
      if (this.hitWall(xMove, yMove) == true) {
        xMove = 0;
        yMove = 0;
      }
      if (this.hitRock(xMove, yMove) == true) {
        xMove = -xMove * 3;
        yMove = -yMove * 3;
      }
  
      this.x += xMove;
      this.y += yMove;
    }
  
    hitWall(xMove, yMove) {
      for (var i = 0; i < gameObj.walls.length; i++) {
        var xdistance = abs(gameObj.walls[i].x - (this.x + xMove));
        var ydistance = abs(gameObj.walls[i].y - (this.y + yMove));
  
        if (xdistance <= 13 && ydistance <= 13) {
          //console.log("hitWall");
          return true;
        }
      }
  
      return false;
    }
    hitRock(xMove, yMove) {
      for (var i = 0; i < gameObj.rocks.length; i++) {
        var xdistance = abs(gameObj.rocks[i].x - (this.x + xMove));
        var ydistance = abs(gameObj.rocks[i].y - (this.y + yMove));
  
        if (xdistance <= 13 && ydistance <= 13) {
          //console.log("hitRock");
          return true;
        }
      }
  
      return false;
    }
  
    hitEnemy() {
      for (var i = 0; ydistEnemy.length; i++) {
        var ydistance = abs(this.y - (ydistEnemy[i].y + ydistEnemy[i].yMove));
        var xdistance = abs(this.x - (ydistEnemy[i].x + ydistEnemy[i].xMove));
  
        if (ydistance <= 16 && xdistance <= 13) {
          //console.log("playerdied");
          return true;
        }
      }
  
      for (var i = 0; xDistEnemy.length; i++) {
        var ydistance = abs(this.y - (xDistEnemy[i].y + xDistEnemy[i].yMove));
        var xdistance = abs(this.x - (xDistEnemy[i].x + xDistEnemy[i].xMove));
  
        if (ydistance <= 16 && xdistance <= 12) {
          //console.log("playerdied");
          return true;
        }
      }
  
      return false;
    }
  
    hitPrize(xMove, yMove) {
      for (var i = 0; prizes.length; i++) {
        var xdistance = abs(prizes[i].centerX - (this.x + xMove));
        var ydistance = abs(prizes[i].centerY - (this.y + yMove));
  
        if (xdistance <= 20 && ydistance <= 20) {
          //console.log("hitprize");
          this.score++;
          prizes[i].hitted = true;
          return true;
        }
      }
  
      return false;
    }
  }
  
  class prize {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.centerX = x + 15;
      this.centerY = y + 15;
      this.hitted = false;
    }
  
    draw() {
      image(prizess[0], this.x, this.y, 40, 40);
    }
  
    hitprize() {
      var xdistance = abs(gameObj.watermeloncar.x - this.centerX);
      var ydistance = abs(gameObj.watermeloncar.y - this.centerY);
  
      if (xdistance <= 17 && ydistance <= 17) {
        //console.log("hitprize");
        this.hitted = true;
  
        return true;
      }
  
      return false;
    }
  }
  
  class Enemy {
    constructor(x, y) {
      this.x = x + 1.7;
      this.y = y + 1.7;
      this.step = new p5.Vector(0, -1);
      //speed
      this.yMove = 1.5;
      this.xMove = 1.5;
      this.dead = false;
      this.statemove = 0;
      this.statedraw = 0;
    }
    changeState(x) {
      this.statemove = x;
    }
  
    draw() {
      if (this.statedraw == 0) {
        fill(138, 126, 26);
        noStroke();
        triangle(this.x, this.y - 6, this.x - 6, this.y, this.x + 6, this.y);
        fill(0, 126, 26);
        rect(this.x - 6, this.y, 12, 3);
        fill(200, 26, 26);
        rect(this.x - 6, this.y + 6, 12, 3);
        rect(this.x, this.y, 12, 3);
      }
      if (this.statedraw == 1) {
        fill(138, 126, 26);
        noStroke();
        triangle(this.x, this.y - 6, this.x - 6, this.y, this.x + 6, this.y);
        rect(this.x - 6, this.y, 12, 3);
        rect(this.x - 6, this.y + 6, 12, 3);
        rect(this.x, this.y, 12, 3);
      }
    }
  
    wander() {
      // if (this.dir === 'x') {
      //     if(this.hitRock() == true){
      //         this.yMove = -this.yMove;
      //     }
      //     if(this.hitWall() == true){
      //         this.yMove = 0;
      //     }
      //     this.y += this.yMove;
      // }
      // if (this.dir === 'y') {
      //     if(this.hitRock() == true){
      //         this.xMove = -this.xMove;
      //     }
      //     if(this.hitWall() == true){
      //         this.xMove = 0;
      //     }
      //     this.x += this.xMove;
      // }
    }
  
    chase() {
      var xMove = 0;
      var yMove = 0;
      if (
        dist(this.x, this.y, gameObj.watermeloncar.x, gameObj.watermeloncar.y) <
        100
      ) {
        this.step.set(
          gameObj.watermeloncar.x - this.x,
          gameObj.watermeloncar.y - this.y
        );
  
        this.step.normalize();
        this.angle = this.step.heading() + HALF_PI;
  
        xMove = 0.5 * this.step.x;
        yMove = 0.5 * this.step.y;
  
        if (this.hitWall() == true) {
          xMove = -xMove;
          yMove = -yMove;
        }
        if (this.hitRock() == true) {
          xMove = -xMove * 10;
          yMove = -yMove * 10;
        }
  
        this.x += xMove;
        this.y += yMove;
      }
    }
  
    hitWall() {
      for (var i = 0; i < gameObj.walls.length; i++) {
        var ydistance = abs(gameObj.walls[i].y - (this.y + this.yMove));
        var xdistance = abs(gameObj.walls[i].x - (this.x + this.xMove));
  
        if (ydistance <= 16 && xdistance <= 12) {
          //console.log("Enemies: hitWall");
          return true;
        }
      }
      return false;
    }
    hitRock() {
      for (var i = 0; i < gameObj.rocks.length; i++) {
        var ydistance = abs(gameObj.rocks[i].y - (this.y + this.yMove));
        var xdistance = abs(gameObj.rocks[i].x - (this.x + this.xMove));
  
        if (ydistance <= 20 && xdistance <= 20) {
          //console.log("Enemies: hitRock");
          return true;
        }
      }
      return false;
    }
  
    hitCar() {
      var ydistance = abs(gameObj.watermeloncar.y - (this.y + this.yMove));
      var xdistance = abs(gameObj.watermeloncar.x - (this.x + this.xMove));
  
      if (ydistance <= 16 && xdistance <= 12) {
        //console.log("playerdied");
        gameObj.gamelose = true;
        gameObj.ingame = false;
  
        return true;
      }
  
      return false;
    }
  }
  
  class Bullet {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.angle = 0;
      this.live = 0;
      this.vec = new p5.Vector(0, -1);
    }
  
    draw() {
      push();
      image(bullets[0], this.x, this.y, 8, 8);
      pop();
    }
  
    shoot() {
      this.vec.set(
        cos(this.angle - HALF_PI),
        sin(this.angle - HALF_PI)
      ); 
  
      this.y += 3 * this.vec.y;
      this.x += 3 * this.vec.x;
  
      this.hitEnemy();
      this.hitRock();
      this.hitWall(); 
    }
  
    hitEnemy() {
      for (var i = 0; i < gameObj.enemies.length; i++) {
        var vertical_distance = abs(gameObj.enemies[i].y - this.y);
        var horizontal_distance = abs(gameObj.enemies[i].x - this.x);
  
        if (vertical_distance <= 15 && horizontal_distance <= 13) {
          //console.log("bullet hit enemy");
          gameObj.enemies[i].statedraw += 1;
          if (gameObj.enemies[i].statedraw >= 2) {
            gameObj.enemies[i].dead = true;
          }
  
          this.live = 0;
          
        }
      }
      
    }
    hitRock() {
      for (var i = 0; i < gameObj.rocks.length; i++) {
        var ydistance = abs(gameObj.rocks[i].x - this.x);
        var xdistance = abs(gameObj.rocks[i].y - this.y);
  
        if (ydistance <= 15 && xdistance <= 15) {
          //console.log("bullet: hitRock");
          this.live = 0;
          gameObj.rocks[i].dead = true;
        }
      }
    }
  
    hitWall() {
      for (var i = 0; i < gameObj.walls.length; i++) {
        var horizontal_distance = abs(gameObj.walls[i].x - this.x); 
        var vertical_distance = abs(gameObj.walls[i].y - this.y);
  
        if (horizontal_distance <= 15 && vertical_distance <= 15) {
          //console.log("bullet:hitwall");
          this.live = 0;

        }
      }
  
      
    }
  }
  function keyPressed() {
    keyArray[keyCode] = 1;
  }
  
  function keyReleased() {
    keyArray[keyCode] = 0;
  }
  function checkLive() {
    if (keyArray[32] === 1) {
      if (gameObj.currFrameCount < frameCount - 10) {
        gameObj.currFrameCount = frameCount;
        gameObj.bulletinmap[bulllll].live = 1;
        gameObj.bulletinmap[bulllll].x = gameObj.watermeloncar.x + 10;
        gameObj.bulletinmap[bulllll].y = gameObj.watermeloncar.y + 10;
        gameObj.bulletinmap[bulllll].angle =
          gameObj.watermeloncar.rotate;
        bulllll++;
        if (bulllll > 4) {
          bulllll = 0;
        }
      }
    }
  }
  
  function draw_walls() {
    for (var i = 0; i < gameObj.walls.length; i++) {
      gameObj.walls[i].draw();
    }
  }
  function draw_rocks() {
    for (var i = 0; i < gameObj.rocks.length; i++) {
      if (!gameObj.rocks[i].dead) {
        gameObj.rocks[i].draw();
      }
    }
  }
  
  function draw_enemies() {
    for (var i = 0; i < gameObj.enemies.length; i++) {
      if (!gameObj.enemies[i].dead) {
        gameObj.enemies[i].draw();
        gameObj.enemies[i].chase();
      }
    }
  }
  
  function draw_prizes() {
    var count = 0;
    for (var i = 0; i < gameObj.prizes.length; i++) {
      if (!gameObj.prizes[i].hitted) {
        gameObj.prizes[i].draw();
        count++;
      }
    }
    gameObj.watermeloncar.score = scoreWin - count;
  }
  
  function setup() {
    createCanvas(400, 400);
    drawPrize();
    drawPlayer();
    drawBullet();
    gameObj = new GameObject();
    gameObj.createworld();
  }
  
  function draw() {
    if (gameObj.gamelose) {
      gameObj.walls = [];
      gameObj.enemies = [];
      gameObj.prizes = [];
      gameObj.createworld();
      overBox_start = false;
      gameObj.watermeloncar.score = 0;
  
      rectMode(CORNER);
      push();
      background(10, 100, 100);
      if (!gameObj.gamewin) {
        push();
        fill(121, 53, 68);
        textSize(40);
        text("You Lose!", width / 2 - 100, height / 2 - 45);
        pop();
      } else {
        push();
        fill(33, 33, 38);
        textSize(40);
        text("You Win!", width / 2 - 100, height / 2 - 45);
        pop();
      }
    } else if (gameObj.ingame) {
      push();
      // watermelonCar's position is initialized in the map to be at the right side
      if (gameObj.watermeloncar.x > width / 2) {
        // If watermeloncar's position is in the right side, then shift immediately
        if (gameObj.watermeloncar.x > 1000) {
          translate(-800, 0);
        } else {
          // Shifts the left side of the map (origin) to the left by the change in distance from mid-section of the screen
          translate(
            width / 2 - gameObj.watermeloncar.x,
            height / 2 - gameObj.watermeloncar.y
          );
        }
      }
      background(0);
  
      draw_walls();
      draw_enemies();
      draw_prizes();
      draw_rocks();
      gameObj.watermeloncar.draw();
      gameObj.watermeloncar.move();
  
      for (var i = 0; i < gameObj.enemies.length; i++) {
        if (!gameObj.enemies[i].dead) {
          gameObj.enemies[i].hitCar();
        }
      }
  
      for (var i = 0; i < gameObj.prizes.length; i++) {
        gameObj.prizes[i].hitprize();
      }
      checkLive();
  
      for (var i = 0; i < gameObj.bulletinmap.length; i++) {
        if (gameObj.bulletinmap[i].live == 1) {
          gameObj.bulletinmap[i].draw();
          gameObj.bulletinmap[i].shoot();
        }
      }
      pop();
  
      push();
      textSize(20);
      fill(250, 10, 10);
      text("score: " + gameObj.watermeloncar.score, 280, 25);
      pop();
      if (gameObj.watermeloncar.score == 20) {
        gameObj.gamewin = true;
        gameObj.gamelose = true;
      }
    }
  }
  
  function drawPlayer() {
    push();
    noStroke;
    fill(150, 10, 110);
    ellipse(150, 177, 133, 233);
    fill(155, 255, 255);
    ellipse(250, 250, 133, 133);
    ellipse(50, 250, 133, 133);
    fill(130, 40, 130);
    myPlayer.push(get(0, 0, width, height));
    pop();
  }
  
  function drawPrize() {
    push();
    background(220, 220, 220, 0);
    stroke(6, 140, 105);
    strokeWeight(30);
    fill(116, 0, 105);
    ellipse(12, 12, 133, 233);
    prizess.push(get(0, 0, width, height));
    pop();
  }
  function drawBullet() {
      push();
      background(220, 220, 220);
      strokeWeight(10);
      rect(12, 12, 20, 20);

      bullets.push(get(0, 0, width, height));
      pop();
  }
  //rock object
  class rock {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.died = false;
    }
  
    draw() {
      rectMode(CENTER);
      fill(146, 144, 103);
      rect(this.x + 10, this.y + 10, 20, 20);
    }
  }
  // wall object
  class Wall {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    draw() {
      rectMode(CENTER);
      fill(46, 44, 103);
      rect(this.x + 10, this.y + 10, 20, 20);
    }
  }
  