import { Injectable } from '@angular/core';

export enum AppState {
  MENU,
  GAME,
  SCORE_SCREEN
}

@Injectable({
  providedIn: 'root'
})
export class AppManagerService {
  state: AppState = AppState.MENU;

  constructor() { }

  changeState(newState: AppState) {
    this.state = newState;
  }
}
