import { Component, OnInit } from '@angular/core';
import {
  of,
  tap,
  first,
  combineLatest,
  BehaviorSubject,
  filter,
  switchMap,
  Observable,
  map,
} from 'rxjs';
import { categories$, letters$, numbers$ } from '../observable.example';

@Component({
  selector: 'app-combine-latest-play',
  templateUrl: './combine-latest-play.component.html',
  styleUrls: ['./combine-latest-play.component.scss'],
})
export class CombineLatestPlayComponent implements OnInit {
  searchByCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  categories: string[] = [];

  ngOnInit(): void {
    combineLatest([categories$, this.searchByCategory$.asObservable()])
      .pipe(
        map((x) => {
          let c = x[0];
          let f = x[1];
          return c.filter((category) => {
            return category.toLowerCase().indexOf(f.toLowerCase()) > -1;
          });
        })
      )
      .subscribe((x) => {
        this.categories = x;
      });
  }

  search(e: any) {
    this.searchByCategory$.next(e.target.value);
  }
}
