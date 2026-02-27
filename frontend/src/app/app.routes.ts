import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'features',
        loadComponent: () =>
          import('./pages/features/features.component').then((m) => m.FeaturesComponent),
      },
      {
        path: 'pricing',
        loadComponent: () =>
          import('./pages/pricing/pricing.component').then((m) => m.PricingComponent),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        loadComponent: () =>
          import('./pages/dashboard/main/main.component').then((m) => m.MainComponent),
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('./pages/dashboard/statistics/statistics.component').then(
            (m) => m.StatisticsComponent,
          ),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./pages/dashboard/calendar/calendar.component').then((m) => m.CalendarComponent),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/auth/auth.component').then((m) => m.AuthComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
