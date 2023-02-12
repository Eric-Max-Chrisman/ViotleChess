class Point2D {
  Point2D(x: number, y: number): void {
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

export { Point2D };
