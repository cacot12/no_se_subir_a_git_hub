// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = !!this.auth.currentUser; // Verifica si hay un usuario autenticado

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si no está autenticado
      return false; // Bloquea el acceso
    }
    return true; // Permite el acceso si está autenticado
  }
}
