import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrl: './symbol.component.css'
})
export class SymbolComponent {
  @Input () color: number = 0;
}
