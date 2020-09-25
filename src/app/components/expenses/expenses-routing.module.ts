import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesHomeComponent } from './expenses-home/expenses-home.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesHomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: ExpenseAddComponent,
  },
  {
    path: 'edit/:id',
    component: ExpenseAddComponent,
  },
  {
    path: 'detail/:id',
    component: ExpenseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesRoutingModule {}
