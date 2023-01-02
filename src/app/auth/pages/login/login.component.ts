import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  /* Crearemo una función de Login. */
  login() {
    /* ¿Qué haremos aquí?
    - Llamaremos al Backend
    - Le preguntaremos si el usuario buscado existe.
    - Navegará a la página de Listado de Héroes, que con nuestras rutas definidas sería /heroes*/
    this.authService.login().subscribe((usuario) => {
      if (usuario.id) {
        console.log(usuario.id);
        this.router.navigate(['./heroes']);
      }
    });
  }

  ingresarSinlogin() {
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }
}
