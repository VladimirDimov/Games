import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  defer,
  fromEvent,
  interval,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { settings } from 'src/app/settings';
import { tetrisForms } from '../tetris.forms';
import { FallingItem } from './tetris.models';
import { random } from 'src/app/common/number.helpers';

const tetrisSettings = settings.tetris;
const forms = [...tetrisForms];

@Component({
  selector: 'app-tetris-home',
  templateUrl: './tetris-home.component.html',
  styleUrls: ['./tetris-home.component.scss'],
})
export class TetrisHomeComponent implements OnInit {
  interval$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  staticBoard: number[][] = Array(tetrisSettings.board.height).fill(
    Array(tetrisSettings.board.width).fill(0)
  );

  dynamicBoard: number[][] = Array(tetrisSettings.board.height).fill(
    Array(tetrisSettings.board.width).fill(0)
  );

  fallingItem: FallingItem | null = null;

  interval: number = settings.tetris.interval;

  ngOnInit(): void {
    fromEvent(document, 'keydown').subscribe((key: any) => {
      switch (key.key) {
        case 'ArrowLeft':
          this.fallingItem?.moveLeft();
          break;

        case 'ArrowRight':
          this.fallingItem?.moveRight();
          break;

        case 'ArrowDown':
          this.interval = settings.tetris.interval * 0.01;
          break;

        case 'ArrowUp':
          this.fallingItem?.rotate();
          break;

        default:
          break;
      }
    });

    fromEvent(document, 'keyup').subscribe((key: any) => {
      switch (key.key) {
        case 'ArrowDown':
          this.interval = settings.tetris.interval;
          break;

        default:
          break;
      }
    });

    this.interval$
      .pipe(
        switchMap(() => {
          return timer(this.interval);
        }),
        tap((i) => {
          if (!this.fallingItem) {
            this.fallingItem = new FallingItem(tetrisForms[1]);
          }

          if (!this.isHit()) {
            this.fallingItem.top++;
          } else {
            this.staticBoard = JSON.parse(
              JSON.stringify(this.dynamicBoard)
            ) as number[][];

            this.fallingItem = new FallingItem(
              forms[random(0, forms.length - 1)]
            );
          }
        }),
        tap(() => {
          this.updateRows();
        }),
        tap((i) => {
          this.dynamicBoard = this.getCurrentBoard();
        }),
        tap(() => this.interval$.next(0))
      )
      .subscribe((x) => {});
  }

  updateRows() {
    let rowIndexesToClear: number[] = [];

    for (let rowIndex = 0; rowIndex < this.staticBoard.length; rowIndex++) {
      const row = this.staticBoard[rowIndex];
      if (row.indexOf(0) === -1) rowIndexesToClear.push(rowIndex);
    }

    for (let rowIndex of rowIndexesToClear) {
      this.staticBoard.splice(rowIndex, 1);
      this.staticBoard.unshift(Array(settings.tetris.board.width).fill(0));
    }
  }

  private isHit(): boolean {
    if (!this.fallingItem) return false;

    if (
      this.fallingItem.top + this.fallingItem.item.length ===
      this.staticBoard.length
    )
      return true;

    for (
      let vLocalIndex = 0;
      vLocalIndex < this.fallingItem.item.length;
      vLocalIndex++
    ) {
      const row = this.fallingItem.item[vLocalIndex];

      for (let hLocalIndex = 0; hLocalIndex < row.length; hLocalIndex++) {
        const element = row[hLocalIndex];
        if (element === 0) continue;

        const isHitAnotherItem =
          this.staticBoard[this.fallingItem.top + vLocalIndex + 1][
            this.fallingItem.left + hLocalIndex
          ] > 0;

        if (isHitAnotherItem) return true;
      }
    }

    return false;
  }

  private getCurrentBoard(): number[][] {
    let board = JSON.parse(JSON.stringify(this.staticBoard)) as number[][];

    this.fallingItem?.item.forEach((itemRaw, vLocalIndex) => {
      itemRaw.forEach((itemSquare, hLocalIndex) => {
        const vGlobalIndex = (this.fallingItem?.top ?? 0) + vLocalIndex;
        const hGlobalIndex = (this.fallingItem?.left ?? 0) + hLocalIndex;

        board[vGlobalIndex][hGlobalIndex] = board[vGlobalIndex][hGlobalIndex]
          ? board[vGlobalIndex][hGlobalIndex]
          : itemSquare;
      });
    });

    return board;
  }
}
