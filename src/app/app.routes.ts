import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';

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
        .then(c => c.PortalPacienteComponent)
  },
  {
    path: 'administrador',
    loadComponent: () =>
      import('./views/administrador-page/administrador-page.component')
        .then(c => c.AdministradorPageComponent)
  },
  {
    path: 'oirs',
    loadComponent: () =>
      import('./views/oirs-page/oirs-page.component')
        .then(c => c.OirsPageComponent)
  },
  {
    path: 'funcionarios',
    loadComponent: () =>
      import('./views/login-funcionario/login-funcionario.component')
        .then(c => c.LoginFuncionarioComponent)
  }

];
