import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/utils/models';
interface GetCategory {
  categories: Category[];
  count: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  endPoint: string = environment.url;
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<GetCategory>(`${this.endPoint}/category`);
  }
}
