import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category, Report } from 'src/app/utils/models';
import { CategoryService } from '../../categories/service/category.service';

interface ReportState {
  reports: Category[];
}

const initialState: ReportState = {
  reports: [],
};

@Injectable()
export class ReportStore extends ComponentStore<ReportState> {
  constructor(private categoryService: CategoryService) {
    super(initialState);
  }

  readonly reports$: Observable<Category[]> = this.select((state) => state.reports);

  readonly getReports = this.effect(() =>
    this.categoryService.getCategories().pipe(
      tap({
        next: (res) => this.addReports(res.categories),
      }),
      catchError(() => EMPTY)
    )
  );

  readonly addReports = this.updater((state, reports: Category[]) => ({
    ...state,
    reports: [...reports],
  }));
}
