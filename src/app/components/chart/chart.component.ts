import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { map, tap, take, withLatestFrom, last } from 'rxjs/operators';
import { ExpenseCategory } from 'src/app/utils/models';
import { expenseByCategory } from '../expenses/store/expense-selector';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  expenseList$: Observable<Array<ExpenseCategory>>;
  expenseTotal$: Observable<number>;
  maxPercentage: number;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    let percentage = null;
    this.expenseList$ = this.store.pipe(
      select(expenseByCategory),
      map(({ data, totalExpenses }) => {
        return data.reduce(
          (acc, curr, ind) => {
            percentage = (curr.header.amount / totalExpenses) * 100;
            acc.data[ind] = { ...curr.header, percentage };
            if (percentage > acc.max) {
              acc.max = percentage;
            }
            return acc;
          },
          { data: [], max: 0 }
        );
      }),
      tap((result) => (this.maxPercentage = result.max)),
      map((res) => res.data),
      tap((res) => {
        console.log('chart', res);
      })
    );
    this.expenseTotal$ = this.store.pipe(
      select(expenseByCategory),
      map((res) => res.totalExpenses)
    );
  }
}
