import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/components/auth/service/auth.service';
import { tap, mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { defer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  AddExpense,
  FetchExpense,
  DeleteExpense,
  ListExpense,
  UpdateExpense,
  LoaderModeExpense,
  FETCH_EXPENSE,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
} from './expense-actions';
import { ExpensesService } from '../service/expenses.service';
import { SharedService } from '../../shared/service/shared.service';
import { getStartEndDate, monthIndex } from 'src/app/utils';
import { ExpenseState } from './expense-reducers';
@Injectable()
export class ExpenseEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private expenseService: ExpensesService,
    private toastrService: ToastrService,
    private sharedService: SharedService,
    private router: Router,
    private store: Store<ExpenseState>
  ) {}

  
  add$ = createEffect(() => this.actions$.pipe(
    ofType<AddExpense>(ADD_EXPENSE),
    mergeMap((action: AddExpense) => this.expenseService.addExpense(action.payload)),
    withLatestFrom(this.sharedService.selectedExpensePeriod$),
    tap(([res, month]) => {
      const { message, data } = res;
      this.toastrService.success(`${message}`, `${data.type.toUpperCase()}`);
      this.store.dispatch(new LoaderModeExpense(false));
      this.router.navigate(['expenses']);
      console.log(res, month);
    }),
    map(([, month]) => new FetchExpense(getStartEndDate(month.index)))
  ), { dispatch: true });

  
  fetch$ = createEffect(() => this.actions$.pipe(
    ofType<FetchExpense>(FETCH_EXPENSE),
    mergeMap((action: FetchExpense) => this.expenseService.getExpenses(action.payload)),
    tap((res) => {
      const { fullName } = monthIndex()[res.month];
      this.toastrService.success(`Listing Expense and Income for the month ${fullName}`, `Expense - ${fullName}`);
    }),
    map((res) => new ListExpense(res.data))
  ));

  
  delete$ = createEffect(() => this.actions$.pipe(
    ofType<DeleteExpense>(DELETE_EXPENSE),
    mergeMap((action: DeleteExpense) => this.expenseService.deleteExpense(action.payload)),
    withLatestFrom(this.sharedService.selectedExpensePeriod$),
    tap(() => {
      this.toastrService.success(`Expense deleted successfully`, ``);
      this.router.navigate(['expenses']);
    }),
    map(([, month]) => new FetchExpense(getStartEndDate(month.index)))
  ));

  
  update$ = createEffect(() => this.actions$.pipe(
    ofType<UpdateExpense>(UPDATE_EXPENSE),
    mergeMap((action: UpdateExpense) => this.expenseService.updateExpense(action.payload)),
    map(() => new LoaderModeExpense(false)),
    tap(() => {
      this.router.navigate(['expenses']);
    })
  ), { dispatch: true });

  
  init$ = createEffect(() => defer(() => {
    return this.authService.getAuthListener().pipe(
      tap((res) => console.log('authstate', res)),
      filter((authStaus) => authStaus),
      tap(() =>
        this.store.dispatch({
          type: FETCH_EXPENSE,
          payload: getStartEndDate(),
        })
      )
    );
  }), { dispatch: false });

  // ngrxOnInitEffects() {
  //   console.log('effects init');
  //   return { type: FETCH_EXPENSE, payload: getStartEndDate() };
  // }
}
