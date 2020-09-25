import { Action } from '@ngrx/store';
import { Expense } from 'src/app/utils/models';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_EXPENSE = 'FETCH_EXPENSE';
export const LIST_EXPENSE = 'LIST_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const LOADER_MODE_EXPENSE = 'LOADER_MODE_EXPENSE'; // for add and edit

export class AddExpense implements Action {
  readonly type = ADD_EXPENSE;
  constructor(public payload: Expense) {}
}

export class FetchExpense implements Action {
  readonly type = FETCH_EXPENSE;
  constructor(public payload: { start: Date; end: Date }) {}
}

export class DeleteExpense implements Action {
  readonly type = DELETE_EXPENSE;
  constructor(public payload: string) {}
}

export class UpdateExpense implements Action {
  readonly type = UPDATE_EXPENSE;
  constructor(public payload: Expense) {}
}

export class ListExpense implements Action {
  readonly type = LIST_EXPENSE;
  constructor(public payload: Expense[]) {}
}

export class LoaderModeExpense implements Action {
  readonly type = LOADER_MODE_EXPENSE;
  constructor(public payload: boolean) {}
}

export type ExpenseActions = ListExpense | LoaderModeExpense;
