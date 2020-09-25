import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSearchListComponent } from './expense-search-list.component';

describe('ExpenseSearchListComponent', () => {
  let component: ExpenseSearchListComponent;
  let fixture: ComponentFixture<ExpenseSearchListComponent>;

  beforeEach(async(() => {
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
