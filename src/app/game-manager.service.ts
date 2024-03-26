import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

export enum GameState {
  Starting,
  Remembering,
  Guessing,
  Ended,
  Inactive
}

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  startDuration: number = 3;
  rememberDuration: number = 6;

  numberOfCards: number = 50;

  private _gameState = new BehaviorSubject<GameState>(GameState.Inactive);
  gameState$ = this._gameState.asObservable();

  private _cards = new BehaviorSubject<number[]>([]);
  cards$ = this._cards.asObservable();

  private _countdown = new BehaviorSubject<number>(this.startDuration);
  countdown$ = this._countdown.asObservable();

  private _flipAllCardsFront = new Subject<void>();
  flipAllCardsFront$ = this._flipAllCardsFront.asObservable();

  private _flipAllCardsBack = new Subject<void>();
  flipAllCardsBack$ = this._flipAllCardsBack.asObservable();

  private _interactable = new BehaviorSubject<boolean>(false);
  interactable$ = this._interactable.asObservable();

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
          this._gameState.next(GameState.Remembering);
          this._flipAllCardsFront.next();
          this.startCountdown(this.rememberDuration);
        } else if (this._gameState.value === GameState.Remembering) {
          this._gameState.next(GameState.Guessing);
          this._flipAllCardsBack.next();
          this._interactable.next(true);
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
