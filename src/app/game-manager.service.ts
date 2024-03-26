import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  startCountdownValue: number = 3;
  numberOfCards: number = 50;

  private _cards = new BehaviorSubject<number[]>([]);
  cards$ = this._cards.asObservable();

  startGame() {
    this.startCountdown(this.startCountdownValue);
    this._cards.next(this.generateCardsArray());
  }

  startCountdown(countdown: number) {
    console.log(countdown);
    const intervalId = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        console.log(countdown);
      } else {
        console.log('Go!');
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
