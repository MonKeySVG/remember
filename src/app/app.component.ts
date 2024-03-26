import { Component } from '@angular/core';
import {AppManagerService, AppState} from "./app-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'memory-game';

  state = AppState;

  constructor(public appManager: AppManagerService) { }
}
