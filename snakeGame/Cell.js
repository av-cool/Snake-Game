class Cell {
  constructor(i, j, world) {
    this.i     = i; //i distance from y-axis(ith col or x value), j distance from x-axis(jth row or y value)
    this.j     = j;
    this.rez   = world.rez;
    this.top   = this.j == 0 ? true : false;
    this.right = this.i == world.col-1 ? true : false;
    this.down  = this.j == world.row-1 ? true : false;
    this.left  = this.i == 0 ? true : false;
  }
  
  
  
  show(i) {

    let x = this.i * this.rez;
    let y = this.j * this.rez;
    stroke(255,0,0);
    if(this.top)   { line(           x,            y, x + this.rez,            y); }
    if(this.right) { line(x + this.rez,            y, x + this.rez, y + this.rez); }
    if(this.down)  { line(x + this.rez, y + this.rez,            x, y + this.rez); }
    if(this.left)  { line(           x, y + this.rez,            x,            y); }
    textSize(12);
    textAlign(CENTER);
    noStroke();
    fill(255);
    text(i, x + floor(this.rez/2), y + floor(this.rez/2));
  }
  
}
