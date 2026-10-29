import { inject, Injectable } from '@angular/core';
import { Peliculas } from '../models/pelicula';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/peliculas';

  getAll(): Observable<Peliculas[]> {
    return this.http.get<Peliculas[]>(this.API_URL);
  }

  getById(id: number): Observable<Peliculas> {
    return this.http.get<Peliculas>(`${this.API_URL}/${id}`);
  }

  post(item: Peliculas): Observable<Peliculas> {
    return this.http.post<Peliculas>(this.API_URL, item);
  }

  put(id: number, item: Peliculas): Observable<Peliculas> {
    return this.http.put<Peliculas>(`${this.API_URL}/${id}`, item);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
