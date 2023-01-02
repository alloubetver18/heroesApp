import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      /* .box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        row-gap: 20px;
        align-items: flex-start !important;
        margin: auto !important;
      }
      .subbox {
        width: 25%;
        height: 100%;
        flex: 20%;
      }
      mat-card {
        margin-right: 20px;
        margin-top: 20px;
      } */

      img {
        height: 100%;
        width: 100%;
      }

      .box {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        row-gap: 20px;
      }

      .subbox {
        flex: 18%;
      }

      mat-card {
        margin-right: 20px;
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];
  hayError: boolean = false;
  constructor(private heroesService: HeroesService, private router: Router) {}

  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
    /* this.heroesService.getHeroes().subscribe({
      next: (resp) => {
        this.heroes = resp;
        this.hayError = false;
      },
      error: (err) => {
        this.hayError = true;
        this.heroes = [];
      },
      complete: () => {
        console.info('complete');
      },
    }); */
  }

  logout() {
    /* ¿Qué haremos aquí?
    - Llamaremos al Backend
    - Le preguntaremos si el usuario buscado existe.
    - Navegará a la página de Listado de Héroes, que con nuestras rutas definidas sería /heroes*/
    this.router.navigate(['./auth/login']);
  }
}
