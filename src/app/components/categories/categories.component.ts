import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { Category } from 'src/app/utils/models';
import { categoryListExpense, categoryListIncome } from './store/category-selectors';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryListExpense$: Observable<Category[]>;
  categoryListIncome$: Observable<Category[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.categoryListExpense$ = this.store.pipe(select(categoryListExpense));
    this.categoryListIncome$ = this.store.pipe(select(categoryListIncome));
  }
}
