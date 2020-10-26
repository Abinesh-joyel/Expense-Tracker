import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportComponent } from './components/export/export.component';
import { AboutComponent } from './components/about/about.component';
import { AuthLayoutComponent } from './components/core/auth-layout/auth-layout.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';
import { AuthGuard } from './components/auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'expenses',
        loadChildren: () => import('./components/expenses/expenses.module').then((m) => m.ExpensesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'chart',
        loadChildren: () => import('./components/chart/chart.module').then((m) => m.ChartModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./components/categories/categories.module').then((m) => m.CategoriesModule),
      },
      {
        path: 'export',
        component: ExportComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: '',
        redirectTo: '/expenses',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '/expenses',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
