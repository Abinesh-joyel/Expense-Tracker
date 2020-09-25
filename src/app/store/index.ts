import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import {
  ExpenseState,
  expenseReducer,
} from '../components/expenses/store/expense-reducers';

import {
  CategoryState,
  categoryReducer,
} from '../components/categories/store/category-reducers';

import { environment } from '../../environments/environment';

export interface AppState {
  category: CategoryState;
  expenses: ExpenseState;
}

export const reducers: ActionReducerMap<AppState> = {
  category: categoryReducer,
  expenses: expenseReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
