import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { TetrisHomeComponent } from './components/tetris/tetris-home/tetris-home.component';
import { DynamicHomeComponent } from './components/dynamic/dynamic-home/dynamic-home.component';
import { RxjsHomeComponent } from './components/rxjs-home/rxjs-home.component';
import { CombineLatestPlayComponent } from './components/rxjs-home/combine-latest-play/combine-latest-play.component';

export const routes: Route[] = [
  { path: '', component: AppComponent },
  { path: 'tetris', component: TetrisHomeComponent },
  { path: 'dynamic', component: DynamicHomeComponent },
  {
    path: 'rxjs',
    component: RxjsHomeComponent,
    children: [
      { path: 'combine-latest', component: CombineLatestPlayComponent },
    ],
  },
];
