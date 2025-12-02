import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }

      const persona = JSON.parse(localStorage.getItem('persona') || '{}');
      const idPerfil = persona.id_perfil;
      const expectedRoles = route.data['expectedRoles'] as number[];

      // 🟢 ADMIN siempre puede pasar a cualquier ruta
      if (idPerfil === 1) {
        return true;
      }

      if (expectedRoles) {
        // -1 = paciente
        const isPatient = !expectedRoles.includes(1) &&
          !expectedRoles.includes(2) &&
          expectedRoles.includes(-1);

        if (isPatient) {
          if (idPerfil !== 1 && idPerfil !== 2) {
            return true;
          }
        } else {
          if (expectedRoles.includes(idPerfil)) {
            return true;
          }
        }

        // Si falla, redirigir según perfil
        if (idPerfil === 2) {
          this.router.navigate(['/oirs']);
        } else {
          this.router.navigate(['/portal-paciente']);
        }

        return false;
      }
    }

    return true;
  }
}
