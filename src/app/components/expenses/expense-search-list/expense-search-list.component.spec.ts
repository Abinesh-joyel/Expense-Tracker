import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseSearchListComponent } from './expense-search-list.component';

describe('ExpenseSearchListComponent', () => {
  let component: ExpenseSearchListComponent;
  let fixture: ComponentFixture<ExpenseSearchListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
