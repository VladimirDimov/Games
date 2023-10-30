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
          this.interval = 100;
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
        tap((i) => {
          this.dynamicBoard = this.getCurrentBoard();
        }),
        tap(() => this.interval$.next(0))
      )
      .subscribe((x) => {});
  }

  private isHit(): boolean {
    if (!this.fallingItem) return false;

    const fallingItemHeight = this.fallingItem?.item.length;
    const fallingItemMaxTop = this.fallingItem?.top + fallingItemHeight;
    const itemBottomRow =
      this.fallingItem.item[this.fallingItem.item.length - 1];

    if (fallingItemMaxTop === settings.tetris.board.height) return true;

    let isHit = false;

    itemBottomRow.forEach((bottomSquare, hLocal) => {
      if (!this.fallingItem) return;

      const hGlobal = hLocal + this.fallingItem.left;
      const vGlobal = this.fallingItem.top + this.fallingItem.item.length;

      if (this.staticBoard[vGlobal][hGlobal] == 1) {
        isHit = true;
        return;
      }
    });

    return isHit;
  }

  private getCurrentBoard(): number[][] {
    let board = JSON.parse(JSON.stringify(this.staticBoard)) as number[][];

    this.fallingItem?.item.forEach((itemRaw, vLocalIndex) => {
      itemRaw.forEach((itemSquare, hLocalIndex) => {
        const vGlobalIndex = (this.fallingItem?.top ?? 0) + vLocalIndex;
        const hGlobalIndex = (this.fallingItem?.left ?? 0) + hLocalIndex;

        board[vGlobalIndex][hGlobalIndex] = itemSquare;
      });
    });

    return board;
  }
}
