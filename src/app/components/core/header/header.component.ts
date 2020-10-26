import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store';
import { getStartEndDate, monthIndex } from 'src/app/utils';
import { Month } from 'src/app/utils/models';
import { FETCH_EXPENSE } from '../../expenses/store/expense-actions';
import { SharedService } from '../../shared/service/shared.service';
import { AuthService } from '../../auth/service/auth.service';
const expenseAddRouter = 'expenses/add';
const categoryAddRouter = 'category/add';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();
  routerEvents: Subscription;
  addRouter = 'expenses/add';
  loading = false;
  months: Month[] = monthIndex();
  currentIndex = new Date().getMonth();
  selectedMonth = this.months[this.currentIndex].name;
  dropDownFlag: boolean;
  constructor(
    public router: Router,
    private store: Store<AppState>,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.listenRouterEvents();
  }

  ngOnInit() {
    this.sharedService.setExpensePeriod(this.months[this.currentIndex]);
  }

  listenRouterEvents() {
    this.routerEvents = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        switch (true) {
          case event instanceof NavigationStart:
            this.loading = true;
            break;
          case event instanceof NavigationEnd:
            this.loading = false;
            this.setRoute(event);
            break;
          default:
            this.loading = false;
            break;
        }
      });
  }

  fetchSelectedMonth(month: Month) {
    this.selectedMonth = month.name;
    this.sharedService.setExpensePeriod(month);
    this.store.dispatch({
      type: FETCH_EXPENSE,
      payload: getStartEndDate(month.index),
    });
  }

  setRoute(event: any) {
    const { url } = event;
    if (url === '/category') {
      this.addRouter = categoryAddRouter;
    } else if (url !== '/category' && this.addRouter !== expenseAddRouter) {
      this.addRouter = expenseAddRouter;
    }
    if (url === '/expenses' || url === '/chart' || url === '/') {
      this.dropDownFlag = true;
    } else if (this.dropDownFlag) {
      this.dropDownFlag = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }
}
