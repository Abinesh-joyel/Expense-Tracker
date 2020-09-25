import * as Actions from './expense-actions';
import { Expense } from 'src/app/utils/models';
// using normal way

export interface ExpenseState {
  expenseList: Expense[];
  expenseModeLoader: boolean;
  expenseListLoader: boolean;
}

const initialState: ExpenseState = {
  expenseList: [],
  expenseModeLoader: false,
  expenseListLoader: false,
};

export function expenseReducer(state = initialState, action: Actions.ExpenseActions) {
  switch (action.type) {
    case Actions.LIST_EXPENSE:
      return { ...state, expenseList: action.payload };
    case Actions.LOADER_MODE_EXPENSE:
      return { ...state, expenseModeLoader: action.payload };
    default:
      return { ...state };
  }
}

// using ngrx entity
