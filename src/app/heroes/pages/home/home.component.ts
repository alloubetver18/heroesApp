import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        padding: 10px;
        margin: auto;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  get auth() {
    return this.authService.auth;
  }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  /* Crearemo una función de Login. */
  logout() {
    /* ¿Qué haremos aquí?
    - Llamaremos al Backend
    - Le preguntaremos si el usuario buscado existe.
    - Navegará a la página de Listado de Héroes, que con nuestras rutas definidas sería /heroes*/
    this.router.navigate(['./auth']);
  }
}
