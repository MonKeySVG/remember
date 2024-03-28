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
  rules!: number[];
  textRules: string[] = ["+1", "+2", "+3", "Defeat"];



  @ViewChildren(CardComponent) cards!: QueryList<CardComponent>;

  private gameStateSubscription: Subscription;
  private flipAllCardsFrontSubscription: Subscription;
  private flipAllCardsBackSubscription: Subscription;
  private readonly cardsSubscription: Subscription;
  private readonly countdownSubscription: Subscription;
  private interactableSubscription: Subscription;
  private rulesSubscription: Subscription;
  private scoreSubscription: Subscription;
  score!: number;

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

    this.rulesSubscription = this.gameManager.rules$.subscribe(rules => {
      this.rules = rules;
    });

    this.scoreSubscription = this.gameManager.score$.subscribe(score => {
      this.score = score;
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


  onClick(color: number, cardComponent: CardComponent) {
    console.log(color);
    console.log(this.rules);
    if (this.gameState == GameState.Guessing) {
      cardComponent.flipToFront();
      cardComponent.makeInteractable(false);
      cardComponent.displayPoints(this.calculatePoints(color, cardComponent));
    }
  }



  calculatePoints (color: number, cardComponent: CardComponent) {
    if (this.rules[0] == color) {
        console.log("+1");
        this.gameManager.incrementScore(1);
        return this.textRules[0];
    } else if (this.rules[1] == color) {
      console.log("+2");
      this.gameManager.incrementScore(2);
      return this.textRules[1];
    } else if (this.rules[2] == color) {
      console.log("+3");
      this.gameManager.incrementScore(3);
      return this.textRules[2];
    } else if (this.rules[3] == color) {
        this.gameManager.endGame(cardComponent);
        return this.textRules[3];

    }
    return "";
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

    if (this.rulesSubscription) {
      this.rulesSubscription.unsubscribe();
    }

    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }
  }


  protected readonly GameState = GameState;
}
