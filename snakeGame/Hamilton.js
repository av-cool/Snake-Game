class Hamilton {
  constructor(world) {
    
    this.cols  = world.col;
    this.rows  = world.row;
    this.cells = [];
    
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        this.cells.push(new Cell(i, j, world.rez) );
      }
    }
  }
  
  generateMaze() {
    subGrid = decomposeGrid();
  }
  show() { 
    for(let i = 0; i < this.cells.length; i++) {
      this.cells[i].show();
    }
  }
}
