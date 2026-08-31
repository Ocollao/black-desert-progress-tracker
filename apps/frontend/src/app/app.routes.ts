import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'characters',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/characters/list/character-list.component').then((m) => m.CharacterListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/characters/form/character-form.component').then((m) => m.CharacterFormComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/characters/form/character-form.component').then((m) => m.CharacterFormComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/characters/detail/character-detail.component').then((m) => m.CharacterDetailComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];