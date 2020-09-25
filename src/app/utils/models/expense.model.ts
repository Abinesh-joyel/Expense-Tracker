import { Category } from './category.model';

interface Expense {
  _id?: string;
  memo: string;
  amount: number;
  type: string;
  date: Date;
  category: Category;
}

interface ExpenseAmount {
  balance: number;
  income: number;
  expenses: number;
}

interface ExpenseCategory {
  _id: string;
  name: string;
  icon: string;
  amount: number;
  percentage?: number;
  date?: string;
}

export { Expense, ExpenseAmount, ExpenseCategory };
