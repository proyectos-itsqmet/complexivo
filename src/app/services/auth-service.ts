import { inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);

  isAuthenticated = signal<boolean>(localStorage.getItem('session') === 'true');
  currentRol = signal<string | null>(localStorage.getItem('rol'));

  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/peliculas';

  // login(email: string, password: string): Observable<boolean> {
  //   return this.userService.findByCredentials(email, password).pipe(
  //     map((user: any) => {
  //       if (!user) {
  //         return false;
  //       }
  //       const { password: _password, ...safeUser } = user;
  //       localStorage.setItem('session', 'true');
  //       localStorage.setItem('user', JSON.stringify(safeUser));
  //       localStorage.setItem('rol', user.rol);
  //       this.isAuthenticated.set(true);
  //       this.currentRol.set(user.rol);
  //       return true;
  //     }),
  //   );
  // }

  login(nombre: string, password: string): Observable<boolean> {
    return this.http.get<Usuario>(`${this.API_URL}/${nombre}`).pipe(
      map((user: any) => {
        if (!user) {
          return false;
        }
        const { password: _password, ...safeUser } = user;
        localStorage.setItem('session', 'true');
        localStorage.setItem('user', JSON.stringify(safeUser));
        localStorage.setItem('rol', user.rol);
        this.isAuthenticated.set(true);
        this.currentRol.set(user.rol);
        return true;
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    this.isAuthenticated.set(false);
    this.currentRol.set(null);
  }

  currentUser(): Omit<User, 'password'> | null {
    const raw = localStorage.getItem('user');
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
