import {Component, QueryList, ViewChildren} from '@angular/core';
import {GameManagerService} from "../game-manager.service";
import {Subscription} from "rxjs";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  cardsValues: number[] = [];
  countdown: number = 0;

  private flipAllCardsSubscription: Subscription;

  @ViewChildren(CardComponent) cards!: QueryList<CardComponent>;



  private readonly cardsSubscription: Subscription;
  private readonly countdownSubscription: Subscription;

  constructor(private gameManager: GameManagerService) {
    this.cardsSubscription = this.gameManager.cards$.subscribe(cards => {
      this.cardsValues = cards;
      console.log(this.cardsValues);
    });

    this.countdownSubscription = this.gameManager.countdown$.subscribe(countdown => {
      this.countdown = countdown;
    });

    this.flipAllCardsSubscription = this.gameManager.flipAllCards$.subscribe(() => {
      this.flipAllCards();
    });
  }






  flipAllCards() {
    this.cards.forEach(card => {
      card.flip();
    });
  }

  flipAllToFront() {
    this.cards.forEach(card => {
      card.flipToFront();
    });
  }

  flipAllToBack() {
    this.cards.forEach(card => {
      card.flipToBack();
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
