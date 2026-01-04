import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'recipe-detail/:id',
    loadComponent: () =>
      import('./pages/recipe-detail/recipe-detail.page').then(m => m.RecipeDetailPage),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.page').then(m => m.AboutPage),
  },
];
