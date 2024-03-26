import { Component } from '@angular/core';
import {AppManagerService, AppState} from "../app-manager.service";
import {GameManagerService} from "../game-manager.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private appManager: AppManagerService,
              private gameManager: GameManagerService) { }

  startGame() {
    this.appManager.changeState(AppState.GAME);
    this.gameManager.startGame();
  }

}
