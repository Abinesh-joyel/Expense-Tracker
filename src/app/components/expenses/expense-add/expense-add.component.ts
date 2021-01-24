import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, iif, of } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  startWith,
  mergeMap,
  withLatestFrom,
  tap,
  filter,
  switchMap,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Category, Expense } from 'src/app/utils/models';
import { ADD_EXPENSE, LOADER_MODE_EXPENSE, UPDATE_EXPENSE } from '../store/expense-actions';
import { actualExpenseList } from '../store/expense-selector';
import { ExpensesService } from '../service/expenses.service';
import { categoryList } from '../../categories/store/category-selectors';
@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css'],
})
export class ExpenseAddComponent implements OnInit {
  mode = 'Add';
  expenseId: string = null;
  showCategory = false;
  expenseForm: FormGroup;
  categorySearch: FormControl = new FormControl('');
  categories: Observable<Category[]>;
  filteredCategories: Observable<Category[]>;
  loader$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private expenseService: ExpensesService
  ) {}

  ngOnInit() {
    this.categories = this.store.pipe(select(categoryList));
    this.loader$ = this.store.pipe(select((state) => state.expenses.expenseModeLoader));
    this.initForm();
    this.initRoute();
    this.initListenChanges();
  }

  initForm() {
    const date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.expenseForm = this.fb.group({
      type: ['expense'],
      category: this.fb.group(
        {
          _id: [null],
          name: [null],
          icon: [null],
        },
        Validators.required
      ),
      date: [date, Validators.required],
      memo: [null],
      amount: [null, Validators.required],
    });
  }

  initRoute() {
    this.route.paramMap
      .pipe(
        withLatestFrom(this.store.pipe(select(actualExpenseList))),
        tap(([params]) => (this.expenseId = params.get('id'))),
        filter(() => this.expenseId !== null),
        tap(() => (this.mode = 'Edit')),
        map(([, state]) => state.find((exp) => exp._id === this.expenseId)),
        switchMap((exp) =>
          iif(
            () => exp === undefined,
            this.expenseService.getExpenseById(this.expenseId).pipe(map((res) => res.data)),
            of(exp)
          )
        )
      )
      .subscribe((res: Expense) => {
        const { memo, amount, date: expDate, type, category } = res;
        const date = this.datePipe.transform(expDate, 'yyyy-MM-dd');
        this.expenseForm.patchValue(
          {
            memo,
            amount,
            date,
            type,
            category,
          },
          { emitEvent: false }
        );
        this.categorySearch.setValue(category.name);
      });
  }

  initListenChanges() {
    this.filteredCategories = this.categorySearch.valueChanges.pipe(
      startWith(this.categorySearch.value),
      debounceTime(200),
      // tap((res) => {
      //   console.log(res);
      // }),
      // distinctUntilChanged(),
      map((value: string) => value.toLowerCase()),
      mergeMap((value: string) => {
        const {
          type,
          category: { name: categorySearchName },
        } = this.expenseForm.value;
        return this.categories.pipe(
          map((categories) =>
            categories.filter((category: Category) => {
              const categoryName = category.name.toLowerCase();
              return categoryName.startsWith(value) && categorySearchName !== value && category.type === type;
            })
          )
        );
      })
    );

    this.expenseForm.get('type').valueChanges.subscribe(() => {
      this.categorySearch.setValue('');
      this.showCategory = false;
    });
  }

  selectedCategory(category: Category) {
    this.categorySearch.setValue(category.name);
    this.expenseForm.get('category').setValue({
      ...category,
    });
  }

  onSubmit() {
    // console.log(this.expenseForm.value);
    this.store.dispatch({ type: LOADER_MODE_EXPENSE, payload: true });
    if (this.mode === 'Add') {
      this.store.dispatch({ type: ADD_EXPENSE, payload: this.expenseForm.value });
      // this.store.dispatch(new AddExpense(this.expenseForm.value));
    } else {
      this.store.dispatch({
        type: UPDATE_EXPENSE,
        payload: {
          _id: this.expenseId,
          ...this.expenseForm.value,
        },
      });
    }
    // this.expenseForm.reset();
  }
}
