import { Routes } from '@angular/router';
import { APP_NAME } from './app.constants';

export const routes: Routes = [
  {
    path: 'login',
    title: `Connexion - ${APP_NAME}`,
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: '',
    title: `${APP_NAME}`,
    loadComponent: () => import('./pages/home/home.component'),
    children: [
      {
        path: 'projects',
        title: `Projets - ${APP_NAME}`,
        loadComponent: () => import('./pages/home/projects/projects.component'),
      },
      {
        path: 'contributors',
        title: `Contributeurs - ${APP_NAME}`,
        loadComponent: () =>
          import('./pages/home/contributors/contributors.component'),
        children: [
          {
            path: 'active',
            title: `Contributeurs actifs - ${APP_NAME}`,
            loadComponent: () =>
              import('./pages/home/contributors/active/active.component'),
          },
          {
            path: 'archived',
            title: `Contributeurs archivés - ${APP_NAME}`,
            loadComponent: () =>
              import('./pages/home/contributors/archived/archived.component'),
          },
          {
            path: '',
            redirectTo: 'active',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'project/:id',
    title: `Chargement du projet... - ${APP_NAME}`,
    loadComponent: () => import('./pages/project/project.component'),
  },

  {
    path: '**',
    redirectTo: 'projects',
  },
];
