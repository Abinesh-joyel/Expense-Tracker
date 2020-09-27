import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import { ExpensesHomeComponent } from './expenses-home/expenses-home.component';
import { ExpenseSearchListComponent } from './expense-search-list/expense-search-list.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { expenseReducer } from './store/expense-reducers';
// import { ExpenseEffects } from './store/expense-effects';
// StoreModule.forFeature('expenses', expenseReducer),
// EffectsModule.forFeature([ExpenseEffects]),
@NgModule({
  imports: [CommonModule, ExpensesRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [
    ExpensesListComponent,
    ExpenseDetailComponent,
    ExpenseAddComponent,
    ExpenseCardComponent,
    ExpensesHomeComponent,
    ExpenseSearchListComponent,
  ],
  providers: [DatePipe],
})
export class ExpensesModule {}
