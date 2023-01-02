import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseURL: string = environment.baseURL;

  /* urlHeroes: string = 'http://localhost:3000/heroes/'; */
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes`);
  }
  /** método para hacer get a la BD: objeto HttpClient, funcion get<clase de objeto a recibir>(URL a llamar) */
  getHeroesPorId(id: string): Observable<Heroe> {
    /* return this.http.get<Heroe>(this.urlHeroes + id); */
    return this.http.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }
  getSugerencias(termino: string): Observable<Heroe[]> {
    /* return this.http.get<Heroe>(this.urlHeroes + id); */
    return this.http.get<Heroe[]>(
      `${this.baseURL}/heroes?q=${termino}&_limit=5`
    );
  }
  /** método para hacer post a la BD: objeto HttpClient, funcion post<clase de objeto a recibir>(URL a llamar).
   * Se le manda un objeto Heroe a almacenar y devuelve el objeto mandado o un error
   */
  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseURL}/heroes`, heroe);
  }
  /** método para hacer put a la BD: objeto HttpClient, funcion put<clase de objeto a recibir>(URL a llamar)
   * Se le manda un objeto héroe a modificar en la BD y devuelve el objeto mandado o un error
   */
  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseURL}/heroes/${heroe.id}`, heroe);
  }
  /** método para hacer delete a la BD: objeto HttpClient, funcion delete<any>(URL a llamar)
   * Se le manda una id de un registro de la BD y no devuelve nada o un objeto vacio.
   */
  borrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/heroes/${id}`);
  }
}
