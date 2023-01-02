import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .botones {
        display: flex;
      }
      img {
        width: 100%;
        border-radius: 5px;
      }
      .box {
        display: flex;
        flex-flow: row;
        row-gap: 10px;
      }

      .subbox {
        flex-flow: column;
        flex: 49%;
        margin-right: 20px;
      }

      .bloque-super-ego {
        display: flex;
        flex-flow: row;
      }

      .super-ego {
        flex: 45%;
        margin-right: 5px;
      }

      .otros {
        width: 99%;
        margin-right: 5px;
      }

      @media screen and (max-width: 599px) {
        img {
          width: 100%;
          border-radius: 5px;
        }
        .box {
          display: flex;
          flex-flow: column;
          justify-content: space-around;
          column-gap: 30px;
        }
        .subbox {
          flex-flow: column;
          flex: 49%;
          justify-content: space-around;
          margin-right: 20px;
        }
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };
  /* publisher: string[] = ['DC', 'Marvel']; */
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics',
    },
  ];

  durationInSeconds = 5;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroesPorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
    /* console.log(this.activatedRoute.snapshot.params['id']); */
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      //Actualizar
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) => this.mostrarSnackBar('Registro actualizado.'));
    } else {
      //Agregar
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro creado.');
      });
    }
  }

  borrar(): void {
    const dialogo = this.dialog.open(ConfirmarComponent, {
      data: this.heroe,
    });
    dialogo.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe((resp) => {
          this.router.navigate(['/heroes']);
          this.mostrarSnackBar('Registro borrado.');
        });
      }
    });
  }

  mostrarSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2500,
    });
  }
}
