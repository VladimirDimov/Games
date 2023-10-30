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
    if (this.left < settings.tetris.board.width) this.left++;
  }

  public moveDown() {
    if (this.top < settings.tetris.board.height - 1) this.top++;
  }
}
