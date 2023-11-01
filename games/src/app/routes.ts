import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { TetrisHomeComponent } from './components/tetris/tetris-home/tetris-home.component';
import { DynamicHomeComponent } from './components/dynamic/dynamic-home/dynamic-home.component';

export const routes: Route[] = [
  { path: '', component: AppComponent },
  { path: 'tetris', component: TetrisHomeComponent },
  { path: 'dynamic', component: DynamicHomeComponent },
];
