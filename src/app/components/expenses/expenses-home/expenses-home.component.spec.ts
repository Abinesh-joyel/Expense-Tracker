import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpensesHomeComponent } from './expenses-home.component';

describe('ExpensesHomeComponent', () => {
  let component: ExpensesHomeComponent;
  let fixture: ComponentFixture<ExpensesHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
