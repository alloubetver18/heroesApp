import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseURL;
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth };
  }

  constructor(private http: HttpClient) {}

  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    /* return of(true); */
    /* return true; */
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        /* console.log('Map - ', auth); */
        this._auth = auth;
        return true;
      })
    );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  logout() {
    this._auth = undefined;
  }
}
