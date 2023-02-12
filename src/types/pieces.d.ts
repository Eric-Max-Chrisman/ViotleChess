class point2D {
  point2D(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(`(${this.x}, ${this.y})`);
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  private x: number;

  private y: number;
}

export { point2D };
