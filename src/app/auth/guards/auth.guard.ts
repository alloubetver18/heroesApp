import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('CanActivate - ', this.authService.verificarAutenticacion());
    return this.authService.verificarAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    /* if (this.authService.auth.id) {
      console.log('canActivate: ', true);
      console.log('ActivatedRouteSnapshot: ', route);
      console.log('RouterStateSnapshot: ', state);
      return true;
    }
    console.log('Bloqueado por AuthGuard - CanActivate');
    return false; */
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificarAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    /* if (this.authService.auth.id) {
      console.log('canLoad: ', true);
      console.log('Route: ', route);
      console.log('UrlSegment: ', segments);
      return true;
    }
    console.log('Bloqueado por AuthGuard - CanLoad');
    return false;*/
  }
}
