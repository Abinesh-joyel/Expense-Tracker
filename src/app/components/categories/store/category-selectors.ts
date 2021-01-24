import { CategoryState } from './category-reducers';
import { AppState } from 'src/app/store';
import { createSelector } from '@ngrx/store';
import { Category } from 'src/app/utils/models';

const categoryState = (state: AppState) => state.category;

const filterByCategory = (list: Category[], type: string) => {
  return list.filter((cate) => cate.type === type);
};

export const categoryList = createSelector(categoryState, (state: CategoryState) => state.categoryList);

export const categoryListExpense = createSelector(categoryState, (state: CategoryState) =>
  filterByCategory(state.categoryList, 'expense')
);

export const categoryListIncome = createSelector(categoryState, (state: CategoryState) =>
  filterByCategory(state.categoryList, 'income')
);
