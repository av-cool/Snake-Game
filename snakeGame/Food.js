class Food {
  constructor(world) {
    this.world    = world;
    this.location = createVector(this.world.col/2, this.world.row/2);
  }
  update(body) {
    let x, y;
    let timer   = 0;
    let TIMEOUT = 200000;
    while(timer < TIMEOUT) {
      x = floor(random(this.world.col));
      y = floor(random(this.world.row));
      let flag = false;
      for(let i in body) {
        if(body[i].x == x && body[i].y == y) { 
          flag = true;
          break;
        }
      }
      if(flag == false) {
        break;  
      }
      timer++;
    }
    this.location.x = x;
    this.location.y = y;
  }
  show() {
    let x = this.location.x * this.world.rez;
    let y = this.location.y * this.world.rez;
    noStroke();
    fill(255,0,0);
    rect(x, y,this.world.rez,this.world.rez);
  }
}
