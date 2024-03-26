import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CardComponent} from "./card/card.component";
import {AppManagerService, AppState} from "./app-manager.service";

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

  private _rules = new BehaviorSubject<number[]>([]);
  rules$ = this._rules.asObservable();

  private _countdown = new BehaviorSubject<number>(this.startDuration);
  countdown$ = this._countdown.asObservable();

  private _flipAllCardsFront = new Subject<void>();
  flipAllCardsFront$ = this._flipAllCardsFront.asObservable();

  private _flipAllCardsBack = new Subject<void>();
  flipAllCardsBack$ = this._flipAllCardsBack.asObservable();

  private _interactable = new BehaviorSubject<boolean>(false);
  interactable$ = this._interactable.asObservable();

  private _score = new BehaviorSubject<number>(0);
  score$ = this._score.asObservable();

  startGame() {
    this._score.next(0);
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
          this._rules.next(this.generateRulesArray());
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

  generateRulesArray() {
    let array = [0, 1, 2, 3];
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  updateScore(newScore: number) {
    this._score.next(newScore);
  }

  incrementScore(value: number) {
    this._score.next(this._score.value + value);
  }

  getScore() {
    return this._score.value;
  }

  endGame(cardComponent?: CardComponent) {
    this._gameState.next(GameState.Ended);
    if (cardComponent) {
      cardComponent.startShakeAndStop()
      setTimeout(() => {
        this.appManagerService.changeState(AppState.SCORE_SCREEN);
      }, 1000);
    }
  }



  constructor(private appManagerService: AppManagerService) { }
}
