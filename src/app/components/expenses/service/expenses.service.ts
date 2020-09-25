import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expense } from 'src/app/utils/models';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  endPoint: string = environment.url;
  constructor(private http: HttpClient) {}

  addExpense(expenseData: Expense) {
    return this.http.post<{ data: Expense; message: string }>(`${this.endPoint}/expense`, expenseData);
  }

  getExpenses(params: { start: any; end: any }) {
    // console.log(params);
    // let params = new HttpParams();
    // params = params.append('start', query.start);
    // params = params.append('end', query.end);
    return this.http.get<{ data: Expense[]; month: number; message: string }>(`${this.endPoint}/expense`, { params });
  }

  getExpenseById(id: string) {
    return this.http.get<{ data: Expense; message: string }>(`${this.endPoint}/expense/${id}`);
  }

  deleteExpense(id: string) {
    return this.http.delete(`${this.endPoint}/expense/${id}`);
  }

  updateExpense(expenseData: Expense) {
    return this.http.put<{ message: string }>(`${this.endPoint}/expense`, expenseData);
  }
}
