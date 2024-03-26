import {Component, QueryList, ViewChildren} from '@angular/core';
import {GameManagerService, GameState} from "../game-manager.service";
import {Subscription} from "rxjs";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  cardsValues!: number[];
  countdown!: number;
  gameState!: GameState;



  @ViewChildren(CardComponent) cards!: QueryList<CardComponent>;

  private gameStateSubscription: Subscription;
  private flipAllCardsFrontSubscription: Subscription;
  private flipAllCardsBackSubscription: Subscription;
  private readonly cardsSubscription: Subscription;
  private readonly countdownSubscription: Subscription;
  private interactableSubscription: Subscription;

  constructor(private gameManager: GameManagerService) {
    this.gameStateSubscription = this.gameManager.gameState$.subscribe(gameState => {
      this.gameState = gameState;
    });

    this.cardsSubscription = this.gameManager.cards$.subscribe(cards => {
      this.cardsValues = cards;
      console.log(this.cardsValues);
    });

    this.countdownSubscription = this.gameManager.countdown$.subscribe(countdown => {
      this.countdown = countdown;
    });

    this.flipAllCardsFrontSubscription = this.gameManager.flipAllCardsFront$.subscribe(() => {
      this.flipAllToFront();
    });

    this.flipAllCardsBackSubscription = this.gameManager.flipAllCardsBack$.subscribe(() => {
      this.flipAllToBack();
    });

    this.interactableSubscription = this.gameManager.interactable$.subscribe(interactable => {
      this.makeCardsInteractable(interactable);
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

  makeCardsInteractable(value: boolean) {
    this.cards.forEach(card => {
      card.makeInteractable(value);
    });
  }






  ngOnDestroy() {
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }

    if (this.cardsSubscription) {
      this.cardsSubscription.unsubscribe();
    }

    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    if (this.flipAllCardsFrontSubscription) {
      this.flipAllCardsFrontSubscription.unsubscribe();
    }

    if (this.flipAllCardsBackSubscription) {
      this.flipAllCardsBackSubscription.unsubscribe();
    }

    if (this.interactableSubscription) {
      this.interactableSubscription.unsubscribe();
    }
  }


  protected readonly GameState = GameState;
}
