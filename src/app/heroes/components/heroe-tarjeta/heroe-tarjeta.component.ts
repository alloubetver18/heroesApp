import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      img {
        height: 100%;
        width: 100%;
      }

      mat-card {
        margin-right: 20px;
      }
    `,
  ],
})
export class HeroeTarjetaComponent {
  @Input('hero') heroe!: Heroe;
}
