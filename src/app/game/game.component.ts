import { Component } from '@angular/core';
import {GameManagerService} from "../game-manager.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  cards = Array(this.gameManager.numberofCards).fill(null);

  constructor(private gameManager: GameManagerService) { }

}
