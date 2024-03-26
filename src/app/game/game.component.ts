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

  private readonly cardsSubscription: Subscription;

  constructor(private gameManager: GameManagerService) {
    this.cardsSubscription = this.gameManager.cards$.subscribe(cards => {
      this.cards = cards;
      console.log(this.cards);
    });
  }

  ngOnDestroy() {
    if (this.cardsSubscription) {
      this.cardsSubscription.unsubscribe();
    }
  }


}
