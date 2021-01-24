import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Category, Report } from 'src/app/utils/models';
import { ReportService } from '../service/report.service';

interface ReportState {
  reports: Report[];
}

const initialState: ReportState = {
  reports: [],
};

@Injectable()
export class ReportStore extends ComponentStore<ReportState> {
  constructor(private reportService: ReportService) {
    super(initialState);
  }

  readonly reports$: Observable<Report[]> = this.select((state) => state.reports);

  readonly getReports = this.effect((obs$) => {
    return obs$.pipe(
      switchMap(() =>
        this.reportService.getReports().pipe(
          tap({
            next: (res) => this.addReports(res.data),
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  readonly addReports = this.updater((state, reports: Report[]) => ({
    ...state,
    reports: [...reports],
  }));
}
