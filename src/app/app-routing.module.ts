import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportComponent } from './components/export/export.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: 'expenses',
    loadChildren: './components/expenses/expenses.module#ExpensesModule',
  },
  {
    path: 'chart',
    loadChildren: './components/chart/chart.module#ChartModule',
  },
  {
    path: 'category',
    loadChildren: './components/categories/categories.module#CategoriesModule',
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
