import { Component, OnInit } from '@angular/core';
import { numbers$ } from '../observable.example';
import {
  BehaviorSubject,
  Subject,
  delay,
  interval,
  map,
  of,
  switchMap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-switch-map-play',
  templateUrl: './switch-map-play.component.html',
  styleUrls: ['./switch-map-play.component.scss'],
})
export class SwitchMapPlayComponent implements OnInit {
  withSwithMap$: Subject<void> = new Subject<void>();
  withoutSwithMap$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.withSwithMap$.pipe(switchMap(() => interval(500))).subscribe((res) => {
      console.log(res);
    });

    this.withoutSwithMap$
      // .pipe(switchMap(() => interval(500)))
      .subscribe((res) => {
        console.log(res);
      });
  }

  startCounterWithSwitchMap() {
    this.withSwithMap$.next();
  }

  startCounterWithoutSwitchMap() {
    this.withoutSwithMap$.next();
  }
}
