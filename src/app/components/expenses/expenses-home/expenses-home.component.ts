import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { expenseList } from '../store/expense-selector';
import { AppState } from 'src/app/store';
import { map, tap } from 'rxjs/operators';
import { Expense, ExpenseAmount } from 'src/app/utils/models';

@Component({
  selector: 'app-expenses-home',
  templateUrl: './expenses-home.component.html',
  styleUrls: ['./expenses-home.component.css'],
})
export class ExpensesHomeComponent implements OnInit {
  expense$: Observable<Array<{ header: { date: Date; expenses: number }; body: Expense[] }>>;
  expenseAmount$: Observable<ExpenseAmount>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.expense$ = this.store.pipe(
      select(expenseList),
      map((res) => res.data),
      tap((res) => {
        console.log(res);
      })
    );
    this.expenseAmount$ = this.store.pipe(
      select(expenseList),
      map(({ balance, income, expenses }) => ({ balance, income, expenses }))
    );
  }

  trackByFn(index: number, item: Expense) {
    return item._id;
  }
}
