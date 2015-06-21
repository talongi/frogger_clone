// Enemies our player must avoid
var Enemy = function(y) {
  "use strict";
  // Variables applied to each of our instances
  this.offScreen = 550;
  this.xStartPosition = -10;
  this.x = this.xStartPosition;
  this.y = y;
  this.speed = Math.floor((Math.random() * 200) + 100);

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.width = 30;
  this.height = 30;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  "use strict";
  //if the enemy crosses off screen, reset its position. Otherwise, it keeps running.
  if (this.x <= this.offScreen) {
    this.x += this.speed * dt;
  } else {
    this.x = this.xStartPosition;
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class constructor
var Player = function() {
  "use strict";
  this.xStartPosition = 200;
  this.yStartPosition = 400;
  this.x = this.xStartPosition;
  this.y = this.yStartPosition;
  this.width = 30;
  this.height = 30;
  this.playerMovementHorizontal = 101;
  this.playerMovementVertical = 83;
  this.offScreenRight = 400;
  this.offScreenLeft = 0;
  this.offScreenDown = 400;
  this.waterLocation = 25;
  this.sprite = 'images/char-cat-girl.png';
  this.score = 0;
};

//Inherit methods from Enemy so that render method can be reused
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

//Player reset location if on water
Player.prototype.reset = function() {
  "use strict";
  this.x = this.xStartPosition;
  this.y = this.yStartPosition;
};

//Modify the Player update method to respond to key presses and the player's x and y position.
Player.prototype.update = function(key) {
  "use strict";
  if (this.key === 'left' && this.x > this.offScreenLeft) {
    this.x = this.x - this.playerMovementHorizontal;
  } else if (this.key === 'right' && this.x < this.offScreenRight) {
    this.x = this.x + this.playerMovementHorizontal;
  } else if (this.key === 'up') {
    this.y = this.y - this.playerMovementVertical;
  } else if (this.key === 'down' && this.y < this.offScreenDown) {
    this.y = this.y + this.playerMovementVertical;
  }
  this.key = null;

  //If on water, reset player position, add 10 points, and print to the console
  if (this.y < this.waterLocation) {
    this.score += 10;
    this.reset();
    console.log('Nooice! Your score is: ' + this.score);
  }

};

//Sets the input from the key press listener to a property of Player
Player.prototype.handleInput = function(e) {
  "use strict";
  this.key = e;
};


// Places all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(60));
allEnemies.push(new Enemy(140));
allEnemies.push(new Enemy(220));

// Places the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});