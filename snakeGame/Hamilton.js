class Hamilton {
  constructor(world) {
    this.world = world;
    this.cells = [];
    this.dsu   = [];
    this.size  = [];
    this.mst   = [];
    for(let i = 0; i < this.world.row; i++) {
      for(let j = 0; j < this.world.col; j++) {
        this.cells.push(new Cell(j, i, world) ); //j distance from y-axis(jth col), i distance from x-axis(ith row)
      }
    }
    for(let i = 0; i < this.cells.length; i++) {
      this.dsu.push(i);
      this.size.push(1);
    }
  }
  
  root(A) {
    while(this.dsu[A] != A) {
      this.dsu[A] = this.dsu[this.dsu[A]];
      A = this.dsu[A];
    }
    return A;
  }
  
  union(A, B) {
    let root_A = this.root(A);
    let root_B = this.root(B);
    if(this.size[root_A] < this.size[root_B]) {
      this.dsu[root_A] = root_B;
      this.size[root_B] += this.size[root_A];
    }
    else {
      this.dsu[root_B] = root_A;
      this.size[root_A] += this.size[root_B];
    }
  }
  
  find(A, B) {
    if(this.root(A) == this.root(B)) {
      return true;
    }
    return false;
  }
  getLocation(vertex) {
    let x = floor(vertex % this.world.col);
    let y = floor(vertex / this.world.col);
    return createVector(x, y);
  }
  compare(a, b) {
    return a.W - b.W;
  }
  getEdges() {
    let edges = [];
    for(let i = 0; i < this.world.row; i += 2) {
      for(let j = 0; j <  this.world.row; j += 2) {
        let v = i * this.world.row + j;
        let v1 = (i + 2) * this.world.row + j;
        let v2 = i * this.world.row + (j+2);
        if(i+2 < this.world.row) {edges.push({W : floor(random(50)), A : v, B : v1});}
        if(j+2 < this.world.col) {edges.push({W : floor(random(50)), A : v, B : v2});}
      }
    }
    edges.sort(this.compare);
    return edges;
  }
  
  generateMaze() {
    let edges = this.getEdges();
    for(let i in edges) {
      if(this.find(edges[i].A, edges[i].B) == false) {
        this.mst.push(edges[i]);
        this.union(edges[i].A , edges[i].B);
      }
    }
    for(let i in this.mst) {
      let A = this.mst[i].A;
      let B = this.mst[i].B;
      console.log(A + " " + B);
      if(floor(abs(B - A)) == 2) {       //horizontal edge
        this.cells[A+1].down = true;
        this.cells[B].down = true;
      }
      else if(floor(abs(B - A)) == 2 * this.world.col) { //vertical edge
        this.cells[A + this.world.col].right = true;
        this.cells[B].right = true;
      }
    }
  }
  show() { 
    for(let i = 0; i < this.cells.length; i++) {
      this.cells[i].show(i);
    }
  }
}
