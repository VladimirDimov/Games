import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetrisHomeComponent } from './components/tetris/tetris-home/tetris-home.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HeaderComponent } from './components/header/header.component';
import { SquareComponent } from './components/tetris/square/square.component';
import { DynamicHomeComponent } from './components/dynamic/dynamic-home/dynamic-home.component';
import { DynamicOneComponent } from './components/dynamic/dynamic-one/dynamic-one.component';
import { DynamicTwoComponent } from './components/dynamic/dynamic-two/dynamic-two.component';
import { ClosableComponent } from './components/dynamic/closable/closable.component';
import { RxjsHomeComponent } from './components/rxjs-home/rxjs-home.component';
import { CombineLatestPlayComponent } from './components/rxjs-home/combine-latest-play/combine-latest-play.component';
import { SwitchMapPlayComponent } from './components/rxjs-home/switch-map-play/switch-map-play.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisHomeComponent,
    HeaderComponent,
    SquareComponent,
    DynamicHomeComponent,
    DynamicOneComponent,
    DynamicTwoComponent,
    ClosableComponent,
    RxjsHomeComponent,
    CombineLatestPlayComponent,
    SwitchMapPlayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
