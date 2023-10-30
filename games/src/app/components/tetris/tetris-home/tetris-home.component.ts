import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tetris-home',
  templateUrl: './tetris-home.component.html',
  styleUrls: ['./tetris-home.component.scss'],
})
export class TetrisHomeComponent implements OnInit {
  ngOnInit(): void {
    interval(1000)
      .pipe()
      .subscribe((x) => {
        console.log(x);
      });
  }
}
