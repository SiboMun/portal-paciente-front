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

      if (expectedRoles) {
        // -1 represents "Patient" (any profile other than 1 or 2)
        const isPatient = !expectedRoles.includes(1) && !expectedRoles.includes(2) && expectedRoles.includes(-1);

        if (isPatient) {
          if (idPerfil !== 1 && idPerfil !== 2) {
            return true;
          }
        } else {
          if (expectedRoles.includes(idPerfil)) {
            return true;
          }
        }
        console.log('idPerfil, ', idPerfil);

        // Redirect based on actual profile if access is denied
        if (idPerfil === 1) {
          this.router.navigate(['/administrador']);
        } else if (idPerfil === 2) {
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
