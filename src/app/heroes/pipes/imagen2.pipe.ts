import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen2',
})
export class Imagen2Pipe implements PipeTransform {
  transform(heroe: Heroe): string {
    return `/assets/heroes/${heroe.id}.jpg`;
  }
}
