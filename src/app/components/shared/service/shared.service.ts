import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Month } from 'src/app/utils/models';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedExpensePeriod = new Subject<Month>();
  selectedExpensePeriod$ = this.selectedExpensePeriod.asObservable();
  constructor() {}

  setExpensePeriod(month: Month) {
    this.selectedExpensePeriod.next(month);
  }
}
