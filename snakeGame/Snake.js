class Snake {
 constructor(world) {
   this.world      = world;
   this.body       = [];
   this.body[0]    = createVector(0,0);
   this.xdir       = 1;
   this.ydir       = 0;
   this.pathVector = [];
   this.pointer    = 0;
 }
 
 grow(pos) {
   this.body.unshift( pos.copy() );
   print('score : ' + this.body.length); // Score
 }
 
 eat(pos) {
   let x = this.body[0].x;
   let y = this.body[0].y;
   if(abs(x - pos.x) < 0.001 && abs(y - pos.y) < 0.001) {
     this.grow(pos);
     return true;
   }
   return false;
 }
 
 endGame() {
   let x = this.body[0].x;
   let y = this.body[0].y;
   //if(x < 0 || x > this.world.col-1 || y < 0 || y > this.world.row-1) {return true;}//
   for(let i = 1; i < this.body.length; i++) {
     let part = this.body[i];
     if(abs(part.x - x) < 0.0001 && abs(part.y - y) < 0.0001) {return true;}
   }
   for(let i in this.world.walls) {
     let wall = this.world.walls[i];
     if(abs(wall.x - x) < 0.0001 && abs(wall.y - y) < 0.0001) {return true;}
   }
   return false;
 }
 
 update() {
   let len = this.body.length;
   for(let i = len-1; i >= 1; i--) {
     this.body[i] = this.body[i-1].copy();
   }
   this.body[0].x += this.xdir;
   this.body[0].y += this.ydir;
   
   //This part is for the World to be a donut topology
   
   if(this.body[0].x < 0) {this.body[0].x = this.world.col -1;}
   if(this.body[0].x > this.world.col-1) {this.body[0].x = 0;}
   if(this.body[0].y < 0) {this.body[0].y = this.world.row-1;}
   if(this.body[0].y > this.world.row-1) {this.body[0].y = 0;}
 }
 setPathVector(pathV) {
   for(let i in pathV) {
     this.pathVector.push(pathV[i]);
   }
 }
 followPath() {
   let len = this.body.length;
   for(let i = len-1; i >= 1; i--) {
     this.body[i] = this.body[i-1];
   }
   this.body[0] = this.pathVector[this.pointer].copy();
   this.pointer = floor((this.pointer + 1) % this.pathVector.length);
 }
 
 updateDir(dx, dy) {
   this.xdir = dx;
   this.ydir = dy;
 }
 
 show() {
   fill(0,255,0);
   noStroke();
   let len = this.body.length;
   for(let i in this.body) {
     let x = this.body[i].x * this.world.rez;
     let y = this.body[i].y * this.world.rez;
     rect(x, y, this.world.rez, this.world.rez);
   }
 }
}
