import { ActionTypes, CategoryActions } from './category-actions';
import { Category } from 'src/app/utils/models';
export interface CategoryState {
  categoryList: Category[];
}

export const initialState: CategoryState = {
  categoryList: [],
};

export function categoryReducer(state = initialState, action: CategoryActions) {
  switch (action.type) {
    case ActionTypes.CATEGORY_LIST:
      return { ...state, categoryList: action.payload.categories };
    default:
      return { ...state };
  }
}
