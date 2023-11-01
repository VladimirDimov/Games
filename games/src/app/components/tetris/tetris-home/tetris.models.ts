import { settings } from 'src/app/settings';

export class FallingItem {
  constructor(private form: number[][]) {
    this.item = form;
    this.left = settings.tetris.board.width / 2;
  }

  top: number = 0;
  left: number = 0;
  item: number[][];

  public moveLeft() {
    if (this.left > 0) this.left--;
  }

  public moveRight() {
    if (this.left < settings.tetris.board.width - this.item[0].length)
      this.left++;
  }

  public moveDown() {
    if (this.top < settings.tetris.board.height - 1) this.top++;
  }

  public rotate() {
    this.item = this.rotateMatrixClockwise(this.item);
  }

  private rotateMatrixClockwise<T>(matrix: T[][]): T[][] {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Create a new matrix with the dimensions swapped
    const rotatedMatrix: T[][] = Array.from({ length: numCols }, () => []);

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        // Rotate the element at (i, j) to (j, numRows - i - 1)
        rotatedMatrix[j][numRows - i - 1] = matrix[i][j];
      }
    }

    return rotatedMatrix;
  }
}
