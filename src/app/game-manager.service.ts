import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export enum GameState {
  Starting,
  InProgress,
  Inactive
}

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  startDuration: number = 3;
  rememberDuration: number = 60;

  numberOfCards: number = 50;

  private _gameState = new BehaviorSubject<GameState>(GameState.Inactive);
  gameState$ = this._gameState.asObservable();

  private _cards = new BehaviorSubject<number[]>([]);
  cards$ = this._cards.asObservable();

  private _countdown = new BehaviorSubject<number>(this.startDuration);
  countdown$ = this._countdown.asObservable();

  startGame() {
    this._gameState.next(GameState.Starting);
    this.startCountdown(this.startDuration);
    this._cards.next(this.generateCardsArray());
  }

  startCountdown(countdown: number) {
    this._countdown.next(countdown);
    const intervalId = setInterval(() => {
      countdown--;
      if (countdown >= 0) {
        this._countdown.next(countdown);
      } else {
        if (this._gameState.value === GameState.Starting) {
          this._gameState.next(GameState.InProgress);
          // Flip all the cards
          this.startCountdown(this.rememberDuration);
        }
        clearInterval(intervalId);

      }
    }, 1000);
  }

  generateCardsArray() {
    let array = [];
    for (let i = 0; i < this.numberOfCards; i++) {
      array.push(Math.floor(Math.random() * 4));
    }
    console.log(array);
    return array;
  }



  constructor() { }
}
