import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportComponent } from './components/export/export.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: 'expenses',
    loadChildren: () => import('./components/expenses/expenses.module').then((m) => m.ExpensesModule),
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
