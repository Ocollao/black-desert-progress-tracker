import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

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
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'personaje',
        loadComponent: () =>
          import('./features/personaje/personaje.component').then((m) => m.PersonajeComponent),
      },
      {
        path: 'equipo',
        loadComponent: () =>
          import('./features/equipo/equipo.component').then((m) => m.EquipoComponent),
      },
      {
        path: 'progresion',
        loadComponent: () =>
          import('./features/progresion/progresion.component').then((m) => m.ProgresionComponent),
      },
      {
        path: 'objetivos',
        loadComponent: () =>
          import('./features/objetivos/objetivos.component').then((m) => m.ObjetivosComponent),
      },
      {
        path: 'desafios',
        loadComponent: () =>
          import('./features/desafios/desafios.component').then((m) => m.DesafiosComponent),
      },
      {
        path: 'lifeskill',
        loadComponent: () =>
          import('./features/lifeskill/lifeskill.component').then((m) => m.LifeskillComponent),
      },
      {
        path: 'aventuras',
        loadComponent: () =>
          import('./features/aventuras/aventuras.component').then((m) => m.AventurasComponent),
      },
      {
        path: 'conocimiento',
        loadComponent: () =>
          import('./features/conocimiento/conocimiento.component').then((m) => m.ConocimientoComponent),
      },
      {
        path: 'colecciones',
        loadComponent: () =>
          import('./features/colecciones/colecciones.component').then((m) => m.ColeccionesComponent),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./features/configuracion/configuracion.component').then((m) => m.ConfiguracionComponent),
      },
      {
        path: 'vinculado',
        loadComponent: () =>
          import('./features/vinculado/vinculado.component').then((m) => m.VinculadoComponent),
      },
      {
        path: 'characters',
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
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
