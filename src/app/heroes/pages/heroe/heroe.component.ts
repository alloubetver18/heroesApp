import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }

      .box {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        row-gap: 30px;
      }

      @media screen and (max-width: 599px) {
        .box {
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          column-gap: 30px;
        }
      }

      .subbox {
        flex: 45%;
        padding-right: 20px;
      }

      mat-card {
        margin-right: 20px;
      }

      button {
        margin-left: 15px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => console.log(id));

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroesPorId(id)),
        tap(console.log)
      )
      .subscribe(
        (heroe) => (this.heroe = heroe)
        /* console.log(pais); */
      );
    /* console.log(this.activatedRoute.snapshot.params['id']); */
  }

  regresar(): void {
    this.router.navigate(['/heroes/listado']);
  }
}
