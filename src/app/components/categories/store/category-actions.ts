import { Action } from '@ngrx/store';
import { Category } from 'src/app/utils/models';
export enum ActionTypes {
  CATEGORY_LIST = 'CATEGORY_LIST',
}

export class ListCategory implements Action {
  readonly type = ActionTypes.CATEGORY_LIST;
  constructor(public payload: { categories: Category[] }) {}
}

export type CategoryActions = ListCategory;
