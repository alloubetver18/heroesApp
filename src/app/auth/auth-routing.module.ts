import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    /* Para añadir rutas Hijas, como atributo de una ruta, declaramos el atributo children, que contendrá, al igual que las rutas padres, todas las rutas hijas correspondientes. */
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
/* Solo habrá una ruta principal. Todas las demas rutas definidas en nuestra aplicación serán Rutas Hijas. A la hora de importarlas, lo haremos con el siguiente formato:
RouterModule.forChild(rutas)
Serán utilizadas para realizar Carga Perezosa o LazyLoad*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
