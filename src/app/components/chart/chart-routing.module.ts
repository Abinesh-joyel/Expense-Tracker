import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart.component';
import { ExpenseCategoryListComponent } from './expense-category-list/expense-category-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
  },
  {
    path: ':id',
    component: ExpenseCategoryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule {}
