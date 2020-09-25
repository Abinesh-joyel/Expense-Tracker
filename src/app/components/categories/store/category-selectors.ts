import { CategoryState } from './category-reducers';
import { AppState } from 'src/app/store';
import { createSelector } from '@ngrx/store';

const categoryState = (state: AppState) => state.category;

export const categoryList = createSelector(
  categoryState,
  (state: CategoryState) => state.categoryList
);
