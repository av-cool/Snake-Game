class Cell {
  constructor(i, j, w) {
    this.i     = i;
    this.j     = j;
    this.rez   = w;
    this.top   = true;
    this.right = true;
    this.down  = true;
    this.left  = true;
  }
  
  
  
  show() {

    let x = this.i * this.rez;
    let y = this.j * this.rez;
    stroke(255);
    if(this.top)   { line(           x,            y, x + this.rez,            y); }
    if(this.right) { line(x + this.rez,            y, x + this.rez, y + this.rez); }
    if(this.down)  { line(x + this.rez, y + this.rez,            x, y + this.rez); }
    if(this.left)  { line(           x, y + this.rez,            x,            y); }
  }
  
}
