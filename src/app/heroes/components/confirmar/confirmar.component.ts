import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [],
})
export class ConfirmarComponent {
  heroe!: Heroe;

  constructor(
    public dialogRef: MatDialogRef<ConfirmarComponent>,
    /* Para transmitir datos (como objetos para ser usados en el diálogo), podemos, en este caso, usar el
    decorador Inject para enviar información entre el componente Padre (el que abre el diálogo) y el
    componente Hijo (el diálogo en si mismo). En este ejemplo, MAT_DIALOG_DATA hace referencia al atributo
    data de la llamada dialog.open(ConfirmarComponent) que se encuentra en la función borrar() dentro
    de agregarComponent.  */
    @Inject(MAT_DIALOG_DATA)
    public datosHeroe: Heroe
  ) {
    this.heroe = datosHeroe;
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  borrar() {
    this.dialogRef.close(true);
  }
}
