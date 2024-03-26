import { Component } from '@angular/core';
import {AppManagerService, AppState} from "../app-manager.service";
import {GameManagerService} from "../game-manager.service";

@Component({
  selector: 'app-score-screen',
  templateUrl: './score-screen.component.html',
  styleUrl: './score-screen.component.css'
})
export class ScoreScreenComponent {

  constructor(private appManager: AppManagerService,
              public gameManager: GameManagerService) { }

  startGame() {
    this.appManager.changeState(AppState.GAME);
    this.gameManager.startGame();
  }

  backToMenu() {
    this.appManager.changeState(AppState.MENU);
  }
}
