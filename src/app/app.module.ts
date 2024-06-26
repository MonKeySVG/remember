import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ButtonComponent } from './button/button.component';
import { SymbolComponent } from './symbol/symbol.component';
import { CardComponent } from './card/card.component';
import { GameComponent } from './game/game.component';
import { ScoreScreenComponent } from './score-screen/score-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ButtonComponent,
    SymbolComponent,
    CardComponent,
    GameComponent,
    ScoreScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
