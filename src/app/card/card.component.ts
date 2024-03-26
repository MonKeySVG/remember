import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input () color: number = 0;
  flipped: boolean = false;

  flip() {
    this.flipped = !this.flipped;
  }

  flipToBack() {
    this.flipped = false;
  }

  flipToFront() {
    this.flipped = true;
  }
}
