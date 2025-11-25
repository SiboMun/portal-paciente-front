import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'portal-paciente',
    loadComponent: () =>
      import('./views/portal-paciente/portal-paciente.component')
        .then(c => c.PortalPacienteComponent),
    canActivate: [AuthGuard],
    data: { expectedRoles: [-1] }
  },
  {
    path: 'administrador',
    loadComponent: () =>
      import('./views/administrador-page/administrador-page.component')
        .then(c => c.AdministradorPageComponent),
    canActivate: [AuthGuard],
    data: { expectedRoles: [1] }
  },
  {
    path: 'oirs',
    loadComponent: () =>
      import('./views/oirs-page/oirs-page.component')
        .then(c => c.OirsPageComponent),
    canActivate: [AuthGuard],
    data: { expectedRoles: [2] }
  },
  {
    path: 'funcionarios',
    loadComponent: () =>
      import('./views/login-funcionario/login-funcionario.component')
        .then(c => c.LoginFuncionarioComponent)
  }

];
