import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';
@Injectable()
export class ReportService {
  endPoint = environment.url;
  constructor(private http: HttpClient) {}

  getReports() {
    return this.http.get<{ data: Report[]; message: string }>(`${this.endPoint}/report`);
  }
}
