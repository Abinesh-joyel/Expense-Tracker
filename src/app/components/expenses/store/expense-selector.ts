import { createSelector } from '@ngrx/store';
import { ExpenseState } from './expense-reducers';
import { AppState } from 'src/app/store';
import { ExpenseCategory, Expense } from 'src/app/utils/models';

const expenseState = (state: AppState) => state.expenses;

const formatExpenseData = (date: Date) => ({
  header: { date, expenses: 0 },
  body: [],
});

const formatExpenseList = (expList: Expense[]) => {
  const data = {};
  let balance = 0,
    expenses = 0,
    income = 0,
    dateTime: number;

  for (let i = 0, len = expList.length; i < len; i++) {
    const { date, amount, type } = expList[i];
    dateTime = new Date(date).getTime();
    if (!data[dateTime]) {
      data[dateTime] = formatExpenseData(date);
    }
    if (data[dateTime]) {
      const { header, body } = data[dateTime];
      header.expenses += amount;
      body.push(expList[i]);
    }
    type === 'expense' ? (expenses += +amount) : (income += +amount);
  }
  balance = income - expenses;
  return {
    data: Object.values(data) as Array<{
      header: { date: Date; expenses: number };
      body: Expense[];
    }>,
    balance,
    expenses,
    income,
  };
};

const formatExpenseByCategory = (expList: Expense[]) => {
  const data = {};
  let totalExpenses = 0;
  for (let i = 0, len = expList.length; i < len; i++) {
    const {
      _id,
      category: { _id: id, name, icon },
      amount,
      date,
    } = expList[i];
    if (!data[id]) {
      data[id] = { header: { _id, name, icon, amount: 0, date }, body: [] };
    }
    const { header, body } = data[id];
    header.amount += amount;
    body.push(expList[i]);
    totalExpenses += +amount;
  }
  // console.log(data);
  return {
    data: Object.values(data) as Array<{
      header: ExpenseCategory;
      body: Expense[];
    }>,
    totalExpenses,
  };
};

export const expenseList = createSelector(expenseState, (expenses: ExpenseState) =>
  formatExpenseList(expenses.expenseList)
);

export const expenseByCategory = createSelector(expenseState, (expenses: ExpenseState) =>
  formatExpenseByCategory(expenses.expenseList)
);

export const actualExpenseList = createSelector(expenseState, (expenses: ExpenseState) => expenses.expenseList);

// export const expenseAmountData = createSelector(
//   expenseState,
//   (expenses: ExpenseState) => expenses.expenseAmount
// );
