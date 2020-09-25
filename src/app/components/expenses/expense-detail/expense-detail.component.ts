import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators';
import { ExpensesService } from '../service/expenses.service';
import { Expense } from 'src/app/utils/models';
import { DELETE_EXPENSE } from '../store/expense-actions';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css'],
})
export class ExpenseDetailComponent implements OnInit {
  expenseId: string;
  expenseDetails$: Observable<Expense>;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private expenseService: ExpensesService) {}

  ngOnInit() {
    this.expenseDetails$ = this.route.paramMap.pipe(
      withLatestFrom(this.store.select('expenses')),
      tap(([params]) => (this.expenseId = params.get('id'))),
      map(([, state]) => state.expenseList.find((exp) => exp._id === this.expenseId)),
      switchMap((exp) => {
        if (exp === undefined) {
          return this.expenseService.getExpenseById(this.expenseId).pipe(map((res) => res.data));
        }
        return of(exp);
      })
    );
  }

  deleteExp() {
    this.store.dispatch({ type: DELETE_EXPENSE, payload: this.expenseId });
  }
}
