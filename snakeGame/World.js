class World {
  constructor() {
    this.rez = 20;
    this.w = 600;
    this.h = 600;
    this.col = floor(this.w/this.rez);
    this.row = floor(this.h/this.rez);
    this.walls = [];
    this.path = [];
    this.pathVector = [];
    this.V = this.col * this.row; 
    
  }
  getLocation(vertex) {
    let x = floor(vertex % this.col);
    let y = floor(vertex / this.col);
    return createVector(x, y);
  }
  isAdjacent(v1, v2) {
    let l1 = this.getLocation(v1);
    let l2 = this.getLocation(v2);
    if(floor(abs(l1.x - l2.x)) == 1 && l1.y == l2.y) {return true;}
    if(l1.x == l2.x && floor(abs(l1.y - l2.y)) == 1) {return true;}
    return false;
  }
  isSafe(vertex) {
    let len = this.path.length;
    if( !this.isAdjacent(this.path[len-1], vertex) ) {return false;}
    for(let i in this.path) {
      if(this.path[i] == vertex) {return false;}
    }
    return true;
  }
  hamCycle() {
    let len = this.path.length;
    if(len == this.V) {
      if(this.isAdjacent(this.path[len-1], this.path[0]) ) {return true;}
      return false;
    }
    for(let v = 0; v < this.V; v++) {
      if(this.isSafe(v)) {
        this.path.push(v);
        if( this.hamCycle() ) {return true;}
        this.path.pop();
      }
    }
    return false;
  }
  setPath(s) {
    this.path[0] = s; // adding start to the Path
    if( this.hamCycle() ) {
      for(let i in this.path) {
        this.pathVector.push(this.getLocation(this.path[i]));
      }
    }
  }
  getPath() {
    return this.pathVector;
  }
  addWall(posx, posy) {
    this.walls.push(createVector( floor(posx/this.rez), floor(posy/this.rez) ) );
  }
  show() {
    fill(0,0,255);
    noStroke();
    for(let i in this.walls) {
      rect(this.walls[i].x, this.walls[i].y, 1, 1);
    }
  }
    
}
