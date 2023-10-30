import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetrisHomeComponent } from './components/tetris/tetris-home/tetris-home.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, TetrisHomeComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
