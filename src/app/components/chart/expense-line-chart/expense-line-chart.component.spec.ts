import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseLineChartComponent } from './expense-line-chart.component';

describe('ExpenseLineChartComponent', () => {
  let component: ExpenseLineChartComponent;
  let fixture: ComponentFixture<ExpenseLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
