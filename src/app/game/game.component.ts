import { Component } from '@angular/core';
import {GameManagerService} from "../game-manager.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  cards: number[] = [];
  countdown: number = 0;

  private readonly cardsSubscription: Subscription;
  private readonly countdownSubscription: Subscription;

  constructor(private gameManager: GameManagerService) {
    this.cardsSubscription = this.gameManager.cards$.subscribe(cards => {
      this.cards = cards;
      console.log(this.cards);
    });

    this.countdownSubscription = this.gameManager.countdown$.subscribe(countdown => {
      this.countdown = countdown;
    });
  }

  ngOnDestroy() {
    if (this.cardsSubscription) {
      this.cardsSubscription.unsubscribe();
    }

    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }


}
