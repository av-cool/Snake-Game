var snake;
var world;
var food;
var hamilton;
function setup() {
  world = new World();
  //world.setPath(0);
  createCanvas(world.w, world.h);
  background(51);
  snake = new Snake(world);
  //snake.setPathVector(world.getPath());
  food = new Food(world);
  snake.show();
  
  hamilton = new Hamilton(world);
  hamilton.generateMaze();
  hamilton.show();
  frameRate(5);
  
}

function keyPressed() {
  if(keyCode === LEFT_ARROW && snake.xdir != 1)        {snake.updateDir(-1, 0);}
  else if(keyCode === UP_ARROW && snake.ydir != 1)     {snake.updateDir( 0,-1);}
  else if(keyCode === RIGHT_ARROW && snake.xdir != -1) {snake.updateDir( 1, 0);}
  else if(keyCode === DOWN_ARROW && snake.ydir != -1)  {snake.updateDir( 0, 1);}
  //else if(key === ' ') {snake.grow(snake.body[0]);} // for debugging 
}

function mouseClicked() {
  world.addWall(mouseX, mouseY);
  //print(mouseX + " " + mouseY);
}

function draw() {
  background(51);
  if( snake.eat(food.location) ) {
    food.update(snake.body);
  }
 
  food.show();
  //snake.followPath();
  snake.update();
  snake.show();
  if(snake.endGame()) {
    print("End Game");
    noLoop();
  }
  world.show();
  hamilton.show();
}
