import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  startCountdownValue: number = 3;
  numberofCards: number = 50;

  startGame() {
    this.startCountdown(this.startCountdownValue);
  }

  startCountdown(countdown: number) {
    console.log(countdown);
    const intervalId = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        console.log(countdown);
      } else {
        console.log('Go!');
        clearInterval(intervalId);
      }
    }, 1000);
  }

  constructor() { }
}
