import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { expenseByCategory } from '../../expenses/store/expense-selector';
import { getNoOfDaysInMonth } from 'src/app/utils';
import { ExpenseCategory, Expense } from 'src/app/utils/models';

@Component({
  selector: 'app-expense-category-list',
  templateUrl: './expense-category-list.component.html',
  styleUrls: ['./expense-category-list.component.scss'],
})
export class ExpenseCategoryListComponent implements OnInit {
  expenseList$: Observable<{ header: ExpenseCategory; body: Expense[] }>;
  averageDaily: number;
  name: string;
  amount: number;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    console.log(id);
    this.expenseList$ = this.store.pipe(
      select(expenseByCategory),
      filter((res) => res.data[id] !== undefined),
      map((exp) => exp.data[id]),
      tap(({ header: { name, amount, date } }) => {
        this.name = name;
        this.amount = amount;
        this.averageDaily = amount / getNoOfDaysInMonth(date);
      })
    );
  }
}
